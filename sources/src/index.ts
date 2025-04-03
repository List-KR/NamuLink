type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

const OriginalFunctinPrototypeCall = Function.prototype.call
const OriginalFunctionPrototypeToString = Function.prototype.toString

let PositiveRegexps = [
  /; *for *\( *; *; *\) *switch *\( *_[A-Za-z0-9]+\[/,
  /; *case *[A-Za-z0-9 *+-]+: *_[A-Za-z0-9]+ *= *_[A-Za-z0-9]+/,
  /&& *\(_[A-Za-z0-9]+ *= *_[A-Za-z0-9]+/,
  /xi/
]

let HidePowerLink = () => {
  Array.from(document.querySelectorAll('div[class*=" "] div[class]:not(:has(svg))')).filter(Filtered => Filtered instanceof HTMLElement &&
    (Filtered.innerText.includes('파워링크') || Filtered.innerText.replaceAll(/(\n|\t)/g, '') === ''
    || Array.from(Filtered.querySelectorAll('img[src*="//i.namu.wiki/i/"]')).length > 2
    || Array.from(Filtered.querySelectorAll('span')).filter(Ele => getComputedStyle(Ele).getPropertyValue('background-image').startsWith('url(data:image/png;base64,'))) &&
    Number(getComputedStyle(Filtered).getPropertyValue('height').replaceAll('px', '')) < 400 &&
    Array.from(Filtered.querySelectorAll('*')).filter(Child => getComputedStyle(Child).getPropertyValue('animation-iteration-count') === 'infinite').length > 8
  ).forEach(Target => Target.remove())
}

Win.Function.prototype.call = new Proxy(Win.Function.prototype.call, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  apply(Target: typeof Function.prototype.call, ThisArg: Function, Args: Parameters<typeof Function.prototype.call>) {
    if (ThisArg === OriginalFunctinPrototypeCall) {
      return Reflect.apply(Target, ThisArg, Args)
    }
    let Stringified = Reflect.apply(OriginalFunctionPrototypeToString, ThisArg, [])
    if (Stringified.length < 5000 && PositiveRegexps.filter(Index => Index.test(Stringified)).length >= 4) {
      HidePowerLink()
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})

setInterval(HidePowerLink, 2500)