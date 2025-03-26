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
    if (Args[1] === '__v_skip' && typeof Args[0] === 'object' && Args[0] !== null && 'render' in Args[0]
      // eslint-disable-next-line @typescript-eslint/naming-convention
      && typeof (Args[0] as { render: unknown }).render === 'function' &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      ((Args[0].render as Function).toString().includes('head__link') || (Args[0].render as Function).toString().includes('head__badge'))) {
      return {}
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})

Win.TextDecoder.prototype.decode = new Proxy(Win.TextDecoder.prototype.decode, {
  apply(Target: typeof TextDecoder.prototype.decode, ThisArg: TextDecoder, Args: Parameters<typeof TextDecoder.prototype.decode>) {
    const DecodedText = Reflect.apply(Target, ThisArg, Args)
    if (DecodedText.startsWith('[[[[') && DecodedText.includes('///w==')) {
      return ''
    }
    return DecodedText
  }
})

setInterval(() => {
  Array.from(document.querySelectorAll('div[class*=" "] div[class]')).filter(Filtered => Filtered instanceof HTMLElement &&
    (Filtered.innerText.includes('파워링크') || Filtered.innerText === ''
    || Array.from(Filtered.querySelectorAll('img[src*="//i.namu.wiki/i/"]')).length > 2
    || Array.from(Filtered.querySelectorAll('span')).filter(Ele => getComputedStyle(Ele).getPropertyValue('background-image').startsWith('url(data:image/png;base64,'))) && Number(getComputedStyle(Filtered).getPropertyValue('padding-top').replaceAll('px', '')) >= 8 &&
    Number(getComputedStyle(Filtered).getPropertyValue('min-height').replaceAll('px', '')) > 100 &&
    Number(getComputedStyle(Filtered).getPropertyValue('height').replaceAll('px', '')) < 400
  ).forEach(Target => Target.setAttribute('style', 'display: none !important;'))
  Array.from(document.querySelectorAll('div[class*=" "] div[class*=" "]')).filter(Filtered => Filtered instanceof HTMLElement &&
    Number(getComputedStyle(Filtered).getPropertyValue('min-height').replaceAll('px', '')) > 100 &&
    Number(getComputedStyle(Filtered).getPropertyValue('height').replaceAll('px', '')) < 400 &&
    Array.from(Filtered.querySelectorAll('*[style="display: none !important;"]')).length > 0
  ).forEach(Target => Target.remove())
}, 2500)