import type { TPowerLink } from './powerlink.js'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

Win.Object.defineProperty = new Proxy(Win.Object.defineProperty, {
  apply(Target: typeof Object.defineProperty, ThisArg: null, Args: Parameters<typeof Object.defineProperty>) {
    if (Args[0] && typeof (Args[0] as TPowerLink).unitPath === 'string'
    && /^\/[0-9]+\/namuwiki\/(?!sidebar-box)/.test((Args[0] as TPowerLink).unitPath)) {
      return
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})

setInterval(() => {
  Array.from(document.querySelectorAll('div[class*=" "] div[class]')).filter(Filtered => Filtered instanceof HTMLElement &&
    (Filtered.innerText.includes('파워링크') || Filtered.innerText === '') && Number(getComputedStyle(Filtered).getPropertyValue('padding-top').replaceAll('px', '')) >= 8 &&
    Number(getComputedStyle(Filtered).getPropertyValue('min-height').replaceAll('px', '')) > 100 &&
    Number(getComputedStyle(Filtered).getPropertyValue('height').replaceAll('px', '')) < 400
  ).forEach(Target => Target.setAttribute('style', 'display: none !important;'))
  Array.from(document.querySelectorAll('div[class*=" "] div[class][style="display: none !important;"]')).filter(Filtered => Filtered instanceof HTMLElement &&
    Number(getComputedStyle(Filtered.parentElement).getPropertyValue('min-height').replaceAll('px', '')) > 100 &&
    Number(getComputedStyle(Filtered.parentElement).getPropertyValue('height').replaceAll('px', '')) < 400
  ).forEach(Target => Target.parentElement.parentElement.remove())
}, 2500)