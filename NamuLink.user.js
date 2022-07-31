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
// @version      1.1
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

    const win = unsafeWindow != undefined ? unsafeWindow : window

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

    var PowerLinkLabel;

    win.EventTarget.prototype.addEventListener = new Proxy(
        win.EventTarget.prototype.addEventListener,
        {
            apply: (target, thisArg, argsList) =>
            {
                if (argsList[0] == "click" && 4.38 < GetBoxRate(thisArg) && GetBoxRate(thisArg) < 4.5) // PowerLinkLabel Label
                {
                    PowerLinkLabel = thisArg
                }
                else if (PowerLinkLabel != undefined && argsList[0] == "click" && /^.{1,}$/.test(thisArg.innerText)) // PowerLinkLabel Content
                {
                    setInterval((e) =>
                    {
                        if (e != undefined) e.style.display = "none"
                    }, 100, Gen.Parents(PowerLinkLabel).filter((e) => { return GetBoxRate(e) > 1 && getComputedStyle(e).getPropertyValue("margin-top").replace(/px$/, "") > 20 })
                    .reverse().find((e) => { return e.innerText != "" && Gen.Children(e).includes(PowerLinkLabel) }))
                }
                else
                {
                    Reflect.apply(target, thisArg, argsList)
                }
            }
        }
    )

    win.TextDecoder.prototype.decode = new Proxy(
        win.TextDecoder.prototype.decode,
        {
            apply: (target, thisArg, argsList) =>
            {
                const original = Reflect.apply(target, thisArg, argsList)
                if (/\/\/adcr\.naver\.com\//.test(original.toString()))
                {
                    setInterval((e) =>
                    {
                        if (e != undefined) e.forEach((k) => { k.style.display = "none" })
                    }, 100, Array.from(document.querySelectorAll("*")).filter((e) => { return Gen.Parents(Array.from(document.querySelectorAll("*"))
                    .filter((e) => { return getComputedStyle(e).getPropertyValue("animation-iteration-count") == "infinite" }))
                    .every((k) => { return e.contains(k) })}).filter((e) => { return e.innerText == "" }))
                    return new RangeError()
                }
                else
                {
                    return original
                }
            }
        }
    )
})()