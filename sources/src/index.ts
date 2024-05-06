import PLimit from 'p-limit'
import {SplitElementsIntoSubArrayLength} from 'multithread-array'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

// eslint-disable-next-line no-negated-condition
const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

const NamuWikiUnloadedAdEvent = new Event('namuwikiunloadedadvert')
const NagivationEvent = new Event('namuwikinavigation')

const SubString = ['substring', 'substr']
for (const SubStringFunction of SubString) {
	Win.String.prototype[SubStringFunction] = new Proxy(Win.String.prototype[SubStringFunction], {
		apply(Target, ThisArg, Args) {
			if (typeof ThisArg === 'string' && /^\[+.{0,10}#.{10,50}\/\/\/.{0,20}==/.test(ThisArg)) {
				console.debug(`[NamuLink:index]: String.prototype.${SubStringFunction}:`, ThisArg)
				Win.dispatchEvent(NamuWikiUnloadedAdEvent)
				return ''
			}
			return Reflect.apply(Target, ThisArg, Args)
		}
	})
}

const Timer = ['setTimeout', 'setInterval']
for (const TimerFunction of Timer) {
	Win[TimerFunction] = new Proxy(Win[TimerFunction], {
		apply(Target, ThisArg, Args) {
			if (typeof Args[0] === 'function'
			// eslint-disable-next-line @typescript-eslint/ban-types
			&& (/return {0,}new {0,}Promise.+\.apply {0,}\(.+function.+next.+throw.+void/.test((Args[0] as Function).toString())
			// eslint-disable-next-line @typescript-eslint/ban-types
			|| /AM('|") {0,}: {0,}('|")PM.+('|")\$refs('|").+('|")style('|")/.test((Args[0] as Function).toString()))) {
				return
			}
			console.debug(`[NamuLink:index]: ${TimerFunction}:`, Args)
			return Reflect.apply(Target, ThisArg, Args)
		}
	})
}

Win.Array.prototype.join = new Proxy(Win.Array.prototype.join, {
	apply(Target, ThisArg, Args) {
		const Result = Reflect.apply(Target, ThisArg, Args)
		if ((Result as string).startsWith('noscript[data-n-head="]')) {
			Win.dispatchEvent(NagivationEvent)
		}
		return Result
	}
})

var HiddenElements: HTMLElement[] = []

const HideElements = (TargetElements: HTMLElement[]) => {
	HiddenElements.push(...TargetElements)
	TargetElements.forEach(TargetElement => {
		TargetElement.remove()
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
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('*')).some(HTMLElement => (HTMLElement as HTMLElement).innerHTML.includes('실시간 검색어'))
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
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')))
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

Win.addEventListener('namuwikiloadedadvert', HideLeftoverElement)
Win.addEventListener('namuwikiunloadedadvert', HideLeftoverElement)
Win.addEventListener('namuwikifristvisit', HideLeftoverElement)
Win.addEventListener('namuwikinavigation', 	ShowElements)
