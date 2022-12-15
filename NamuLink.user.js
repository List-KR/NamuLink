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
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(() => {
    "use strict";

    unsafeWindow ??= window;

    /// APIs

    const getElementParents = (element) => {
           const data = [];
            let current = element;

            while ((current = current.parentElement) !== null) {
                data.push(current);
            }

            return data;
    }

    const getElementChildren = (element) => {
          return Array.from(element.querySelectorAll("*"));
    };

    const getBoxRate = (e) => {
        return e.offsetWidth / e.offsetHeight;
    }

    const hideElements = (e) => {
        if (e.length === 0) return 0;

        for (const element of e) {
            element.style.setProperty("display", "none", "important");
        }

        console.debug("NamuLink: hideElements: ", e);
        return e.length;
    }

    const hideAdver = () => {
        for (const element of document.querySelectorAll(`iframe[src*="//arca.live/external/callad"]`)) {
            hideElements(
                getElementParents(element).filter((o) => {
                    return o.innerText === "" && getComputedStyle(o).getPropertyValue("padding-bottom").replace(/px$/, "") > 15
                })
            )
        }
    }

    const hideJSONPowerLink = () => {
        hideElements(
            Array.from(document.querySelectorAll("iframe[src*='//arca.live/static/ad/powerlink.html?size=']")).filter((e) => {
                return e.offsetHeight > 100 && e.offsetWidth > 100;
            })
        );
    }

    const getPendingPowerLink = () => {
        return Array.from(document.querySelectorAll("*"))
            .filter((e) => {
                return /^(|[​\n\t ]{1,})$/.test(e.innerText) && // zero-width space (U+200B) included
                    getComputedStyle(e).getPropertyValue("margin-top").replace(/px$/, "") > 20 &&
                    Array.from(e.children).filter((e) => {
                        return Array.from(e.querySelectorAll("*")).filter((e2) => {
                            return getComputedStyle(e2).getPropertyValue("animation-iteration-count") === "infinite";
                        });
                    }).length > 0
            });
    };

    /// Main
    // Convert to string: String.fromCharCode TextDecoder.prototype.decode String.prototype.normalize String.fromCodePoint
    //

    let powerLinkLabelCache = [];
    const bitArrayObjs8 = [
        unsafeWindow.Uint8ClampedArray,
        unsafeWindow.Int8Array,
        unsafeWindow.Uint8Array
    ];

    unsafeWindow.EventTarget.prototype.addEventListener = new Proxy(
        unsafeWindow.EventTarget.prototype.addEventListener,
        {
            apply: (target, thisArg, argsList) => {
                if (/^\/w\//.test(location.pathname) && argsList[0] === "click" && getBoxRate(thisArg) > 2) {
                    // powerLinkLabelCache Label
                    powerLinkLabelCache.push(thisArg);
                } else if (argsList[0] === "click" && /^.{1,}$/.test(thisArg.innerText)) {
                    // powerLinkLabelCache Content
                    for (const o of powerLinkLabelCache) {
                        if (
                            hideElements(
                                getElementParents(o).filter((e) => {
                                    return getBoxRate(e) > 1 &&
                                        getComputedStyle(e).getPropertyValue("margin-top").replace(/px$/, "") > 20 &&
                                        e.innerText === "" &&
                                        getElementChildren(e).includes(o);
                                })
                            )
                            > 0
                        ) {
                            console.debug("NamuLink: EventTarget.prototype.addEventListener handler: ", powerLinkLabelCache);
                            powerLinkLabelCache = [];
                            break;
                        }
                    }
                }

                Reflect.apply(target, thisArg, argsList);
            }
        }
    )

    const isPowerLink = (input) => {
        const decoded = new TextDecoder().decode(input);
        return decoded.includes("adcr.naver.com/adcr");
    }

    for (let Obj of bitArrayObjs8) {
        const proxyHandler = (target, thisArg, argsList) => {
            const Original = Reflect.apply(target, thisArg, argsList);

            if (isPowerLink(Original) || isPowerLink(Obj.of(Original).reverse())) {
                console.debug(`NamuLink: ${Obj.name} proxyHandler: `, Original);
                hideElements(getPendingPowerLink());

                return crypto.getRandomValues(new Obj(Original.byteLength));
            }

            return Original;
        };

        Obj.prototype.slice = new Proxy(
            Obj.prototype.slice,
            {
                apply: proxyHandler
            }
        )

        Obj.from = new Proxy(
            Obj.from,
            {
                apply: proxyHandler
            }
        )
    }

    document.addEventListener("DOMContentLoaded", () => {
        hideAdver();
        hideJSONPowerLink();
    })
})();