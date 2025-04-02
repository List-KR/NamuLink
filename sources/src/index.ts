type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

let PositiveRegExps = [
  /('|")[0-9]+('|") *=== *\( *null *=== *\(_[A-Za-z0-9]+ *= *this/,
  /\|\| *void *\([-A-Za-z0-9+* -]+ *\) *=== *_[A-Za-z0-9]+/,
  /=== *_[A-Za-z0-9]+ *\? *void/
]
let NegaitiveRegExps = [/(Promise|_[A-Za-z0-9]+)\( *_[A-Za-z0-9]+ *=> *(setTimeout|_[A-Za-z0-9]+)/]

Win.Function.prototype.bind = new Proxy(Win.Function.prototype.bind, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  apply(Target: typeof Function.prototype.bind, ThisArg: Function, Args: Parameters<typeof Function.prototype.bind>) {
    let Stringified = ThisArg.toString()
    if (PositiveRegExps.filter(Index => Index.test(Stringified)).length >= 3 && NegaitiveRegExps.every(Index => !Index.test(Stringified))) {
      console.debug('[NamuLink]: Function.prototype.bind:', ThisArg, Args)
      return Reflect.apply(Target, () => {}, [])
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})

setInterval(() => {
  Array.from(document.querySelectorAll('div[class*=" "] div[class]:not(:has(svg))')).filter(Filtered => Filtered instanceof HTMLElement &&
    (Filtered.innerText.includes('파워링크') || Filtered.innerText.replaceAll(/(\n|\t)/g, '') === ''
    || Array.from(Filtered.querySelectorAll('img[src*="//i.namu.wiki/i/"]')).length > 2
    || Array.from(Filtered.querySelectorAll('span')).filter(Ele => getComputedStyle(Ele).getPropertyValue('background-image').startsWith('url(data:image/png;base64,'))) &&
    Number(getComputedStyle(Filtered).getPropertyValue('height').replaceAll('px', '')) < 400 &&
    Array.from(Filtered.querySelectorAll('*')).filter(Child => getComputedStyle(Child).getPropertyValue('animation-iteration-count') === 'infinite').length > 8
  ).forEach(Target => Target.remove())
}, 2500)