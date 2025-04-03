type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

let HidePowerLink = () => {
  let Target = Array.from(document.querySelectorAll('div[class*=" "] div[class*=" "]:has(*[href="#s-1"]):has([data-filesize])'))
  Target = Target.filter(El => El instanceof HTMLElement && Number(getComputedStyle(El).getPropertyValue('height').replaceAll('px', '')) < 300)
  Target.forEach(El => {
    El.remove()
  })
}

setInterval(HidePowerLink, 2500)