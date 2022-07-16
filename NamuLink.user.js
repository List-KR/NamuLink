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
// @version      1.0d1
// @author       PiQuark6046 and contributors
//
// @match        https://namu.wiki/w/*
// @exclude      https://namu.wiki/w/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4:%EB%8C%80%EB%AC%B8*
// @exclude      https://namu.wiki/w/%EC%9C%84%ED%82%A4%EC%9A%B4%EC%98%81:*
//
// @description        NamuLink blocks the license-abused PowerLink advertisement on NamuWiki.
//
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict'

    const unsafeWindow = window || unsafeWindow

    const Generation =
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
            var data = [element]
            while (Array.from(data).every((element) => { element.children.length == 0 }))
            {
                
            }
            return data.filter((FilterElement) => { return FilterElement != element })
        },
        Peers: (element) =>
        {
            return Array.from(element.parentElement.children).filter((FElement) => { return FElement != element })
        }
    }

    const CSSMatch = 
    {
        Visible: (array) =>
        {
            return Array.from(array).filter((element) => 
            {
                return element.offsetHeight >= 10 && element.offsetWidth >= 10
            })
        }
    }
    const Format =
    {
        Domain: (text) =>
        {
            return new unsafeWindow.RegExp(/[\u3131-\uD79DA-z0-9]{1,}[^\u3131-\uD79DA-z0-9]{0,}(com|net|org|kr|한국|[\u3131-\uD79DA-z0-9]{2}[^\u3131-\uD79DA-z0-9]{0,}kr|[\u3131-\uD79DA-z0-9]{2}[^\u3131-\uD79DA-z0-9]{0,}한국|me|at|io|club|online|market|store|site|one|space|blog|tech|llc|homes|press|software|co|cloud|live|[A-z]{2,8})/gui).test(text)
        },
        HEXColor: (text) =>
        {         
            return new unsafeWindow.RegExp(/rgb\([0-9]{1,3},[ ]{0,}[0-9]{1,3},[ ]{0,}[0-9]{1,3}\)/).test(text)
        }
    }
    
    unsafeWindow.console.log("NamuLink: Initialized.")

    var VisibleElementArray = CSSMatch.Visible(document.querySelectorAll("*"))
    new MutationObserver()

})()