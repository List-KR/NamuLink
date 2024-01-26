import {Superstruct} from '../esbuild.inject.js'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

// eslint-disable-next-line no-negated-condition
const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

const CheckEableAdsAdsMetadata = (AdsMetadata: unknown) => {
	for (const Key of Object.keys(AdsMetadata)) {
		if (typeof AdsMetadata[Key] === 'string' && (AdsMetadata[Key] as string).includes('adcr.naver.com')) {
			return true
		}
	}

	return false
}

const CheckGetAdUnitPathObject = Superstruct.object({
	getHtml: Superstruct.func(),
	getAdUnitPath: Superstruct.func(),
})

const IsEableAdsObject = (Args: unknown) => typeof Args[0] !== 'undefined' && typeof Args[1] !== 'undefined' && Args[1] === 'enable_ads' && CheckEableAdsAdsMetadata(Args[0])
const IsGetAdUnitPathObject = (Args: unknown) => typeof Args[0] !== 'undefined' && typeof Args[1] !== 'undefined' && Args[1] === 'getAdUnitPath' && Superstruct.validate(Args[0], CheckGetAdUnitPathObject)

Win.Object.defineProperty = new Proxy(Win.Object.defineProperty, {
	apply(Target, ThisArg, Args) {
		if (IsEableAdsObject(Args) || IsGetAdUnitPathObject(Args)) {
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
			return new Error()
		}

		return Decoded
	},
})
