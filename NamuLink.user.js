// ==UserScript==
// @name         NamuLink
// @encoding     utf-8
// @namespace    https://github.com/List-KR/NamuLink
// @homepageURL  https://github.com/List-KR/NamuLink
// @supportURL   https://github.com/List-KR/NamuLink/issues
// @updateURL    https://cdn.jsdelivr.net/gh/List-KR/NamuLink@latest/NamuLink.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/List-KR/NamuLink@latest/NamuLink.user.js
// @license      MIT
//
// @version      3.16.0
// @author       PiQuark6046 and contributors
//
// @match        https://namu.wiki/*
//
// @description        NamuLink blocks the license-abused PowerLink advertisement on NamuWiki.
// @description:ko     NamuLink는 나무위키에 있는 라이선스를 위반한 파워링크 광고를 차단합니다.
//
// @grant        unsafeWindow
// @run-at       document-start
// @inject-into  page
// ==/UserScript==
// Used libraries:
(()=>{var E=class{value;next;constructor(e){this.value=e}},d=class{#e;#t;#n;constructor(){this.clear()}enqueue(e){let r=new E(e);this.#e?(this.#t.next=r,this.#t=r):(this.#e=r,this.#t=r),this.#n++}dequeue(){let e=this.#e;if(e)return this.#e=this.#e.next,this.#n--,e.value}clear(){this.#e=void 0,this.#t=void 0,this.#n=0}get size(){return this.#n}*[Symbol.iterator](){let e=this.#e;for(;e;)yield e.value,e=e.next}};var y={bind(n,e,r){return n.bind(r)}};function f(n){if(!((Number.isInteger(n)||n===Number.POSITIVE_INFINITY)&&n>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");let e=new d,r=0,t=()=>{r--,e.size>0&&e.dequeue()()},l=async(u,o,c)=>{r++;let p=(async()=>u(...c))();o(p);try{await p}catch{}t()},a=(u,o,c)=>{e.enqueue(y.bind(l.bind(void 0,u,o,c))),(async()=>(await Promise.resolve(),r<n&&e.size>0&&e.dequeue()()))()},i=(u,...o)=>new Promise(c=>{a(u,c,o)});return Object.defineProperties(i,{activeCount:{get:()=>r},pendingCount:{get:()=>e.size},clearQueue:{value(){e.clear()}}}),i}function C(n){if(!Number.isInteger(n.Count))throw new Error("MultithreadArrayOptions.Count should be an integer");if(n.Count<=0)throw new Error("MultithreadArrayOptions.Count should be greater than 0")}function h(n,e){C(e);let r=new Array(Math.ceil(n.length/e.Count));for(var t=0;t<r.length;t++)r[t]=n.slice(t===0?t:t*e.Count,(t+1)*e.Count>n.length?n.length:(t+1)*e.Count);return r}var s=typeof unsafeWindow<"u"?unsafeWindow:window,H=new Event("namuwikiunloadedadvert"),T=new Event("namuwikiloadedadvert");s.String.prototype.indexOf=new Proxy(s.String.prototype.indexOf,{apply(n,e,r){let t=Reflect.apply(n,e,r);return typeof r[0]=="string"&&r[0]==="key"&&s.dispatchEvent(H),t}});var m=[],v=n=>{m.push(...n),n.forEach(e=>{e.remove()})},M=()=>{console.debug("[NamuLink:index]: ShowElements:",m),m=m.filter(n=>n.parentElement!==null),m.forEach(n=>{n.style.removeProperty("display")}),m=[]},w=n=>{var e=n.filter(t=>t instanceof HTMLElement);let r=[];return e=e.filter(t=>t.innerText.length<25),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement).some(i=>Number(getComputedStyle(i).getPropertyValue("margin-bottom").replace(/px$/,""))>=4)),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(a=>a instanceof HTMLIFrameElement).length===0),e=e.filter(t=>t.querySelectorAll('span[id^="fn-"] + a[href^="#rfn-"]').length===0),e=e.filter(t=>!Array.from(t.parentElement.querySelectorAll("span")).some(l=>l.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),e=e.filter(t=>!Array.from(t.querySelectorAll("*")).some(l=>l.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),r.push(...e.filter(t=>Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement).filter(i=>getComputedStyle(i).getPropertyValue("animation-iteration-count")==="infinite").length>=6)),e=e.filter(t=>{let a=Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement);return a.some(i=>Number(getComputedStyle(i).getPropertyValue("margin-bottom").replace(/px$/,""))>=10)&&a.every(i=>Number(getComputedStyle(i).getPropertyValue("margin-left").replace(/px$/,""))<=10)}),r.push(...e.filter(t=>{let a=Array.from(t.querySelectorAll("*")).filter(o=>o instanceof HTMLElement),u=Array.from(t.parentElement?.querySelectorAll("*")??[]).filter(o=>o instanceof HTMLElement);return a.every(o=>!o.innerText.includes("alt='external/"))&&u.filter(o=>o.nextElementSibling===t&&!(o instanceof HTMLHeadingElement)).length>0})),r},L=async()=>{let n=[];n.push(...Array.from(s.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ div[class]'))),n.push(...Array.from(s.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')));let e=[],r=f((navigator.hardwareConcurrency??4)<4?4:navigator.hardwareConcurrency),t=[];for(let l of h(n,{Count:2}))t.push(r(()=>w(l)));e=await Promise.all(t).then(l=>l.flat()),console.debug("[NamuLink:index]: HideLeftoverElement:",e),v(e)},g=null;s.EventTarget.prototype.addEventListener=new Proxy(s.EventTarget.prototype.addEventListener,{apply(n,e,r){return typeof r[1]=="function"&&r[0]==="click"&&e instanceof HTMLElement&&/('|")X('|")\) {0,}&&/.test(r[1].toString())&&/('|")Y('|")\) {0,}&&/.test(r[1].toString())&&/^.+\..+$/.test(e.innerText.replaceAll(/[^a-zA-Z0-9\uAC00-\uD7A3./]+/gu,""))&&(g=e,s.dispatchEvent(T)),Reflect.apply(n,e,r)}});var S=n=>{var e=n.filter(t=>t instanceof HTMLElement);let r=[];return e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement).some(i=>Number(getComputedStyle(i).getPropertyValue("margin-bottom").replace(/px$/,""))>=4)),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(a=>a instanceof HTMLIFrameElement).length===0),e=e.filter(t=>t.querySelectorAll('span[id^="fn-"] + a[href^="#rfn-"]').length===0),e=e.filter(t=>!Array.from(t.parentElement.querySelectorAll("span")).some(l=>l.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),e=e.filter(t=>!Array.from(t.querySelectorAll("*")).some(l=>l.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),r.push(...e.filter(t=>t.contains(g))),r},A=async()=>{let n=[];n.push(...Array.from(s.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ div[class]'))),n.push(...Array.from(s.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')));let e=[],r=f((navigator.hardwareConcurrency??4)<4?4:navigator.hardwareConcurrency),t=[];for(let l of h(n,{Count:2}))t.push(r(()=>S(l)));e=await Promise.all(t).then(l=>l.flat()),console.debug("[NamuLink:index]: HideLeftoverElement:",e),v(e)};s.addEventListener("namuwikiloadedadvert",A);s.addEventListener("namuwikiunloadedadvert",L);s.addEventListener("namuwikifristvisit",L);s.addEventListener("namuwikinavigation",M);})();
