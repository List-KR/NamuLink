type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

Win.Proxy = new Proxy(Win.Proxy, {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	construct<T extends object>(Target: ProxyConstructor, Args: [T, ProxyHandler<T>], NewTarget: Function): object {
		if (typeof Args[0] === 'object' && Array.isArray(Args[0]) && typeof Args[0][0] === 'object' && Array.isArray(Args[0][0])
		&& typeof Args[0][0][1] === 'string' && /^#x=[A-Za-z0-9-+]+\/\/\/.+=?/.test(Args[0][0][1])) {
			setTimeout(() => {
				Array.from(document.querySelectorAll('div[class*=" "] div[class]')).filter((TargetEle: HTMLElement) => {
					return TargetEle.innerText === '' && Array.from(TargetEle.querySelectorAll('*')).filter((ChildEle: HTMLElement) => {
						return getComputedStyle(ChildEle).getPropertyValue('animation').includes('infinite')
					}).length >= 6
				}).forEach((TargetEle: HTMLElement) => {
					TargetEle.setAttribute('style', 'visibility: hidden !important; width: 1px !important; height: 1px !important;')
				})
			}, 5000)
			return
		}
		return Reflect.construct(Target, Args, NewTarget)
	}
})