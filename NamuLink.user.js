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
// @version      3.14.0
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
(()=>{var p=class{value;next;constructor(e){this.value=e}},m=class{#e;#t;#n;constructor(){this.clear()}enqueue(e){let r=new p(e);this.#e?(this.#t.next=r,this.#t=r):(this.#e=r,this.#t=r),this.#n++}dequeue(){let e=this.#e;if(e)return this.#e=this.#e.next,this.#n--,e.value}clear(){this.#e=void 0,this.#t=void 0,this.#n=0}get size(){return this.#n}*[Symbol.iterator](){let e=this.#e;for(;e;)yield e.value,e=e.next}};var g={bind(n,e,r){return n.bind(r)}};function h(n){if(!((Number.isInteger(n)||n===Number.POSITIVE_INFINITY)&&n>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");let e=new m,r=0,t=()=>{r--,e.size>0&&e.dequeue()()},i=async(a,s,d)=>{r++;let E=(async()=>a(...d))();s(E);try{await E}catch{}t()},u=(a,s,d)=>{e.enqueue(g.bind(i.bind(void 0,a,s,d))),(async()=>(await Promise.resolve(),r<n&&e.size>0&&e.dequeue()()))()},l=(a,...s)=>new Promise(d=>{u(a,d,s)});return Object.defineProperties(l,{activeCount:{get:()=>r},pendingCount:{get:()=>e.size},clearQueue:{value(){e.clear()}}}),l}function C(n){if(!Number.isInteger(n.Count))throw new Error("MultithreadArrayOptions.Count should be an integer");if(n.Count<=0)throw new Error("MultithreadArrayOptions.Count should be greater than 0")}function v(n,e){C(e);let r=new Array(Math.ceil(n.length/e.Count));for(var t=0;t<r.length;t++)r[t]=n.slice(t===0?t:t*e.Count,(t+1)*e.Count>n.length?n.length:(t+1)*e.Count);return r}var o=typeof unsafeWindow<"u"?unsafeWindow:window,f=new Event("namuwikiunloadedadvert"),L=new Event("namuwikinavigation"),w=["substring","substr"];for(let n of w)o.String.prototype[n]=new Proxy(o.String.prototype[n],{apply(e,r,t){return typeof r=="string"&&/^[a-zA-Z0-9_]+--?[a-zA-Z0-9_]+(-[a-zA-Z0-9_]+-[a-zA-Z0-9_]+){0,}$/.test(r)?(console.debug(`[NamuLink:index]: String.prototype.${n}:`,r),o.dispatchEvent(f),""):(typeof r=="string"&&r==="headAttrs"&&o.dispatchEvent(f),Reflect.apply(e,r,t))}});o.fetch=new Proxy(o.fetch,{apply(n,e,r){if(!(typeof r[0]=="string"&&r[0]==="/i/"))return Reflect.apply(n,e,r)}});o.TextDecoder.prototype.decode=new Proxy(o.TextDecoder.prototype.decode,{apply(n,e,r){let t=Reflect.apply(n,e,r);return typeof t=="string"&&/^\[+.{0,10}#.{10,50}\/\/\/.{0,20}==/.test(t)?(console.debug("[NamuLink:index]: TextDecoder.prototype.decode",t),o.dispatchEvent(f),""):t}});var S=new RegExp("^(?:[a-z0-9\\uAC00-\\uD7A3](?:[a-z0-9\\uAC00-\\uD7A3-]{0,61}[a-z0-9\\uAC00-\\uD7A3])?\\.)+[a-z0-9\\uAC00-\\uD7A3][a-z0-9\\uAC00-\\uD7A3-]{0,61}[a-z0-9\\uAC00-\\uD7A3](?:\\/[^\\s]*)?$|^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");o.String.prototype.replace=new Proxy(o.String.prototype.replace,{apply(n,e,r){let t=Reflect.apply(n,e,r);if(typeof t=="string"&&S.test(t)&&new Error().stack.includes("espejo/vendor")){console.debug("[NamuLink:index]: String.prototype.replace",t);return}return t}});var x=["setTimeout","setInterval"];for(let n of x)o[n]=new Proxy(o[n],{apply(e,r,t){if(typeof t[0]=="function"&&typeof t[1]=="number"&&(/return {0,}new {0,}Promise.+\.apply {0,}\(.+function.+next.+throw.+void/.test(t[0].toString())||/if {0,}\(('|")[a-zA-Z0-9_]+('|") {0,}===? {0,}.+return.+else/.test(t[0].toString()))){console.debug(`[NamuLink:index]: ${n}:`,t),o.dispatchEvent(f);return}return Reflect.apply(e,r,t)}});o.Array.prototype.join=new Proxy(o.Array.prototype.join,{apply(n,e,r){let t=Reflect.apply(n,e,r);return t.startsWith('noscript[data-n-head="]')&&o.dispatchEvent(L),t}});var c=[],b=n=>{c.push(...n),n.forEach(e=>{e.remove()})},M=()=>{console.debug("[NamuLink:index]: ShowElements:",c),c=c.filter(n=>n.parentElement!==null),c.forEach(n=>{n.style.removeProperty("display")}),c=[]},T=n=>{var e=n.filter(t=>t instanceof HTMLElement);let r=[];return e=e.filter(t=>t.innerText.length<25),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(l=>l instanceof HTMLElement).some(l=>Number(getComputedStyle(l).getPropertyValue("margin-bottom").replace(/px$/,""))>=4)),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(u=>u instanceof HTMLIFrameElement).length===0),e=e.filter(t=>t.querySelectorAll('span[id^="fn-"] + a[href^="#rfn-"]').length===0),e=e.filter(t=>!Array.from(t.querySelectorAll('a[rel="noopener"][target="_blank"][class] > span ~ span')).some(i=>i.innerHTML.includes("\uB098\uBB34\uB274\uC2A4"))),e=e.filter(t=>!Array.from(t.querySelectorAll("*")).some(i=>i.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),r.push(...e.filter(t=>Array.from(t.querySelectorAll("*")).filter(l=>l instanceof HTMLElement).filter(l=>getComputedStyle(l).getPropertyValue("animation-iteration-count")==="infinite").length>=6)),e=e.filter(t=>{let u=Array.from(t.querySelectorAll("*")).filter(l=>l instanceof HTMLElement);return u.some(l=>Number(getComputedStyle(l).getPropertyValue("margin-bottom").replace(/px$/,""))>=10)&&u.every(l=>Number(getComputedStyle(l).getPropertyValue("margin-left").replace(/px$/,""))<=10)}),r.push(...e.filter(t=>{let u=Array.from(t.querySelectorAll("*")).filter(s=>s instanceof HTMLElement),a=Array.from(t.parentElement?.querySelectorAll("*")??[]).filter(s=>s instanceof HTMLElement);return u.every(s=>!s.innerText.includes("alt='external/"))&&a.filter(s=>s.nextElementSibling===t&&!(s instanceof HTMLHeadingElement)).length>0})),r},y=async()=>{let n=[];n.push(...Array.from(o.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ div[class]'))),n.push(...Array.from(o.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')));let e=[],r=h((navigator.hardwareConcurrency??4)<4?4:navigator.hardwareConcurrency),t=[];for(let i of v(n,{Count:2}))t.push(r(()=>T(i)));e=await Promise.all(t).then(i=>i.flat()),console.debug("[NamuLink:index]: HideLeftoverElement:",e),b(e)};o.addEventListener("namuwikiloadedadvert",y);o.addEventListener("namuwikiunloadedadvert",y);o.addEventListener("namuwikifristvisit",y);o.addEventListener("namuwikinavigation",M);})();
