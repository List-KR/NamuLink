// ==UserScript==
// @name         NamuLink
// @encoding     utf-8
// @namespace    https://github.com/List-KR/NamuLink
// @homepageURL  https://github.com/List-KR/NamuLink
// @supportURL   https://github.com/List-KR/NamuLink/issues
// @updateURL    https://github.com/List-KR/NamuLink/raw/main/NamuLink.user.js
// @downloadURL  https://github.com/List-KR/NamuLink/raw/main/NamuLink.user.js
// @license      MIT
//
// @version      1.2.3
// @author       PiQuark6046 and contributors
//
// @match        https://namu.wiki/w/*
// @exclude      https://namu.wiki/w/%EC%9C%84%ED%82%A4%EC%9A%B4%EC%98%81:*
// @exclude      https://namu.wiki/w/member/login*
// @exclude      https://namu.wiki/w/member/recover_password*
// @exclude      https://namu.wiki/w/member/signup*
//
// @description        NamuLink blocks the license-abused PowerLink advertisement on NamuWiki.
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
		Array.from(document.querySelectorAll("iframe[src]")).filter((e) => { return /\/\/arca\.live\/external\/callad\?slug=/.test(e.getAttribute("src")) })
		.forEach((e) => { HideElementsImportant(Gen.Parents(e).filter((o) => { return o.innerText == "" && getComputedStyle(o).getPropertyValue("padding-bottom").replace(/px$/, "") > 15 }))})
	}

	var PowerLinkLabelCache = []

	win.EventTarget.prototype.addEventListener = new Proxy(
		win.EventTarget.prototype.addEventListener,
		{
			apply: (target, thisArg, argsList) =>
			{
				if (argsList[0] == "click" && GetBoxRate(thisArg) > 2) // PowerLinkLabelCache Label
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

	win.TextDecoder.prototype.decode = new Proxy(
		win.TextDecoder.prototype.decode,
		{
			apply: (target, thisArg, argsList) =>
			{
				const original = Reflect.apply(target, thisArg, argsList)
				HideArcaliveAdver()
				if (/\/\/adcr\.naver\.com\//.test(original.toString()))
				{
					console.debug("NamuLink: TextDecoder.prototype.decode handler: ", original)
					HideElementsImportant(Array.from(document.querySelectorAll("*"))
					.filter((e) => { return e.innerText == "" && getComputedStyle(e).getPropertyValue("margin-top").replace(/px$/, "") > 20
					&& Array.from(document.querySelectorAll("*"))
					.filter((k) => { return getComputedStyle(k).getPropertyValue("animation-iteration-count") == "infinite" })
					.every((k) => { return e.contains(k) }) }))
					return new RangeError()
				}
				else
				{
					return original
				}
			}
		}
	)

	document.addEventListener("DOMContentLoaded", () =>
	{
		HideArcaliveAdver()
	})
})()