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
// @version      1.0.2
// @author       PiQuark6046 and contributors
//
// @match        https://namu.wiki/w/*
// @exclude      https://namu.wiki/w/%EC%9C%84%ED%82%A4%EC%9A%B4%EC%98%81:*
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

    const CheckPowerLinkLabel = (thisArg, argsList) =>
    {
        return argsList[0] == "click" && 4.38 < GetBoxRate(thisArg) && GetBoxRate(thisArg) < 4.39
    }

    win.EventTarget.prototype.addEventListener = new Proxy(
        win.EventTarget.prototype.addEventListener,
        {
            apply: (target, thisArg, argsList) =>
            {
                if (CheckPowerLinkLabel(thisArg, argsList))
                {
                    setInterval((e) => {
                        e.style.display = "none"
                    }, 10, Gen.Parents(thisArg).filter((e) => GetBoxRate(e) > 1 && e.offsetHeight < 250)[0])
                    Reflect.apply(target, thisArg, argsList)
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