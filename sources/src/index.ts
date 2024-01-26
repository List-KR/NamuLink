type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

(function () {
	// eslint-disable-next-line no-negated-condition
	const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window
	/**
	 * Leave debug message to console.
	 * @param message The message to leave.
	 */
	function NamuLinkDebug(Message: any): void {
		const StackTrace = new Error().stack
		console.debug(`NamuLink: ${StackTrace.split('\n')[1].trim()} ${StackTrace.split('\n')[2].trim()}:`, Message)
	}

	/**
	 * Hide elements by setting their display to none.
	 * @param elements The elements to hide.
	 * @returns The count of elements that were hidden.
	 */
	function HideElementsImportant(HideElements: HTMLElement[]): number {
		if (HideElements.length === 0) {
			return 0
		}

		for (const HideElement of HideElements) {
			HideElement.style.setProperty('display', 'none', 'important')
		}

		NamuLinkDebug(HideElements)
		return HideElements.length
	}

	/**
	 * Get parents of a element.
	 * @param element The element to get parents of.
	 */
	function Parents(ParentsElement: HTMLElement) {
		const ParentsArray: HTMLElement[] = []
		let CurrentElement: HTMLElement = ParentsElement
		while ((CurrentElement = CurrentElement.parentElement) !== null) {
			ParentsArray.push(CurrentElement)
		}

		return ParentsArray
	}

	/**
	 * Get children of a element.
	 * @param element The element to get children of.
	 */
	function Children(ChildrenElement: HTMLElement) {
		return Array.from(ChildrenElement.querySelectorAll('*')).filter(AllElement => AllElement instanceof HTMLElement) as HTMLElement[]
	}

	// The following proxy handles PowerLink advertisement that is loaded after the initial loading.
	for (const BitArrayObj of [Win.Uint8ClampedArray, Win.Int8Array, Win.Uint8Array]) {
		// Prepare function for Uint8ClampedArray, Int8Array and Uint8Array.
		// eslint-disable-next-line @typescript-eslint/no-loop-func, no-inner-declarations
		function BitArrayProxy(Target, ThisArg, ArgumentsList) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const OriginalValue: Uint16Array | Int8Array | Uint8Array = Reflect.apply(Target, ThisArg, ArgumentsList)
			if (typeof new TextDecoder().decode(OriginalValue) !== 'string') {
				NamuLinkDebug(OriginalValue)
				HideElementsImportant(
					// eslint-disable-next-line no-irregular-whitespace
					Array.from(document.body.querySelectorAll('*')).filter(AllElement => AllElement instanceof HTMLElement && /^(|[​\n\t ]{1,})$/.test(AllElement.innerText)
						&& parseInt(getComputedStyle(AllElement).getPropertyValue('margin-top').replace(/px$/, ''), 10) > 20
						&& !(Children(AllElement).some(Child => (Child.getAttribute('loading') ?? '') === 'lazy' || (Child.getAttribute('data-doc') ?? '').startsWith('jump/')))
						&& Array.from(AllElement.children).filter(Children => Array.from(Children.querySelectorAll('*')).filter(ChildrenAll => getComputedStyle(ChildrenAll).getPropertyValue('animation-iteration-count') === 'infinite')).length > 0) as HTMLElement[],
				)
				return crypto.getRandomValues(new BitArrayObj(OriginalValue.length))
			}

			return OriginalValue
		}

		// Modify original prototype function.
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		BitArrayObj.prototype.slice = new Proxy(BitArrayObj.prototype.slice, {apply: BitArrayProxy})
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		BitArrayObj.from = new Proxy(BitArrayObj.from, {apply: BitArrayProxy})
	}

	// Override TextDecoder.prototype.decode to detect PowerLink advertisement.
	TextDecoder.prototype.decode = new Proxy(TextDecoder.prototype.decode, {
		apply(Target, ThisArg, ArgumentsList) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const OriginalValue = Reflect.apply(Target, ThisArg, ArgumentsList)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
			return /\[+.+\/\/adcr\.naver\.com\/adcr\?.+,.+/.test(OriginalValue) ? new ReferenceError() : OriginalValue
		},
	})

	// Hide other leftovers.
	document.addEventListener('DOMContentLoaded', () => {
		for (const SelectedElement of Array.from(document.querySelectorAll('iframe[src*="//arca.live/external/callad"]')).filter(AllElement => AllElement instanceof HTMLElement) as HTMLElement[]) {
			// eslint-disable-next-line @typescript-eslint/no-loop-func
			HideElementsImportant(Parents(SelectedElement).filter(ParentsElement => ParentsElement.innerText === ''
				&& parseInt(getComputedStyle(ParentsElement).getPropertyValue('padding-bottom').replace(/px$/, ''), 10) > 15))
		}

		const ArcaLivePowerLink = Array.from(document.querySelectorAll('iframe[src*="//arca.live/static/ad/powerlink.html?size="]')).filter(AllElement => AllElement instanceof HTMLElement) as HTMLElement[]
		HideElementsImportant(ArcaLivePowerLink.filter(AllElement => AllElement.offsetHeight > 100 && AllElement.offsetWidth > 100))
	})

	// The following proxy handles initial loading PowerLink advertisement when visiting NamuWiki document in a web browser tab.
	// https://github.com/List-KR/NamuLink/issues/14
	// https://github.com/List-KR/NamuLink/issues/18
	if ((navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) && typeof performance.eventCounts === 'undefined') {
		NamuLinkDebug('Apple iOS Safari detected.')
		try {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			const DivTableElements = Array.from(document.querySelectorAll('div,table')) as HTMLElement[]
			const PowerLinkContainers: HTMLElement[] = DivTableElements.filter(TableElement => parseInt(getComputedStyle(TableElement).getPropertyValue('margin-top').replace(/px$/, ''), 10) > 15
				&& Children(TableElement).some(Child => (decodeURIComponent(Child.getAttribute('href') ?? '')).startsWith(`/w/${Child.getAttribute('title') ?? ''}`) || (decodeURIComponent(Child.getAttribute('href') ?? '')).startsWith(`/w/사용자:${Child.getAttribute('title') ?? ''}`))
				&& !(Children(TableElement).some(Child => (Child.getAttribute('loading') ?? '') === 'lazy' || (Child.getAttribute('data-doc') ?? '').startsWith('jump/')))
				&& !(Children(TableElement).some(Child => (Child.getAttribute('href') ?? '').startsWith('#rfn-'))))
			HideElementsImportant(PowerLinkContainers)
		} catch (error) {
			NamuLinkDebug(error)
		}
	} else {
		document.addEventListener('DOMContentLoaded', () => {
			if (document.querySelector('script[src^="/cdn-cgi/challenge-platform/h/g/orchestrate/chl_page/"]') === null && document.querySelector('a[href="/"]') !== null) {
				NamuLinkDebug('DOMContentLoaded event detected.')
				try {
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
					const DivTableElements = Array.from(document.querySelectorAll('div,table')) as HTMLElement[]
					const PowerLinkContainers: HTMLElement[] = DivTableElements.filter(TableElement => parseInt(getComputedStyle(TableElement).getPropertyValue('margin-top').replace(/px$/, ''), 10) > 25
						&& Children(TableElement).some(Child => (decodeURIComponent(Child.getAttribute('href') ?? '')).startsWith(`/w/${Child.getAttribute('title') ?? ''}`) || (decodeURIComponent(Child.getAttribute('href') ?? '')).startsWith(`/w/사용자:${Child.getAttribute('title') ?? ''}`))
						&& !(Children(TableElement).some(Child => (Child.getAttribute('loading') ?? '') === 'lazy' || (Child.getAttribute('data-doc') ?? '').startsWith('jump/')))
						&& !(Children(TableElement).some(Child => (Child.getAttribute('href') ?? '').startsWith('#rfn-'))))
					HideElementsImportant(PowerLinkContainers)
				} catch (error) {
					NamuLinkDebug(error)
				}
			}
		})
	}
})()
