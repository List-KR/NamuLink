// ==UserScript==
// @name         NamuLink
// @encoding     utf-8
// @namespace    https://github.com/List-KR/NamuLink
// @homepageURL  https://github.com/List-KR/NamuLink
// @supportURL   https://github.com/List-KR/NamuLink/issues
// @updateURL    https://cdn.jsdelivr.net/gh/List-KR/NamuLink@main/NamuLink.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/List-KR/NamuLink@main/NamuLink.user.js
// @license      MIT
//
// @version      2.0.0
// @author       PiQuark6046 and contributors
//
// @match        https://namu.wiki/*
//
// @description        NamuLink blocks the license-abused PowerLink advertisement on NamuWiki.
// @description:ko     NamuLink는 나무위키에 있는 라이선스를 위반한 파워링크 광고를 차단합니다.
//
// @run-at       document-start
// ==/UserScript==

(() => {
	'use strict'

	/// APIs

	const Gen =
	{
		Parents: (element) =>
		{
			let data = [element]
			while (data[0].parentElement !== null)
			{
				data = [data[0].parentElement].concat(data)
			}
			return data.filter((FilterElement) => { return FilterElement !== element })
		},
		Children: (element) =>
		{
			return Array.from(element.querySelectorAll("*"))
		},
		Peers: (element) =>
		{
			return Array.from(element.parentElement.children).filter((FElement) => { return FElement !== element })
		}
	}

	const GetBoxRate = (e) =>
	{
		return e.offsetWidth / e.offsetHeight
	}

	const HideElementsImportant = (e) =>
	{
		let target = e.filter((k) => k !== undefined)
		if (target.length === 0) return 0
		setInterval((k) =>
		{
			Array.from(k).forEach((o) => { o.style.setProperty("display", "none", "important") })
		}, 50, target)
		console.debug("NamuLink: HideElementsImportant: ", target)
		return target.length
	}

	const HideArcaliveAdver = () =>
	{
		Array.from(document.querySelectorAll("iframe[src]")).filter((e) => { return /\/\/arca\.live\/external\/callad/.test(e.getAttribute("src")) })
		.forEach((e) => { HideElementsImportant(Gen.Parents(e).filter((o) => { return o.innerText === "" && getComputedStyle(o).getPropertyValue("padding-bottom").replace(/px$/, "") > 15 }))})
	}

	const HideJSONPowerLink = () =>
	{
		HideElementsImportant(Array.from(document.querySelectorAll("iframe[src*='//arca.live/static/ad/powerlink.html?size=']")).filter((e) => { return e.offsetHeight > 100 && e.offsetWidth > 100 }))
	}

	const GetPendingPowerLink = () =>
	{
		return Array.from(document.querySelectorAll("*"))
			.filter((e) => { return /^(|[​\n\t ]{1,})$/.test(e.innerText) && getComputedStyle(e).getPropertyValue("margin-top").replace(/px$/, "") > 20 // zero-width space (U+200B) included
			&& Array.from(document.querySelectorAll("*"))
			.filter((k) => { return getComputedStyle(k).getPropertyValue("animation-iteration-count") === "infinite" })
			.every((k) => { return e.contains(k) }) })
	}

	/// Main
	// Convert to string: String.fromCharCode TextDecoder.prototype.decode String.prototype.normalize String.fromCodePoint
	// 

	let PowerLinkLabelCache = []
	const BitArrayObjs8 = [Uint8ClampedArray, Int8Array, Uint8Array]

	EventTarget.prototype.addEventListener = new Proxy(
		EventTarget.prototype.addEventListener,
		{
			apply: (target, thisArg, argsList) =>
			{
				if (/^https:\/\/namu\.wiki\/w\//.test(location.href) && argsList[0] === "click" && GetBoxRate(thisArg) > 2) // PowerLinkLabelCache Label
				{
					PowerLinkLabelCache.push(thisArg)
				}
				else if (argsList[0] === "click" && /^.{1,}$/.test(thisArg.innerText)) // PowerLinkLabelCache Content
				{
					for (let o of PowerLinkLabelCache)
					{
						if (HideElementsImportant(Gen.Parents(o).filter((e) => { return GetBoxRate(e) > 1 && getComputedStyle(e).getPropertyValue("margin-top").replace(/px$/, "") > 20 })
						.filter((e) => { return e.innerText === "" && Gen.Children(e).includes(o) }))
						> 0)
						{
							console.debug("NamuLink: EventTarget.prototype.addEventListener handler: ", PowerLinkLabelCache)
							PowerLinkLabelCache = []
							break
						}
					}
				}
				Reflect.apply(target, thisArg, argsList)
			}
		}
	)

	for (let Obj of BitArrayObjs8)
	{
		Obj.prototype.slice = new Proxy(
			Obj.prototype.slice,
			{
				apply: (target, thisArg, argsList) =>
				{
					const Original = Reflect.apply(target, thisArg, argsList)
					if (new TextDecoder().decode(Original) instanceof ReferenceError
					|| new TextDecoder().decode(Obj.of(Original).reverse()) instanceof ReferenceError)
					{
						console.debug("NamuLink: " + Obj.name + ".prototype.slice handler: ", Original)
						HideElementsImportant(GetPendingPowerLink())
						return crypto.getRandomValues(new Obj(Original.byteLength))
					}
					else
					{
						return Original
					}
				}
			}
		)
	}

	for (let Obj of BitArrayObjs8)
	{
		Obj.from = new Proxy(
			Obj.from,
			{
				apply: (target, thisArg, argsList) =>
				{
					const Original = Reflect.apply(target, thisArg, argsList)
					if (new TextDecoder().decode(Original) instanceof ReferenceError
					|| new TextDecoder().decode(Obj.of(Original).reverse()) instanceof ReferenceError)
					{
						console.debug("NamuLink: " + Obj.name + ".from handler: ", Original)
						HideElementsImportant(GetPendingPowerLink())
						return crypto.getRandomValues(new Obj(Original.byteLength))
					}
					else
					{
						return Original
					}
				}
			}
		)
	}

	TextDecoder.prototype.decode = new Proxy(
		TextDecoder.prototype.decode,
		{
			apply: (target, thisArg, argsList) =>
			{
				const Original = Reflect.apply(target, thisArg, argsList)
				if (/\[+.+\/\/adcr\.naver\.com\/adcr\?.+,.+/.test(Original.toString()))
				{
					return new ReferenceError()
				}
				else
				{
					return Original
				}
			}
		}
	)

	document.addEventListener("DOMContentLoaded", () =>
	{
		HideArcaliveAdver()
		HideJSONPowerLink()
	})
})()
