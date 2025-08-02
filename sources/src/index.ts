import { decodeIResult } from './decryptor.js'

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

let HidePowerLinkLeftover = () => {
  Array.from(document.querySelectorAll('div[class*=" "] div[class]:not(:has(svg))')).filter(Filtered => Filtered instanceof HTMLElement &&
    (Filtered.innerText.includes('파워링크') || Filtered.innerText.replaceAll(/(\n|\t)/g, '') === ''
    || Array.from(Filtered.querySelectorAll('img[src*="//i.namu.wiki/i/"]')).length > 2
    || Array.from(Filtered.querySelectorAll('span')).filter(Ele => getComputedStyle(Ele).getPropertyValue('background-image').startsWith('url(data:image/png;base64,'))) &&
    Number(getComputedStyle(Filtered).getPropertyValue('height').replaceAll('px', '')) < 400 &&
    Array.from(Filtered.querySelectorAll('*')).filter(Child => getComputedStyle(Child).getPropertyValue('animation-iteration-count') === 'infinite').length >= 6
  ).forEach(Target => Target.remove())
}


setInterval(() => {
  if (location.href.startsWith('https://namu.wiki/w/')) {
    HidePowerLinkLeftover()
    let AdContainers = Array.from(document.querySelectorAll('div[class*=" "] div[class]')).filter(AdContainer => AdContainer instanceof HTMLElement)

    AdContainers = AdContainers.filter((AdContainer) => {
      let AdContainerPaddingLeft = Number(getComputedStyle(AdContainer).getPropertyValue('padding-left').replaceAll('px', ''))
      let AdContainerPaddingRight = Number(getComputedStyle(AdContainer).getPropertyValue('padding-right').replaceAll('px', ''))
      let AdContainerPaddingTop = Number(getComputedStyle(AdContainer).getPropertyValue('padding-top').replaceAll('px', ''))
      let AdContainerPaddingBottom = Number(getComputedStyle(AdContainer).getPropertyValue('padding-bottom').replaceAll('px', ''))
      return AdContainerPaddingLeft > 5 && AdContainerPaddingRight > 5 && AdContainerPaddingTop > 5 && AdContainerPaddingBottom > 5
    })
    AdContainers = AdContainers.filter(AdContainer => AdClickElemnts.some(AdClickElemnt => AdContainer.contains(AdClickElemnt)))

    AdContainers = AdContainers.filter(AdContainer => GetParents(AdContainer).some(Parent => Number(getComputedStyle(Parent).getPropertyValue('margin-top').replaceAll('px', '')) > 10 ))

    AdContainers = AdContainers.filter(AdContainer => AdContainer.innerText.length < 1000)

    AdContainers = AdContainers.filter(AdContainer => Array.from(AdContainer.querySelectorAll('*[href="/RecentChanges"]')).filter(Ele => Ele instanceof HTMLElement && getComputedStyle(Ele).getPropertyValue('display') !== 'none').length === 0)

    AdContainers = AdContainers.filter(AdContainer => !AdContainer.innerText.includes((new URL(location.href).searchParams.get('from') || '') + '에서 넘어옴'))

    AdContainers = AdContainers.filter(AdContainer => !/\[[0-9]+\] .+/.test(AdContainer.innerText))

    AdContainers.forEach(Ele => Ele.remove())
  }
}, 1000)

let PowerLinkGenerationPositiveRegExps = [
  /for *\( *; *; *\) *switch *\( *_[a-z0-9]+\[_[a-z0-9]+\([a-z0-9]+\)\] *=_[a-z0-9]+/,
  /_[a-z0-9]+\[('|")[A-Z]+('|")\]\)\(\[ *\]\)/,
  /0x[a-z0-9]+ *\) *; *case/
]

Win.Function.prototype.bind = new Proxy(Win.Function.prototype.bind, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  apply(Target: typeof Function.prototype.bind, ThisArg: Function, Args: Parameters<typeof Function.prototype.bind>) {
    let StringifiedFunc = ThisArg.toString()
    if (PowerLinkGenerationPositiveRegExps.filter(Index => Index.test(StringifiedFunc)).length >= 3) {
      return Reflect.apply(Target, () => {}, [])
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})

Win.fetch = new Proxy(Win.fetch, {
  async apply(Target: typeof fetch, ThisArg: typeof Win, Args: Parameters<typeof fetch>) {
    let AwaitResult = Reflect.apply(Target, ThisArg, Args)
    let Result = await AwaitResult
    if (Result.headers.has('x-namuwiki-key') && Args[0] instanceof Request && Args[0].headers.has('x-namuwiki-nonce') &&
    decodeIResult(Args[0].url, Result.headers.get('x-namuwiki-key'), Args[0].headers.get('x-namuwiki-nonce'))) {
      return new Promise(() => {})
    }
    if (Result.headers.has('x-namuwiki-key') && !(Args[0] instanceof Request) && Args[1].headers instanceof Headers && Args[1].headers.has('x-namuwiki-nonce') &&
    decodeIResult(Args[0] instanceof URL ? Args[0].pathname : Args[0], Result.headers.get('x-namuwiki-key'), Args[1].headers.get('x-namuwiki-nonce'))) {
      return new Promise(() => {})
    }
    if (Result.headers.has('x-namuwiki-key') && !(Args[0] instanceof Request) && !(Args[1].headers instanceof Headers) &&
    Array.isArray(Args[1].headers) && Args[1].headers.some(InnerHeader => InnerHeader[0] === 'x-namuwiki-nonce') &&
    decodeIResult(Args[0] instanceof URL ? Args[0].pathname : Args[0], Result.headers.get('x-namuwiki-key'), Args[1].headers.find(InnerHeader => InnerHeader[0] === 'x-namuwiki-nonce')[1])) {
      return new Promise(() => {})
    }
    if (Result.headers.has('x-namuwiki-key') && !(Args[0] instanceof Request) && !(Args[1].headers instanceof Headers) &&
    !Array.isArray(Args[1].headers) && typeof Args[1].headers['x-namuwiki-nonce'] === 'string' &&
    decodeIResult(Args[0] instanceof URL ? Args[0].pathname : Args[0], Result.headers.get('x-namuwiki-key'), Args[1].headers['x-namuwiki-nonce'])) {
      return new Promise(() => {})
    }
    return Result
  }
})