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
// @version      3.15.1
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
(()=>{var E=class{value;next;constructor(e){this.value=e}},m=class{#e;#t;#n;constructor(){this.clear()}enqueue(e){let r=new E(e);this.#e?(this.#t.next=r,this.#t=r):(this.#e=r,this.#t=r),this.#n++}dequeue(){let e=this.#e;if(e)return this.#e=this.#e.next,this.#n--,e.value}clear(){this.#e=void 0,this.#t=void 0,this.#n=0}get size(){return this.#n}*[Symbol.iterator](){let e=this.#e;for(;e;)yield e.value,e=e.next}};var v={bind(n,e,r){return n.bind(r)}};function f(n){if(!((Number.isInteger(n)||n===Number.POSITIVE_INFINITY)&&n>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");let e=new m,r=0,t=()=>{r--,e.size>0&&e.dequeue()()},l=async(u,s,d)=>{r++;let y=(async()=>u(...d))();s(y);try{await y}catch{}t()},a=(u,s,d)=>{e.enqueue(v.bind(l.bind(void 0,u,s,d))),(async()=>(await Promise.resolve(),r<n&&e.size>0&&e.dequeue()()))()},i=(u,...s)=>new Promise(d=>{a(u,d,s)});return Object.defineProperties(i,{activeCount:{get:()=>r},pendingCount:{get:()=>e.size},clearQueue:{value(){e.clear()}}}),i}function T(n){if(!Number.isInteger(n.Count))throw new Error("MultithreadArrayOptions.Count should be an integer");if(n.Count<=0)throw new Error("MultithreadArrayOptions.Count should be greater than 0")}function h(n,e){T(e);let r=new Array(Math.ceil(n.length/e.Count));for(var t=0;t<r.length;t++)r[t]=n.slice(t===0?t:t*e.Count,(t+1)*e.Count>n.length?n.length:(t+1)*e.Count);return r}var o=typeof unsafeWindow<"u"?unsafeWindow:window,p=new Event("namuwikiunloadedadvert"),H=new Event("namuwikiloadedadvert"),M=new Event("namuwikinavigation"),w=["substring","substr"];for(let n of w)o.String.prototype[n]=new Proxy(o.String.prototype[n],{apply(e,r,t){return typeof r=="string"&&/^[a-zA-Z0-9_]+--?[a-zA-Z0-9_]+(-[a-zA-Z0-9_]+-[a-zA-Z0-9_]+){0,}$/.test(r)&&(console.debug(`[NamuLink:index]: String.prototype.${n}:`,r),o.dispatchEvent(p)),typeof r=="string"&&r==="headAttrs"&&o.dispatchEvent(p),Reflect.apply(e,r,t)}});o.TextDecoder.prototype.decode=new Proxy(o.TextDecoder.prototype.decode,{apply(n,e,r){let t=Reflect.apply(n,e,r);return typeof t=="string"&&/^\[+.{0,10}#.{10,50}\/\/\/.{0,20}==/.test(t)?(console.debug("[NamuLink:index]: TextDecoder.prototype.decode",t),o.dispatchEvent(p),""):t}});var S=["setTimeout","setInterval"];for(let n of S)o[n]=new Proxy(o[n],{apply(e,r,t){if(typeof t[0]=="function"&&typeof t[1]=="number"&&(/return {0,}new {0,}Promise.+\.apply {0,}\(.+function.+next.+throw.+void/.test(t[0].toString())||/if {0,}\(('|")[a-zA-Z0-9_]+('|") {0,}===? {0,}.+return.+else/.test(t[0].toString()))){console.debug(`[NamuLink:index]: ${n}:`,t),o.dispatchEvent(p);return}return Reflect.apply(e,r,t)}});o.Array.prototype.join=new Proxy(o.Array.prototype.join,{apply(n,e,r){let t=Reflect.apply(n,e,r);return t.startsWith('noscript[data-n-head="]')&&o.dispatchEvent(M),t}});var c=[],L=n=>{c.push(...n),n.forEach(e=>{e.remove()})},b=()=>{console.debug("[NamuLink:index]: ShowElements:",c),c=c.filter(n=>n.parentElement!==null),c.forEach(n=>{n.style.removeProperty("display")}),c=[]},A=n=>{var e=n.filter(t=>t instanceof HTMLElement);let r=[];return e=e.filter(t=>t.innerText.length<25),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement).some(i=>Number(getComputedStyle(i).getPropertyValue("margin-bottom").replace(/px$/,""))>=4)),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(a=>a instanceof HTMLIFrameElement).length===0),e=e.filter(t=>t.querySelectorAll('span[id^="fn-"] + a[href^="#rfn-"]').length===0),e=e.filter(t=>!Array.from(t.parentElement.querySelectorAll("span")).some(l=>l.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),e=e.filter(t=>!Array.from(t.querySelectorAll("*")).some(l=>l.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),r.push(...e.filter(t=>Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement).filter(i=>getComputedStyle(i).getPropertyValue("animation-iteration-count")==="infinite").length>=6)),e=e.filter(t=>{let a=Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement);return a.some(i=>Number(getComputedStyle(i).getPropertyValue("margin-bottom").replace(/px$/,""))>=10)&&a.every(i=>Number(getComputedStyle(i).getPropertyValue("margin-left").replace(/px$/,""))<=10)}),r.push(...e.filter(t=>{let a=Array.from(t.querySelectorAll("*")).filter(s=>s instanceof HTMLElement),u=Array.from(t.parentElement?.querySelectorAll("*")??[]).filter(s=>s instanceof HTMLElement);return a.every(s=>!s.innerText.includes("alt='external/"))&&u.filter(s=>s.nextElementSibling===t&&!(s instanceof HTMLHeadingElement)).length>0})),r},g=async()=>{let n=[];n.push(...Array.from(o.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ div[class]'))),n.push(...Array.from(o.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')));let e=[],r=f((navigator.hardwareConcurrency??4)<4?4:navigator.hardwareConcurrency),t=[];for(let l of h(n,{Count:2}))t.push(r(()=>A(l)));e=await Promise.all(t).then(l=>l.flat()),console.debug("[NamuLink:index]: HideLeftoverElement:",e),L(e)},C=null;o.EventTarget.prototype.addEventListener=new Proxy(o.EventTarget.prototype.addEventListener,{apply(n,e,r){return typeof r[1]=="function"&&r[0]==="click"&&e instanceof HTMLElement&&r[1].toString().includes("currentTarget")&&/^.+\..+$/.test(e.innerText.replaceAll(/[^a-zA-Z0-9\uAC00-\uD7A3./]+/gu,""))&&(C=e,o.dispatchEvent(H)),Reflect.apply(n,e,r)}});var x=n=>{var e=n.filter(t=>t instanceof HTMLElement);let r=[];return e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement).some(i=>Number(getComputedStyle(i).getPropertyValue("margin-bottom").replace(/px$/,""))>=4)),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(a=>a instanceof HTMLIFrameElement).length===0),e=e.filter(t=>t.querySelectorAll('span[id^="fn-"] + a[href^="#rfn-"]').length===0),e=e.filter(t=>!Array.from(t.parentElement.querySelectorAll("span")).some(l=>l.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),e=e.filter(t=>!Array.from(t.querySelectorAll("*")).some(l=>l.innerHTML.includes("\uC2E4\uC2DC\uAC04 \uAC80\uC0C9\uC5B4"))),r.push(...e.filter(t=>t.contains(C))),r},q=async()=>{let n=[];n.push(...Array.from(o.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ div[class]'))),n.push(...Array.from(o.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')));let e=[],r=f((navigator.hardwareConcurrency??4)<4?4:navigator.hardwareConcurrency),t=[];for(let l of h(n,{Count:2}))t.push(r(()=>x(l)));e=await Promise.all(t).then(l=>l.flat()),console.debug("[NamuLink:index]: HideLeftoverElement:",e),L(e)};o.addEventListener("namuwikiloadedadvert",q);o.addEventListener("namuwikiunloadedadvert",g);o.addEventListener("namuwikifristvisit",g);o.addEventListener("namuwikinavigation",b);})();
