// ==UserScript==
// @name         NamuLink
// @encoding     utf-8
// @namespace    https://github.com/List-KR/NamuLink
// @homepageURL  https://github.com/List-KR/NamuLink
// @supportURL   https://github.com/List-KR/NamuLink/issues
// @updateURL    https://cdn.jsdelivr.net/gh/List-KR/NamuLink@main/NamuLink.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/List-KR/NamuLink@main/NamuLink.user.js
// @license      MIT
//
// @version      2.1.0
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
    console.debug(`NamuLink: ${new Error().stack.split('\n')[1].trim()}: ${message}`)
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
    return Array.from(element.querySelectorAll('*'))
  }
})();