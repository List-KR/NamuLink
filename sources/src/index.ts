type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

let AdClickElemnts: HTMLElement[] = []
let AdClickFuncRegExps = [
  /=> *{ *if *\( *[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+ *\) *\{ *if *\( *[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+ *<=/,
  /\.map\( *\( *[a-zA-Z0-9_]+ *=> *[a-zA-Z0-9_]+ *=> *! *[a-zA-Z0-9_]+\._stopped *&&/
]

function GetParents(Ele: HTMLElement) {
  let Parents: HTMLElement[] = []
  while (Ele.parentElement) {
    Parents.push(Ele.parentElement)
    Ele = Ele.parentElement
  }
  return Parents
}

Win.EventTarget.prototype.addEventListener = new Proxy(Win.EventTarget.prototype.addEventListener, {
  apply(Target: typeof EventTarget.prototype.addEventListener, ThisArg: EventTarget, Args: Parameters<typeof EventTarget.prototype.addEventListener>) {
    if (ThisArg instanceof HTMLElement && Args[0] === 'click' && typeof Args[1] === 'function' && AdClickFuncRegExps.filter(Index => Index.test(Args[1].toString())).length >= 2) {
      AdClickElemnts.push(ThisArg)
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})

setInterval(() => {
  if (!location.href.startsWith('https://namu.wiki/w/')) {
    let AdContainers = Array.from(document.querySelectorAll('div[class*=" "] div[class]')).filter(AdContainer => AdContainer instanceof HTMLElement)

    AdContainers = AdContainers.filter((AdContainer) => {
      let AdContainerPaddingLeft = Number(getComputedStyle(AdContainer).getPropertyValue('padding-left').replaceAll('px', ''))
      let AdContainerPaddingRight = Number(getComputedStyle(AdContainer).getPropertyValue('padding-right').replaceAll('px', ''))
      let AdContainerPaddingTop = Number(getComputedStyle(AdContainer).getPropertyValue('padding-top').replaceAll('px', ''))
      let AdContainerPaddingBottom = Number(getComputedStyle(AdContainer).getPropertyValue('padding-bottom').replaceAll('px', ''))
      return AdContainerPaddingLeft > 5 && AdContainerPaddingRight > 5 && AdContainerPaddingTop > 5 && AdContainerPaddingBottom > 5
    })
    AdContainers = AdContainers.filter(AdContainer => AdClickElemnts.some(AdClickElemnt => AdContainer.contains(AdClickElemnt)))

    AdContainers = AdContainers.filter(AdContainer => GetParents(AdContainer).some(Parent => Number(getComputedStyle(Parent).getPropertyValue('padding-top').replaceAll('px', '')) > 20 ))

    AdContainers = AdContainers.filter(AdContainer => AdContainer.innerText.length < 1000)

    AdContainers = AdContainers.filter(AdContainer => Array.from(AdContainer.querySelectorAll('*[href="/RecentChanges"]')).filter(Ele => Ele instanceof HTMLElement && getComputedStyle(Ele).getPropertyValue('display') !== 'none').length === 0)

    AdContainers = AdContainers.filter(AdContainer => !AdContainer.innerText.includes((new URL(location.href).searchParams.get('from') || '') + '에서 넘어옴'))

    AdContainers = AdContainers.filter(AdContainer => !/\[[0-9]+\] .+/.test(AdContainer.innerText))

    AdContainers.forEach(Ele => Ele.remove())
  }
}, 1000)