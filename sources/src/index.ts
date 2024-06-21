import IsValidDomain from 'is-valid-domain'
import PLimit from 'p-limit'
import {SplitElementsIntoSubArrayLength} from 'multithread-array'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

// eslint-disable-next-line no-negated-condition
const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

const RemoveElements = (TargetElements: HTMLElement[]) => {
	TargetElements.forEach(TargetElement => {
		TargetElement.remove()
	})
}

const RemovePowerLinkAdWorker = (SearchedElements: HTMLElement[]): HTMLElement[] => {
	let TargetedElements: HTMLElement[] = []
	TargetedElements = SearchedElements.filter(TargetedElement => {
		return Number(getComputedStyle(TargetedElement).getPropertyValue('margin-top').replace('px', '')) > 10
		|| (Array.from(TargetedElement.children).some(Children => {
			return Number(getComputedStyle(Children).getPropertyValue('padding-left').replace('px', '')) > 5
			&& Number(getComputedStyle(Children).getPropertyValue('padding-top').replace('px', '')) > 5
			&& Number(getComputedStyle(Children).getPropertyValue('padding-right').replace('px', '')) > 5
			&& Number(getComputedStyle(Children).getPropertyValue('padding-bottom').replace('px', '')) > 5
		}))
	})
	TargetedElements = TargetedElements.filter(SearchedElement => {
		return Array.from(SearchedElement.querySelectorAll('a,span,div')).filter(HTMLInElement => {
			return HTMLInElement instanceof HTMLElement
			// eslint-disable-next-line no-irregular-whitespace
			&& IsValidDomain((HTMLInElement.innerText.replaceAll(/​ /g, '').match(/^[^/]+(?=\/)?/g) ?? [''])[0], { allowUnicode: true, subdomain: true }) // Zero width space and space should be removed.
		}).length >= 2
		|| Array.from(SearchedElement.querySelectorAll('*')).filter(HTMLInElement => {
			return HTMLInElement instanceof HTMLElement && getComputedStyle(HTMLInElement).getPropertyValue('animation-duration') === '1.5s'
		}).length >= 4
	})
	TargetedElements = TargetedElements.filter(SearchedElement => {
		return Array.from(SearchedElement.querySelectorAll('*[href^="/RecentChanges"]')).filter(HTMLInElement => {
			return Number(getComputedStyle(HTMLInElement).getPropertyValue('width').replaceAll('px', '')) > 50
			&& Number(getComputedStyle(HTMLInElement).getPropertyValue('height').replaceAll('px', '')) > 10
		}).length === 0
	})
	TargetedElements = TargetedElements.filter(SearchedElement => {
		return Array.from(SearchedElement.querySelectorAll('*[href^="#fn-"]')).filter(HTMLInElement => {
			// eslint-disable-next-line no-irregular-whitespace
			return HTMLInElement instanceof HTMLElement && /\[[0-9]+\]/.test(HTMLInElement.innerText.replaceAll(/​ /g, '')) // Zero width space and space should be removed.
		}).length === 0
	})
	TargetedElements = TargetedElements.filter(SearchedElement => {
		return Array.from(SearchedElement.querySelectorAll('*[href]')).filter(HTMLInElement => {
			return getComputedStyle(HTMLInElement, 'before').getPropertyValue('font-family') === 'Ionicons'
		}).length === 0
	})
	return TargetedElements
}

const RemovePowerLinkAd = async () => {
	const ElementsInArticle = []
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ *[class]')))
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div:not([class*=" "]) div[class] *[class*=" "]')))
	let TargetedElements: HTMLElement[] = []
	const PLimitInstance = PLimit((navigator.hardwareConcurrency ?? 4) < 4 ? 4 : navigator.hardwareConcurrency)
	const PLimitJobs: Promise<HTMLElement[]>[] = []
	for (const ElementsInArticleChunk of SplitElementsIntoSubArrayLength(ElementsInArticle, {Count: 2})) {
		PLimitJobs.push(PLimitInstance(() => RemovePowerLinkAdWorker(ElementsInArticleChunk)))
	}
	TargetedElements = await Promise.all(PLimitJobs).then(PLimitResults => PLimitResults.flat())
	console.debug('[NamuLink:index]: RemovePowerLinkAd:', TargetedElements)
	RemoveElements(TargetedElements)
}

if (location.hostname !== 'board.namu.wiki') {
	setInterval(RemovePowerLinkAd, 1500)
}