import type { TPowerLinkContent } from './powerlinkcontent.js'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

Win.Proxy = new Proxy(Win.Proxy, {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	construct<T extends object>(Target: ProxyConstructor, Args: [T, ProxyHandler<T>], NewTarget: Function): object {
		if (typeof Args[0] === 'object' && Object.keys(Args[0]).some((Key: string) => Key.startsWith('Content'))
    && Object.keys(Args[0]).filter((Key: string) => Key.startsWith('Content')).some((Key: string) => {
      return typeof Args[0][Key].render === 'function' && Args[0][Key].render.toString().includes('powerlink')
    })) {
      let Contents = Object.keys(Args[0]).filter((Key: string) => Key.startsWith('Content')).map((Key: string) => Args[0][Key]) as TPowerLinkContent[]
      Contents.map((Content: TPowerLinkContent) => Content.render = () => {})
      return Reflect.construct(Target, [Contents, Args[1]], NewTarget)
    }
		return Reflect.construct(Target, Args, NewTarget)
	}
})