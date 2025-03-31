type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window
let PositiveStringifiedRegExps = [/case[a-zA-Z0-9_+\(\)\[\]*, -]+: *return *_/, /('|")\|('|")[a-zA-Z0-9_+\(\)\[\]*,-]+('|")\|0('|")/, /regeneratorRuntime/, /Promise/, /X-Riko/, /split/, /headers/, /AbortController/, /includes/, /encodeURIComponent/,
  /namu.wiki\/w\//, /x-namuwiki-key/, /X-Chika/, /setTimeout/, /x-ruby/, /X-You/, /Uint8Array/, /referrer/, /xi/, /===_/, /document/]
let NegativeStringifiedRegExps = [/throw *[a-zA-Z0-9_\[\]\(\)]+ *= *null *, *[a-zA-Z0-9_\[\]\(\)]+/, /\( *this *, *arguments *\)/, / *_[a-xA-Z0-9]+\[('|")t[0-9]('|")\]/]

Win.Function.prototype.apply = new Proxy(Win.Function.prototype.apply, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  apply(Target: typeof Function.prototype.apply, ThisArg: Function, Args: Parameters<typeof Function.prototype.apply>) {
    if (typeof ThisArg !== 'function') {
      return Reflect.apply(Target, ThisArg, Args)
    }
    let Stringified = ThisArg.toString()
    if (/for *\( *; *; *\) *switch *\( *[a-zA-Z0-9_\[\]\(\)]+ *= *[a-zA-Z0-9_\[\]\(\)]+ *{/.test(Stringified) && /; *case *[_a-zA-Z0-9\[\]\(\)+*-]+: *return/.test(Stringified)
    && NegativeStringifiedRegExps.every(Index => !(Index.test(Stringified)))
    && PositiveStringifiedRegExps.filter(Index => Index.test(Stringified)).length > 3) {
      console.debug('[NamuLink]: Function.prototype.apply:', ThisArg, Args)
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