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
// @version      1.4.2
// @author       PiQuark6046 and contributors
//
// @match        https://namu.wiki/*
//
// @description        NamuLink blocks the license-abused PowerLink advertisement on NamuWiki.
// @description:ko     NamuLink는 나무위키에 있는 라이선스를 위반한 파워링크 광고를 차단합니다.
//
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(() => {
	'use strict'

	const win = typeof unsafeWindow != "undefined" ? unsafeWindow : window

	const Gen =
	{
		Parents: (element) =>
		{
			var data = [element]
			while (data[0].parentElement != null)
			{
				data = [data[0].parentElement].concat(data)
			}
			return data.filter((FilterElement) => { return FilterElement != element })
		},
		Children: (element) =>
		{
			return Array.from(element.querySelectorAll("*"))
		},
		Peers: (element) =>
		{
			return Array.from(element.parentElement.children).filter((FElement) => { return FElement != element })
		}
	}

	const GetBoxRate = (e) =>
	{
		return e.offsetWidth / e.offsetHeight
	}

	const HideElementsImportant = (e) =>
	{
		if (e == undefined || e.every((k) => { return k == undefined })) return undefined
		let target = e.filter((k) => k != undefined)
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
		.forEach((e) => { HideElementsImportant(Gen.Parents(e).filter((o) => { return o.innerText == "" && getComputedStyle(o).getPropertyValue("padding-bottom").replace(/px$/, "") > 15 }))})
	}

	const HideJSONPowerLink = () =>
	{
		HideElementsImportant(Array.from(document.querySelectorAll("iframe[src*='//arca.live/static/ad/powerlink.html?size=']")).filter((e) => { return e.offsetHeight > 100 && e.offsetWidth > 100 }))
	}

	var PowerLinkLabelCache = []

	win.EventTarget.prototype.addEventListener = new Proxy(
		win.EventTarget.prototype.addEventListener,
		{
			apply: (target, thisArg, argsList) =>
			{
				if (/^https:\/\/namu\.wiki\/w\//.test(location.href) && argsList[0] == "click" && GetBoxRate(thisArg) > 2) // PowerLinkLabelCache Label
				{
					PowerLinkLabelCache.push(thisArg)
				}
				else if (argsList[0] == "click" && /^.{1,}$/.test(thisArg.innerText)) // PowerLinkLabelCache Content
				{
					for (var o of PowerLinkLabelCache)
					{
						if (HideElementsImportant(Gen.Parents(o).filter((e) => { return GetBoxRate(e) > 1 && getComputedStyle(e).getPropertyValue("margin-top").replace(/px$/, "") > 20 })
						.filter((e) => { return e.innerText == "" && Gen.Children(e).includes(o) }))
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

	const _StringFromCharCode = win.String.fromCharCode
	win.String.fromCharCode = new Proxy(
		win.String.fromCharCode,
		{
			apply: (target, thisArg, argsList) =>
			{
				var Original = ""
				for (var e of argsList)
				{
					Original += _StringFromCharCode(e)
					if (/^\[+.+("|')https:\/\/adcr\.naver\.com\/adcr\?.+/.test(Original.toString()))
					{
						HideArcaliveAdver()
						console.debug("NamuLink: String.fromCharCode handler: ", Original)
						HideElementsImportant(Array.from(document.querySelectorAll("*"))
						.filter((e) => { return /^(|[​\n\t ]{1,})$/.test(e.innerText) && getComputedStyle(e).getPropertyValue("margin-top").replace(/px$/, "") > 20 // zero-width space (U+200B) included
						&& Array.from(document.querySelectorAll("*"))
						.filter((k) => { return getComputedStyle(k).getPropertyValue("animation-iteration-count") == "infinite" })
						.every((k) => { return e.contains(k) }) }))
						return new SyntaxError()
					}
				}
				return Original
			}
		}
	)

	document.addEventListener("DOMContentLoaded", () =>
	{
		HideArcaliveAdver()
		HideJSONPowerLink()
	})
})()