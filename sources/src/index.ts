import {Superstruct} from '../esbuild.inject.js'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

// eslint-disable-next-line no-negated-condition
const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

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
			} catch (error) {}
		}
	}

	return false
}

const IsFakeNumber = (Args: string) => !Number.isNaN(Number(Args))

const EableAdsAdsFlagObj = Superstruct.object({
	enable_ads: Superstruct.define('IsFakeNumber', IsFakeNumber),
})

const IsEableAdsObject = (Args: unknown) => typeof Args[0] !== 'undefined' && typeof Args[0] === 'object' && Superstruct.validate(Args, EableAdsAdsFlagObj) && CheckEableAdsAdsMetadata(Args[0])

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
			return new Error()
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

const HideElements = (TargetElements: HTMLElement[]) => {
	TargetElements.forEach(TargetElement => {
		TargetElement.style.setProperty('display', 'none', 'important')
	})
}

const HideLeftoverElement = () => {
	const ElementsInArticle = Array.from(Win.document.querySelectorAll('article div[class*=" "]:has(> span + ul) ~ div * ~ div[class]'))
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('article div:not([class*=" "]):has(h1) ~ *')))
	const HTMLElementsInArticle = ElementsInArticle.filter(ElementInArticle => ElementInArticle instanceof HTMLElement) as HTMLElement[]
	var TargetElements: HTMLElement[] = []
	TargetElements = HTMLElementsInArticle.filter(HTMLElementInArticle => Number(getComputedStyle(HTMLElementInArticle).getPropertyValue('margin-top').replace(/px$/, '')) > 10)
	TargetElements = TargetElements.filter(HTMLElementInArticle => {
		const ParentElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ParentHTMLElements = ParentElements.filter(ParentElement => ParentElement instanceof HTMLElement) as HTMLElement[]
		return ParentHTMLElements.filter(ParentElement => getComputedStyle(ParentElement).getPropertyValue('animation-iteration-count') === 'infinite').length >= 6
	})
	console.debug('[NamuLink:index]: HideLeftoverElement:', TargetElements)
	HideElements(TargetElements)
}

Win.addEventListener('namuwikinavigation', HideLeftoverElement)
Win.addEventListener('namuwikifristvisit', HideLeftoverElement)