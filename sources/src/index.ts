type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

let HideLeftover = () => {
	setInterval(() => {
		Array.from(document.querySelectorAll('div[class*=" "] div[class]')).filter((TargetEle: HTMLElement) => {
			return (Array.from(TargetEle.querySelectorAll('*')).filter((ChildEle: HTMLElement) => {
				return getComputedStyle(ChildEle).getPropertyValue('animation').includes('infinite')
				}).length >= 6 || TargetEle.innerText === '' || TargetEle.innerText.includes('파워링크')) &&
			(Number(getComputedStyle(TargetEle).getPropertyValue('margin-top').replace('px', '')) > 10 || Number(getComputedStyle(TargetEle).getPropertyValue('margin-bottom').replace('px', '')) > 10) &&
			Number(getComputedStyle(TargetEle).getPropertyValue('height').replace('px', '')) < 350
		}).forEach((TargetEle: HTMLElement) => {
			TargetEle.setAttribute('style', 'visibility: hidden !important; width: 1px !important; height: 1px !important;')
		})
	}, 2500)
}

let RegExPatterns: RegExp[] = [
	/^#x=[A-Za-z0-9-+]+\/\/\/.+=?$/,
	/^[A-Za-z0-9+\/]+\/{3,}w=+/
]

Win.Proxy = new Proxy(Win.Proxy, {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	construct<T extends object>(Target: ProxyConstructor, Args: [T, ProxyHandler<T>], NewTarget: Function): object {
		if (typeof Args[0] === 'object' && Array.isArray(Args[0]) && typeof Args[0][0] === 'object' && Array.isArray(Args[0][0])
		&& typeof Args[0][0][1] === 'string' && RegExPatterns.some((Pattern: RegExp) => Pattern.test(Args[0][0][1]))) {
			HideLeftover()
			return Reflect.construct(Target, [Args[0], ['파워링크']], NewTarget)
		}
		if (typeof Args[0] === 'object' && Object.keys(Args[0]).some((Key: string) => RegExPatterns.some((Pattern: RegExp) => typeof Args[0][Key] === 'string' && Pattern.test(Args[0][Key])))) {
			HideLeftover()
			let ArgsObj = Args[0]
			Object.keys(ArgsObj).map((Key: string) => {
				if (typeof ArgsObj[Key] === 'string') {
					ArgsObj[Key] = '파워링크'
				}
			})
			return Reflect.construct(Target, [Args[0], ArgsObj], NewTarget)
		}
		if (typeof Args[0] === 'object' && Object.keys(Args[0]).some((Key: string) => typeof Args[0][Key] === 'string' && Args[0][Key].includes('searchad.naver.com'))) {
			HideLeftover()
			return
		}
		
		// Object inner section analysis
		let TensorResult: Array<number> = [0, 0, 0] // string, number, boolean
		if (typeof Args[0] === 'object') {
			Object.keys(Args[0]).forEach((Key: string) => {
				switch (typeof Args[0][Key]) {
					case 'string':
						TensorResult[0]++
						break
					case 'number':
						TensorResult[1]++
						break
					case 'boolean':
						TensorResult[2]++
						break
				}
			})
		}
		if (TensorResult.every((Result) => Result >= 3)) {
			HideLeftover()
			return Reflect.construct(Target, [Args[0], ['파워링크']], NewTarget)
		}
		//

		return Reflect.construct(Target, Args, NewTarget)
	}
})