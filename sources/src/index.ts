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
		return Number(getComputedStyle(TargetedElement).getPropertyValue('margin-top').replace('px', '')) > 20
		|| (Number(getComputedStyle(TargetedElement).getPropertyValue('').replace('padding-left', '')) > 5
		&& Number(getComputedStyle(TargetedElement).getPropertyValue('').replace('padding-top', '')) > 5
		&& Number(getComputedStyle(TargetedElement).getPropertyValue('').replace('padding-right', '')) > 5
		&& Number(getComputedStyle(TargetedElement).getPropertyValue('').replace('padding-bottom', '')) > 5)
	})
	TargetedElements = TargetedElements.filter(SearchedElement => {
		return Array.from(SearchedElement.querySelectorAll('a,span')).filter(HTMLInElement => {
			return HTMLInElement instanceof HTMLElement
			// eslint-disable-next-line no-irregular-whitespace
			&& IsValidDomain((HTMLInElement.innerText.replaceAll(/​ /g, '').match(/^[^/]+(?=\/)?/g) ?? [''])[0], { allowUnicode: true, subdomain: true }) // Zero width space and space should be removed.
		}).length >= 2
		|| Array.from(SearchedElement.querySelectorAll('*')).filter(HTMLInElement => {
			return HTMLInElement instanceof HTMLElement && getComputedStyle(HTMLInElement).getPropertyValue('animation-duration') === '1.5s'
		}).length >= 4
	})
	return TargetedElements
}

const RemovePowerLinkAd = async () => {
	const ElementsInArticle = []
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ div[class]')))
	ElementsInArticle.push(...Array.from(Win.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')))
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

setInterval(RemovePowerLinkAd, 1500)