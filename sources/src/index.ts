import * as Zod from 'zod'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

// eslint-disable-next-line no-negated-condition
const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

const NagivationAdvertEvent = new Event('namuwikinavigationwithadvert')
const NagivationEvent = new Event('namuwikinavigation')
const FristVisitEvent = new Event('namuwikifristvisit')

const CheckEableAdsAdsMetadata = (AdsMetadata: unknown) => {
	if (Array.isArray(AdsMetadata)) {
		if (AdsMetadata.toString().includes('//adcr.naver.com/adcr?')) {
			return true
		}
	} else {
		for (const Key of Object.keys(AdsMetadata)) {
			try {
				if (typeof AdsMetadata[Key] === 'string' && (AdsMetadata[Key] as string).includes('//adcr.naver.com/adcr?')) {
					return true
				}
			} catch (error) { /* empty */ }
		}
	}

	return false
}

const IsFakeNumber = (Args: string) => !Number.isNaN(Number(Args))

const EableAdsAdsFlagObj = Zod.object({
	enable_ads: Zod.custom(IsFakeNumber),
})

const IsEableAdsObject = (Args: unknown) => typeof Args[0] !== 'undefined' && typeof Args[0] === 'object' && EableAdsAdsFlagObj.safeParse(Args).success && CheckEableAdsAdsMetadata(Args[0])

Win.Object.defineProperty = new Proxy(Win.Object.defineProperty, {
	apply(Target, ThisArg, Args) {
		if (IsEableAdsObject(Args)) {
			console.debug('[NamuLink:index]: Object.defineProperty:', [Target, ThisArg, Args])
		} else {
			Reflect.apply(Target, ThisArg, Args)
		}
	},
})

Win.TextDecoder.prototype.decode = new Proxy(Win.TextDecoder.prototype.decode, {
	apply(Target, ThisArg, Args) {
		const Decoded = Reflect.apply(Target, ThisArg, Args) as string
		if (Decoded.includes('//adcr.naver.com/adcr?')) {
			console.debug('[NamuLink:index]: TextDecoder.prototype.decode:', [Target, ThisArg, Args])
			Win.dispatchEvent(NagivationEvent)
			Win.dispatchEvent(NagivationAdvertEvent)
			return new Error()
		}

		if (Decoded === 'enable_ads' || decodeURIComponent(location.href).includes(Decoded)) {
			Win.dispatchEvent(NagivationEvent)
		}

		return Decoded
	},
})

Win.Array.prototype.push = new Proxy(Win.Array.prototype.push, {
	apply(Target, ThisArg, Args) {
		if (Args.toString().includes('//adcr.naver.com/adcr?')) {
			console.debug('[NamuLink:index]: Array.prototype.push:', [Target, ThisArg, Args])
			Win.dispatchEvent(FristVisitEvent)
		} else {
			Reflect.apply(Target, ThisArg, Args)
		}
	},
})

var HiddenElements: HTMLElement[] = []

const HideElements = (TargetElements: HTMLElement[]) => {
	HiddenElements.push(...TargetElements)
	TargetElements.forEach(TargetElement => {
		TargetElement.style.setProperty('display', 'none', 'important')
	})
}

const ShowElements = () => {
	console.debug('[NamuLink:index]: ShowElements:', HiddenElements)
	HiddenElements = HiddenElements.filter(HideElement => HideElement.parentElement !== null)
	HiddenElements.forEach(TargetElement => {
		TargetElement.style.removeProperty('display')
	})
	HiddenElements = []
}

const HideLeftoverElement = () => {
	const ElementsInArticle = Array.from(Win.document.querySelectorAll('article div:not([class*=" "]):has(h1)~ div * ~ div[class]'))
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('article div:not([class*=" "]):has(h1) ~ *')))
	const HTMLElementsInArticle = ElementsInArticle.filter(ElementInArticle => ElementInArticle instanceof HTMLElement) as HTMLElement[]
	var FilteredElements: HTMLElement[] = []
	const TargetedElements: HTMLElement[] = []
	FilteredElements = HTMLElementsInArticle.filter(HTMLElementInArticle => HTMLElementInArticle.innerText.length < 25)
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.some(ChildElement => Number(getComputedStyle(ChildElement).getPropertyValue('margin-bottom').replace(/px$/, '')) >= 4)
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		return ChildElements.filter(ChildElement => ChildElement instanceof HTMLIFrameElement).length === 0
	})
	TargetedElements.push(...FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.filter(ChildElement => getComputedStyle(ChildElement).getPropertyValue('animation-iteration-count') === 'infinite').length >= 6
	}))
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.some(ChildElement => Number(getComputedStyle(ChildElement).getPropertyValue('margin-bottom').replace(/px$/, '')) >= 10)
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.every(ChildElement => Number(getComputedStyle(ChildElement).getPropertyValue('margin-left').replace(/px$/, '')) <= 10)
	})
	TargetedElements.push(...FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		const PeerElements = Array.from(HTMLElementInArticle.parentElement?.querySelectorAll('*') ?? [])
		const PeerHTMLElements = PeerElements.filter(PeerElement => PeerElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.every(ChildHTMLElement => !ChildHTMLElement.innerText.includes('alt=\'external/')) && PeerHTMLElements.filter(PeerHTMLElement => PeerHTMLElement.nextElementSibling === HTMLElementInArticle && !(PeerHTMLElement instanceof HTMLHeadingElement)).length > 0
	}))
	console.debug('[NamuLink:index]: HideLeftoverElement:', TargetedElements)
	HideElements(TargetedElements)
}

Win.addEventListener('namuwikinavigationwithadvert', HideLeftoverElement)
Win.addEventListener('namuwikifristvisit', HideLeftoverElement)
Win.addEventListener('namuwikinavigation', 	ShowElements)
