type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

Win.Function.prototype.apply = new Proxy(Win.Function.prototype.apply, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  apply(Target: typeof Function.prototype.apply, ThisArg: Function, Args: Parameters<typeof Function.prototype.apply>) {
    if (typeof ThisArg === 'function' && /switch *\(.+, *new/.test(ThisArg.toString()) && /for *\( *; *; *\)/.test(ThisArg.toString()) &&
    ['encodeURIComponent', 'namu.wiki/w/', 'x-namuwiki-key', 'X-Chika', 'setTimeout', 'x-ruby', 'X-You', 'Uint8Array', 'referrer', 'throw new Error'].filter(Index => ThisArg.toString().includes(Index)).length > 3) {
      return
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})

setInterval(() => {
  Array.from(document.querySelectorAll('div[class*=" "] div[class]')).filter(Filtered => Filtered instanceof HTMLElement &&
    (Filtered.innerText.includes('파워링크') || Filtered.innerText.replaceAll(/(\n|\t)/g, '') === ''
    || Array.from(Filtered.querySelectorAll('img[src*="//i.namu.wiki/i/"]')).length > 2
    || Array.from(Filtered.querySelectorAll('span')).filter(Ele => getComputedStyle(Ele).getPropertyValue('background-image').startsWith('url(data:image/png;base64,'))) &&
    Number(getComputedStyle(Filtered).getPropertyValue('height').replaceAll('px', '')) < 400 &&
    Array.from(Filtered.querySelectorAll('*')).filter(Child => getComputedStyle(Child).getPropertyValue('animation-iteration-count') === 'infinite').length > 8
  ).forEach(Target => Target.remove())
}, 2500)