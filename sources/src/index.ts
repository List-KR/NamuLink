import type { TPowerLinkContent, TUnitPath } from './powerlink.js'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

Win.Proxy = new Proxy(Win.Proxy, {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	construct<T extends object>(Target: ProxyConstructor, Args: [T, ProxyHandler<T>], NewTarget: Function): object {
    let ArgsObj = Args[0]
		if (typeof Args[0] === 'object' && Object.keys(Args[0]).some((Key: string) => Key.startsWith('Content'))
    && Object.keys(Args[0]).filter((Key: string) => Key.startsWith('Content')).some((Key: string) => {
      return typeof Args[0][Key].render === 'function' && Args[0][Key].render.toString().includes('powerlink')
    })) {
      let Contents = Object.keys(Args[0]).filter((Key: string) => Key.startsWith('Content')).map((Key: string) => Args[0][Key]) as TPowerLinkContent[]
      Contents.map((Content: TPowerLinkContent) => Content.render = () => {})
      return Reflect.construct(Target, [Contents, Args[1]], NewTarget)
    }
    
    let IsPowerLinkVariant2nd = false
    for (let [Key, Value] of Object.entries(Args[0])) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      if (typeof Value === 'object' && Value !== null && typeof Value.render === 'function' && (Value.render as Function).toString().includes('content--stretch')) {
        IsPowerLinkVariant2nd = true
        break
      }
    }
    if (IsPowerLinkVariant2nd) {
      let Contents = Args[0]
      for (let [Key, Value] of Object.entries(Contents)) {
        if (typeof Value === 'object' && Value !== null && typeof Value.render === 'function') {
          Value.render = () => {}
        }
      }
      return Reflect.construct(Target, [Contents, Args[1]], NewTarget)
    }

    let IsPowerLinkVariant3rd = false
    for (let [Key, Value] of Object.entries(Args[0])) {
      if (Key === 'unitPath' && typeof Value === 'string' && Value.includes('/namuwiki/') && !Value.includes('/sidebar')) {
        IsPowerLinkVariant3rd ||= true
        break
      }
    }
    if (IsPowerLinkVariant3rd) {
      (ArgsObj as TUnitPath).id = '';
      (ArgsObj as TUnitPath).size = [0, 0];
      (ArgsObj as TUnitPath).sizeMapping = [[0, 0]]
      return Reflect.construct(Target, [ArgsObj, Args[1]], NewTarget)
    }

    let IsPowerLinkVariant4th = false
    const PowerLinkVariant4th = [2, 2]
    let PowerLinkVariant4thIndex = [0, 0]
    for (let [Key, Value] of Object.entries(Args[0])) {
      switch (typeof Value) {
        case 'number':
          PowerLinkVariant4thIndex[0]++
        case 'boolean':
          PowerLinkVariant4thIndex[1]++
      }
    }
    if (PowerLinkVariant4thIndex[0] >= PowerLinkVariant4th[0] && PowerLinkVariant4thIndex[1] >= PowerLinkVariant4th[1]) {
      for (let [Key, Value] of Object.entries(Args[0])) {
        if (typeof Value === 'object' && Value !== null && Array.isArray(Value)) {
          let PowerLinkDataIndex = 0
          for (let PLData of Value) {
            if (typeof PLData === 'undefined' || PLData === null || typeof PLData !== 'object') {
              continue
            }
            try {
              if (JSON.stringify(Args[0]).match(/<[a-zA-Z]+ /).length > 20) {
                PowerLinkDataIndex = -99
              }
            } catch {}
            let PowerLinkDataIndexKey = [0, 0, 0, 0]
            const PowerLinkDataIndexConst = [3, 2, 2, 1]
            for (let [IKey, IValue] of Object.entries(PLData)) {
              switch (typeof IValue) {
                case 'string':
                  PowerLinkDataIndexKey[0]++
                case 'boolean':
                  PowerLinkDataIndexKey[1]++
                case 'object':
                  PowerLinkDataIndexKey[2]++
                case 'number':
                  PowerLinkDataIndexKey[3]++
              }
            }
            if (PowerLinkDataIndexKey[0] >= PowerLinkDataIndexConst[0] && PowerLinkDataIndexKey[1] >= PowerLinkDataIndexConst[1] && PowerLinkDataIndexKey[2] >= PowerLinkDataIndexConst[2] && PowerLinkDataIndexKey[3] >= PowerLinkDataIndexConst[3]) {
              PowerLinkDataIndex++
            }
          }
          if (PowerLinkDataIndex >= 2) {
            IsPowerLinkVariant4th ||= true
            break
          }
        }
      }
    }
    if (IsPowerLinkVariant4th) {
      for (let [Key, Value] of Object.entries(Args[0])) {
        if (typeof Value === 'object' && Value !== null && Array.isArray(Value)) {
          ArgsObj[Key] = []
        }
      }
      return Reflect.construct(Target, [ArgsObj, Args[1]], NewTarget)
    }

    return Reflect.construct(Target, Args, NewTarget)
	}
})

setInterval(() => {
  Array.from(document.querySelectorAll('div[class*=" "] div[class]')).filter(Filtered => Filtered instanceof HTMLElement &&
    (Filtered.innerText.includes('파워링크') || Filtered.innerText === '') && Number(getComputedStyle(Filtered).getPropertyValue('padding-top').replaceAll('px', '')) >= 8 &&
    Number(getComputedStyle(Filtered).getPropertyValue('min-height').replaceAll('px', '')) > 100 &&
    Number(getComputedStyle(Filtered).getPropertyValue('height').replaceAll('px', '')) < 350
  ).forEach(Target => Target.setAttribute('style', 'display: none !important;'))
  Array.from(document.querySelectorAll('div[class*=" "] div[class][style="display: none !important;"]')).filter(Filtered => Filtered instanceof HTMLElement &&
    Number(getComputedStyle(Filtered.parentElement).getPropertyValue('min-height').replaceAll('px', '')) > 100 &&
    Number(getComputedStyle(Filtered.parentElement).getPropertyValue('height').replaceAll('px', '')) < 350
  ).forEach(Target => Target.parentElement.parentElement.remove())
}, 2500)