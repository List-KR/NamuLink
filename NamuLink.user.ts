// ==UserScript==
// @name         NamuLink
// @encoding     utf-8
// @namespace    https://github.com/List-KR/NamuLink
// @homepageURL  https://github.com/List-KR/NamuLink
// @supportURL   https://github.com/List-KR/NamuLink/issues
// @updateURL    https://cdn.jsdelivr.net/gh/List-KR/NamuLink@latest/NamuLink.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/List-KR/NamuLink@latest/NamuLink.user.js
// @license      MIT
//
// @version      2.1.8
// @author       PiQuark6046 and contributors
//
// @match        https://namu.wiki/*
//
// @description        NamuLink blocks the license-abused PowerLink advertisement on NamuWiki.
// @description:ko     NamuLink는 나무위키에 있는 라이선스를 위반한 파워링크 광고를 차단합니다.
//
// @grant        unsafeWindow
// @run-at       document-start
// @inject-into  page
// ==/UserScript==

type unsafeWindow = typeof window
declare const unsafeWindow: unsafeWindow

(function () {
  const win = typeof unsafeWindow !== "undefined" ? unsafeWindow : window
  /**
   * Leave debug message to console.
   * @param message The message to leave.
   */
  function NamuLinkDebug(message: any): void {
    let StackTrace = new Error().stack
    console.debug(`NamuLink: ${StackTrace.split('\n')[1].trim()} ${StackTrace.split('\n')[2].trim()}:`, message)
  }

  /**
   * Hide elements by setting their display to none.
   * @param elements The elements to hide.
   * @returns The count of elements that were hidden.
   */
  function HideElementsImportant(elements: Array<HTMLElement>): number {
    if (elements.length === 0) return 0
    for (let element of elements) {
      element.style.setProperty('display', 'none', 'important')
    }
    NamuLinkDebug(elements)
    return elements.length
  }

  /**
   * Get parents of a element.
   * @param element The element to get parents of.
   */
  function Parents (element: HTMLElement) {
    const ParentsArray: Array<HTMLElement> = []
    let CurrentElement: HTMLElement = element
    while ((CurrentElement = CurrentElement.parentElement) !== null) {
      ParentsArray.push(CurrentElement)
    }
    return ParentsArray
  }

  /**
   * Get children of a element.
   * @param element The element to get children of.
   */
  function Children (element: HTMLElement) {
    return Array.from(element.querySelectorAll('*')).filter(function (AllElement) { return AllElement instanceof HTMLElement }) as Array<HTMLElement>
  }

  // The following proxy handles PowerLink advertisement that is loaded after the initial loading.
  for (let BitArrayObj of [Uint8ClampedArray, Int8Array, Uint8Array]) {
    // Prepare function for Uint8ClampedArray, Int8Array and Uint8Array.
    function BitArrayProxy (target, thisArg, argumentsList) {
      let OriginalValue:Uint16Array | Int8Array | Uint8Array = Reflect.apply(target, thisArg, argumentsList)
      if (typeof new TextDecoder().decode(OriginalValue) !== 'string') {
        NamuLinkDebug(OriginalValue)
        HideElementsImportant(
          Array.from(document.body.querySelectorAll("*")).filter(function(AllElement) {
            return AllElement instanceof HTMLElement && /^(|[​\n\t ]{1,})$/.test(AllElement.innerText) &&
            parseInt(getComputedStyle(AllElement).getPropertyValue('margin-top').replace(/px$/, '')) > 20 &&
            !(Children(AllElement).some(function (Child) { return (Child.getAttribute('loading') ?? '') === 'lazy' || /^jump\//.test(Child.getAttribute('data-doc') ?? '') })) &&
            Array.from(AllElement.children).filter(function(Children) { 
              return Array.from(Children.querySelectorAll('*')).filter(function(ChildrenAll) {
                return getComputedStyle(ChildrenAll).getPropertyValue('animation-iteration-count') === 'infinite'
              })
             }).length > 0
          }) as Array<HTMLElement>
        )
        return crypto.getRandomValues(new BitArrayObj(OriginalValue.length))
      }
      return OriginalValue
    }
    // Modify original prototype function.
    BitArrayObj.prototype.slice = new Proxy(BitArrayObj.prototype.slice, { apply: BitArrayProxy })
    BitArrayObj.from = new Proxy(BitArrayObj.from, { apply: BitArrayProxy })
  }
  // Override TextDecoder.prototype.decode to detect PowerLink advertisement.
  TextDecoder.prototype.decode = new Proxy(TextDecoder.prototype.decode, {
    apply: function (target, thisArg, argumentsList) {
      let OriginalValue = Reflect.apply(target, thisArg, argumentsList)
      return /\[+.+\/\/adcr\.naver\.com\/adcr\?.+,.+/.test(OriginalValue) ? new ReferenceError() : OriginalValue
    }
  })

  // Hide other leftovers.
  document.addEventListener('DOMContentLoaded', function() {
    for (let element of Array.from(document.querySelectorAll('iframe[src*="//arca.live/external/callad"]')).filter(function (AllElement) { return AllElement instanceof HTMLElement }) as Array<HTMLElement>) {
      HideElementsImportant(Parents(element).filter(function (ParentsElement) {
        return ParentsElement.innerText === '' &&
        parseInt(getComputedStyle(ParentsElement).getPropertyValue('padding-bottom').replace(/px$/, '')) > 15
      }))
    }
    let ArcaLivePowerLink = Array.from(document.querySelectorAll('iframe[src*="//arca.live/static/ad/powerlink.html?size="]')).filter(function (AllElement) { return AllElement instanceof HTMLElement }) as Array<HTMLElement>
    HideElementsImportant(ArcaLivePowerLink.filter(function(AllElement) { return AllElement.offsetHeight > 100 && AllElement.offsetWidth > 100 }))
  })

  // The following proxy handles initial loading PowerLink advertisement when visiting NamuWiki document in a web browser tab.
  // https://github.com/List-KR/NamuLink/issues/14
  // https://github.com/List-KR/NamuLink/issues/18
  if ((navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) && typeof performance.eventCounts === 'undefined') {
    NamuLinkDebug('Apple iOS Safari detected.')
    try {
      let DivTableElements = Array.from(document.querySelectorAll('div,table')) as Array<HTMLElement>
      let PowerLinkContainers: Array<HTMLElement> = DivTableElements.filter(function(element) {
        return 1.5 < (element.offsetWidth / element.offsetHeight) && 2.5 > (element.offsetWidth / element.offsetHeight) &&
        parseInt(getComputedStyle(element).getPropertyValue('margin-top').replace(/px$/, '')) > 15 &&
        !(Children(element).some(function (Child) { return (Child.getAttribute('loading') ?? '') === 'lazy' || /^jump\//.test(Child.getAttribute('data-doc') ?? '') }))
      })
      HideElementsImportant(PowerLinkContainers)
    } catch (error) {
      NamuLinkDebug(error)
    }
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (document.querySelector('script[src^="/cdn-cgi/challenge-platform/h/g/orchestrate/chl_page/"]') === null && document.querySelector('a[href="/"]') !== null) {
        NamuLinkDebug('DOMContentLoaded event detected.')
        try {
          let DivTableElements = Array.from(document.querySelectorAll('div,table')) as Array<HTMLElement>
          let PowerLinkContainers: Array<HTMLElement> = DivTableElements.filter(function(element) {
            return 1.5 < (element.offsetWidth / element.offsetHeight) &&
            parseInt(getComputedStyle(element).getPropertyValue('margin-top').replace(/px$/, '')) > 25 &&
            !(Children(element).some(function (Child) { return (Child.getAttribute('loading') ?? '') === 'lazy' || /^jump\//.test(Child.getAttribute('data-doc') ?? '') }))
          })
          HideElementsImportant(PowerLinkContainers)
        } catch (error) {
          NamuLinkDebug(error)
        }
      }
    })
  }
})();