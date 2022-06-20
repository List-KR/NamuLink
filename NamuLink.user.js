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
    'use strict';

    const unsafeWindow = unsafeWindow == undefined ? window : unsafeWindow

    const Generation =
    {
        /**
         * Get elements that are parents of a specific element.
         * @param {Element} element 
         * @returns {Element[]} Array of elements ( e.g. [html, body, div])
         */
        Parents: (element) =>
        {
            var data = [element];
            while (data[0].parentElement != null)
            {
                data = [data[0].parentElement].concat(data);
            };
            return data.filter((FilterElement) => { return FilterElement != element });
        },
        /**
         * Get elements that are children of a specific element.
         * @param {Element} element 
         * @returns {Element[]} Array of elements
         */
        Children: (element) =>
        {
            //TODO: update
            var data = [element];
            while (Array.from(data).every((element) => { element.children.length == 0 }))
            {

            }
            return data.filter((FilterElement) => { return FilterElement != element });
        },
        /**
         * Get elements that are peers of a specific element.
         * @param {Element} element
         * @returns {Element[]} Array of elements
         */
        Peers: (element) =>
        {
            return Array.from(element.parentElement.children).filter((FElement) => { return FElement != element });
        }
    };

    const CSSMatch = 
    {
        /**
         * Get elements that has a specific CSS value by checking ONLY item of an array.
         * @param {Element[]} array Array of Elements
         * @param {string} value A CSS value
         * @returns {Element[]}
         */
        Display: (array, value) =>
        {
            return Array.from(array).filter((element) =>
            {
                return getComputedStyle(element).getPropertyPriority("display") == value || getComputedStyle(element).getPropertyValue("display") == value
            });
        },
        /**
         * Get elements that has a 'display: block' CSS value by checking item of an array and its parents.
         * @param {Element[]} array Array of Elements
         * @returns {Element[]} 
         */
        DisplayBlockParent: (array) =>
        {
            Array.from(array).forEach(() =>
            {
                array = Array.from(array).filter((element) => { return getComputedStyle(element).getPropertyPriority("display") == "block"
                || getComputedStyle(element).getPropertyValue("display") == "block"
                || Array.from(Generation.Parents(element)).every((GElement) => {
                    getComputedStyle(GElement).getPropertyPriority("display") == "block"
                    || getComputedStyle(GElement).getPropertyValue("display") == "block"
                    || getComputedStyle(GElement).getPropertyPriority("display") == ""
                    || getComputedStyle(GElement).getPropertyValue("display") == ""
                })});
            });
            return array;
        },
        /**
         * Get elements that are visible.
         * @param {Element[]} array Array of Elements
         * @returns {Element[]} 
         */
        Visible: (array) =>
        {
            return Array.from(array).filter((element) => 
            {
                return element.offsetHeight != 0 && element.offsetWidth != 0;
            });
        },
        /**
         * @param {Element[]} array Array of Elements
         * @param {String} value A CSS value
         * @returns {Element[]} 
         */
        Animation:
        {
            Delay: (array, value) =>
            {
                return Array.from(array).filter((element) =>
                {
                    return getComputedStyle(element).getPropertyPriority("animation-delay") == value || getComputedStyle(element).getPropertyValue("animation-delay") == value
                });
            },
            Direction: (array, value) =>
            {
                return Array.from(array).filter((element) =>
                {
                    return getComputedStyle(element).getPropertyPriority("animation-direction") == value || getComputedStyle(element).getPropertyValue("animation-direction") == value
                });
            },
            Duration: (array, value) =>
            {
                return Array.from(array).filter((element) =>
                {
                    return getComputedStyle(element).getPropertyPriority("animation-duration") == value || getComputedStyle(element).getPropertyValue("animation-duration") == value
                });
            },
            FillMode: (array, value) =>
            {
                return Array.from(array).filter((element) =>
                {
                    return getComputedStyle(element).getPropertyPriority("animation-fill-mode") == value || getComputedStyle(element).getPropertyValue("animation-fill-mode") == value
                });
            },
            IterationCount: (array, value) =>
            {
                return Array.from(array).filter((element) =>
                {
                    return getComputedStyle(element).getPropertyPriority("animation-iteration-count") == value || getComputedStyle(element).getPropertyValue("animation-iteration-count") == value
                });
            },
            PlayState: (array, value) =>
            {
                return Array.from(array).filter((element) =>
                {
                    return getComputedStyle(element).getPropertyPriority("animation-play-state") == value || getComputedStyle(element).getPropertyValue("animation-play-state") == value
                });
            }
        }
    };
    const Filter =
    {
        BackgroundImageFilled: (array) =>
        {
            return Array.from(array).filter((element) =>
            {
                return getComputedStyle(element).getPropertyPriority("background-image") != "none" || getComputedStyle(element).getPropertyValue("background-image") != "none"
            });
        }        
    };
    const Format =
    {
        Domain: (text) =>
        {
            return new unsafeWindow.RegExp(/[\u3131-\uD79DA-z0-9]{1,}[^\u3131-\uD79DA-z0-9]{0,}(com|net|org|kr|한국|[\u3131-\uD79DA-z0-9]{2}[^\u3131-\uD79DA-z0-9]{0,}kr|[\u3131-\uD79DA-z0-9]{2}[^\u3131-\uD79DA-z0-9]{0,}한국|me|at|io|club|online|market|store|site|one|space|blog|tech|llc|homes|press|software|co|cloud|live|[A-z]{2,8})/gui).test(text);
        },
        HEXColor: (text) =>
        {
            return new unsafeWindow.RegExp(/rgb\([0-9]{1,3},[ ]{0,}[0-9]{1,3},[ ]{0,}[0-9]{1,3}\)/).test(text);
        }
    };
    
    unsafeWindow.console.log("NamuLink: Initialized.");

    var VisibleElementArray = CSSMatch.Visible(document.querySelectorAll("*"));
    var VisibleinitAnimation = CSSMatch.Animation.PlayState(VisibleElementArray, "running");
    var PowerLinkObserver = new MutationObserver();

})();