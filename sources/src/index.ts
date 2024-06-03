import PLimit from 'p-limit'
import {SplitElementsIntoSubArrayLength} from 'multithread-array'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

// eslint-disable-next-line no-negated-condition
const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

const NamuWikiUnloadedAdEvent = new Event('namuwikiunloadedadvert')
const NamuWikiLoadedAdEvent = new Event('namuwikiloadedadvert')

Win.String.prototype.indexOf = new Proxy(Win.String.prototype.indexOf, {
	apply(Target, ThisArg, Args) {
		const Result = Reflect.apply(Target, ThisArg, Args)
		if (typeof Args[0] === 'string' && Args[0] === 'key') {
			Win.dispatchEvent(NamuWikiUnloadedAdEvent)
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

const GetAllParentElements = (TargetElement: HTMLElement) => {
	const ParentElements: HTMLElement[] = []
	let ParentElement = TargetElement.parentElement
	while (ParentElement !== null) {
		ParentElements.push(ParentElement)
		ParentElement = ParentElement.parentElement
	}
	return ParentElements
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
		return !Array.from(HTMLElementInArticle.parentElement.querySelectorAll('span')).some(HTMLElement => HTMLElement.innerHTML.includes('실시간 검색어')) // NamuNews
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('*')).some(HTMLElement => (HTMLElement as HTMLElement).innerHTML.includes('실시간 검색어'))
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('div[class*=" "] > *')).some(HTMLElement => (HTMLElement as HTMLElement).innerText.includes('분류'))
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !GetAllParentElements(HTMLElementInArticle).some(HTMLElement => HTMLElement.offsetWidth === document.body.offsetWidth && HTMLElement.offsetHeight < 200)
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('img[src*="image/svg"] ~ img[src] ~ noscript')).some(HTMLElement => HTMLElement.textContent.startsWith('<img'))
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
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div[class] div[class*=" "] ~ div div[class] > div[class] div[class] ~ div[class]')))
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

let AdvertTarget: HTMLElement = null
Win.EventTarget.prototype.addEventListener = new Proxy(Win.EventTarget.prototype.addEventListener, {
	apply(Target, ThisArg, Args) {
		if (typeof Args[1] === 'function' && Args[0] === 'click' && ThisArg instanceof HTMLElement
			// eslint-disable-next-line @typescript-eslint/ban-types
			&& ((Args[1] as Function).toString().includes('currentTarget')
			// eslint-disable-next-line @typescript-eslint/ban-types
			|| (/('|")X('|")\) {0,}&&/.test((Args[1] as Function).toString())
			// eslint-disable-next-line @typescript-eslint/ban-types
			&& /('|")Y('|")\) {0,}&&/.test((Args[1] as Function).toString())))
			&& ThisArg.innerText.replaceAll(/[^a-zA-Z0-9\uAC00-\uD7A3./]+/gu, '').length <= 100
			&& /^.+\..+$/.test(ThisArg.innerText.replaceAll(/[^a-zA-Z0-9\uAC00-\uD7A3./]+/gu, ''))
			&& !/편집 권한이 부족합니다.+ACL 탭/.test(ThisArg.innerText)) {
			AdvertTarget = ThisArg
			Win.dispatchEvent(NamuWikiLoadedAdEvent)
		}
		return Reflect.apply(Target, ThisArg, Args)
	}
})

const HideAdElementNano = (ElementsInArticle: Element[]) => {
	var FilteredElements = ElementsInArticle.filter(ElementInArticle => ElementInArticle instanceof HTMLElement) as HTMLElement[]
	const TargetedElements: HTMLElement[] = []
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
		return !Array.from(HTMLElementInArticle.parentElement.querySelectorAll('span')).some(HTMLElement => HTMLElement.innerHTML.includes('실시간 검색어')) // NamuNews
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('*')).some(HTMLElement => (HTMLElement as HTMLElement).innerHTML.includes('실시간 검색어'))
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('div[class*=" "] > *')).some(HTMLElement => (HTMLElement as HTMLElement).innerText.includes('분류'))
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !GetAllParentElements(HTMLElementInArticle).some(HTMLElement => HTMLElement.offsetWidth === document.body.offsetWidth && HTMLElement.offsetHeight < 200)
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('div[class*=" "] a:has(svg path)')).some(HTMLElement => Number(getComputedStyle(HTMLElement).getPropertyValue('margin-top').replace(/px$/, '')) > 10) // NamuNews Mobile
	})
	FilteredElements = FilteredElements.filter(HTMLElementInArticle => {
		return !Array.from(HTMLElementInArticle.querySelectorAll('img[src*="image/svg"] ~ img[src] ~ noscript')).some(HTMLElement => HTMLElement.textContent.startsWith('<img'))
	})
	TargetedElements.push(...FilteredElements.filter(HTMLElementInArticle => {
		return HTMLElementInArticle.contains(AdvertTarget)
	}))
	return TargetedElements
}

const HideAdElement = async () => {
	const ElementsInArticle = []
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div[class] div[class*=" "] ~ div div[class] > div[class] div[class] ~ div[class]')))
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')))
	let TargetedElements: HTMLElement[] = []
	const PLimitInstance = PLimit((navigator.hardwareConcurrency ?? 4) < 4 ? 4 : navigator.hardwareConcurrency)
	const PLimitJobs: Promise<HTMLElement[]>[] = []
	for (const ElementsInArticleChunk of SplitElementsIntoSubArrayLength(ElementsInArticle, {Count: 2})) {
		PLimitJobs.push(PLimitInstance(() => HideAdElementNano(ElementsInArticleChunk)))
	}
	TargetedElements = await Promise.all(PLimitJobs).then(PLimitResults => PLimitResults.flat())
	console.debug('[NamuLink:index]: HideLeftoverElement:', TargetedElements)
	HideElements(TargetedElements)
}

Win.addEventListener('namuwikiloadedadvert', HideAdElement)
Win.addEventListener('namuwikiunloadedadvert', HideLeftoverElement)
Win.addEventListener('namuwikifristvisit', HideLeftoverElement)
Win.addEventListener('namuwikinavigation', 	ShowElements)
