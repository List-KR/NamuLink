import PLimit from 'p-limit'
import {SplitElementsIntoSubArrayLength} from 'multithread-array'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

// eslint-disable-next-line no-negated-condition
const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

const NagivationAdvertEvent = new Event('namuwikinavigationwithadvert')
const NagivationEvent = new Event('namuwikinavigation')
const FristVisitEvent = new Event('namuwikifristvisit')



const AvoidBeforeInitialization = (ObjectParam: object) => {
	var Result = []
	try {
		Result = Object.entries(ObjectParam)
	} catch { /* empty */ }
	return Result
}

Win.Object.defineProperty = new Proxy(Win.Object.defineProperty, {
	apply(Target, ThisArg, Args) {
		const Result = Reflect.apply(Target, ThisArg, Args)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [Key, Value] of AvoidBeforeInitialization(Result)) {
			if (Array.isArray(Value) && Value.some(Subvalue => {
				return typeof Subvalue === 'string' && Subvalue.includes('//adcr.naver.com/adcr?')
			})) {
				Win.dispatchEvent(FristVisitEvent)
				Win.dispatchEvent(NagivationAdvertEvent)
				throw new Error()
			}
		}

		if (Array.isArray(Result) && Result.every(Subvalue => Array.isArray(Subvalue) && Subvalue.some(SubSubvalue => {
			return typeof SubSubvalue == 'string' && SubSubvalue === 'div'
		}))) {
			Win.dispatchEvent(NagivationEvent)
		}

		return Result
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

const HideLeftoverElementNano = (ElementsInArticle: Element[]) => {
	var FilteredElements = ElementsInArticle.filter(ElementInArticle => ElementInArticle instanceof HTMLElement) as HTMLElement[]
	const TargetedElements: HTMLElement[] = []
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => HTMLElementInArticle.innerText.length < 25)
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.some(ChildElement => Number(getComputedStyle(ChildElement).getPropertyValue('margin-bottom').replace(/px$/, '')) >= 4)
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		return ChildElements.filter(ChildElement => ChildElement instanceof HTMLIFrameElement).length === 0
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return HTMLElementInArticle.querySelectorAll('span[id^="fn-"] + a[href^="#rfn-"]').length === 0
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('a[rel="noopener"][target="_blank"][class] > span ~ span')).some(HTMLElement => (HTMLElement as HTMLElement).innerHTML.includes('나무뉴스'))
	})
	TargetedElements.push(...FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.filter(ChildElement => getComputedStyle(ChildElement).getPropertyValue('animation-iteration-count') === 'infinite').length >= 6
	}))
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.some(ChildElement => Number(getComputedStyle(ChildElement).getPropertyValue('margin-bottom').replace(/px$/, '')) >= 10) &&
		ChildHTMLElements.every(ChildElement => Number(getComputedStyle(ChildElement).getPropertyValue('margin-left').replace(/px$/, '')) <= 10)
	})
	TargetedElements.push(...FilteredElements.filter(HTMLElementInArticle => {
		const ChildElements = Array.from(HTMLElementInArticle.querySelectorAll('*'))
		const ChildHTMLElements = ChildElements.filter(ChildElement => ChildElement instanceof HTMLElement) as HTMLElement[]
		const PeerElements = Array.from(HTMLElementInArticle.parentElement?.querySelectorAll('*') ?? [])
		const PeerHTMLElements = PeerElements.filter(PeerElement => PeerElement instanceof HTMLElement) as HTMLElement[]
		return ChildHTMLElements.every(ChildHTMLElement => !ChildHTMLElement.innerText.includes('alt=\'external/')) && PeerHTMLElements.filter(PeerHTMLElement => PeerHTMLElement.nextElementSibling === HTMLElementInArticle && !(PeerHTMLElement instanceof HTMLHeadingElement)).length > 0
	}))
	return TargetedElements
}

const HideLeftoverElement = async () => {
	const ElementsInArticle = []
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ div[class]')))
	let TargetedElements: HTMLElement[] = []
	const PLimitInstance = PLimit((navigator.hardwareConcurrency ?? 4) < 4 ? 4 : navigator.hardwareConcurrency)
	const PLimitJobs: Promise<HTMLElement[]>[] = []
	for (const ElementsInArticleChunk of SplitElementsIntoSubArrayLength(ElementsInArticle, {Count: 2})) {
		PLimitJobs.push(PLimitInstance(() => HideLeftoverElementNano(ElementsInArticleChunk)))
	}
	TargetedElements = await Promise.all(PLimitJobs).then(PLimitResults => PLimitResults.flat())
	console.debug('[NamuLink:index]: HideLeftoverElement:', TargetedElements)
	HideElements(TargetedElements)
}

Win.addEventListener('namuwikinavigationwithadvert', HideLeftoverElement)
Win.addEventListener('namuwikifristvisit', HideLeftoverElement)
Win.addEventListener('namuwikinavigation', 	ShowElements)
