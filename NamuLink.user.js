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
// @version      3.7.1
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
(()=>{var f=class{value;next;constructor(e){this.value=e}},d=class{#e;#t;#n;constructor(){this.clear()}enqueue(e){let r=new f(e);this.#e?(this.#t.next=r,this.#t=r):(this.#e=r,this.#t=r),this.#n++}dequeue(){let e=this.#e;if(e)return this.#e=this.#e.next,this.#n--,e.value}clear(){this.#e=void 0,this.#t=void 0,this.#n=0}get size(){return this.#n}*[Symbol.iterator](){let e=this.#e;for(;e;)yield e.value,e=e.next}};var p={bind(n,e,r){return n.bind(r)}};function h(n){if(!((Number.isInteger(n)||n===Number.POSITIVE_INFINITY)&&n>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");let e=new d,r=0,t=()=>{r--,e.size>0&&e.dequeue()()},o=async(u,i,m)=>{r++;let E=(async()=>u(...m))();i(E);try{await E}catch{}t()},s=(u,i,m)=>{e.enqueue(p.bind(o.bind(void 0,u,i,m))),(async()=>(await Promise.resolve(),r<n&&e.size>0&&e.dequeue()()))()},l=(u,...i)=>new Promise(m=>{s(u,m,i)});return Object.defineProperties(l,{activeCount:{get:()=>r},pendingCount:{get:()=>e.size},clearQueue:{value(){e.clear()}}}),l}function g(n){if(!Number.isInteger(n.Count))throw new Error("MultithreadArrayOptions.Count should be an integer");if(n.Count<=0)throw new Error("MultithreadArrayOptions.Count should be greater than 0")}function y(n,e){g(e);let r=new Array(Math.ceil(n.length/e.Count));for(var t=0;t<r.length;t++)r[t]=n.slice(t===0?t:t*e.Count,(t+1)*e.Count>n.length?n.length:(t+1)*e.Count);return r}var a=typeof unsafeWindow<"u"?unsafeWindow:window,w=new Event("namuwikinavigationwithadvert"),C=new Event("namuwikinavigation");a.Function.prototype.apply=new Proxy(a.Function.prototype.apply,{apply(n,e,r){let t=typeof e=="function"&&e.toString().includes("fromCharCode")&&r[0]===null&&r[1]instanceof Uint16Array;if(t&&new TextDecoder().decode(r[1]).replaceAll("\0","").includes("adcr?x="))throw console.debug("[NamuLink:index]: Function.prototype.apply:",e,r),a.dispatchEvent(w),new Error;return t&&new TextDecoder().decode(r[1]).replaceAll("\0","").startsWith("wiki/i")&&a.dispatchEvent(C),Reflect.apply(n,e,r)}});var c=[],L=n=>{c.push(...n),n.forEach(e=>{e.style.setProperty("display","none","important")})},M=()=>{console.debug("[NamuLink:index]: ShowElements:",c),c=c.filter(n=>n.parentElement!==null),c.forEach(n=>{n.style.removeProperty("display")}),c=[]},H=n=>{var e=n.filter(t=>t instanceof HTMLElement);let r=[];return e=e.filter(t=>t.innerText.length<25),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(l=>l instanceof HTMLElement).some(l=>Number(getComputedStyle(l).getPropertyValue("margin-bottom").replace(/px$/,""))>=4)),e=e.filter(t=>Array.from(t.querySelectorAll("*")).filter(s=>s instanceof HTMLIFrameElement).length===0),e=e.filter(t=>t.querySelectorAll('span[id^="fn-"] + a[href^="#rfn-"]').length===0),e=e.filter(t=>!Array.from(t.querySelectorAll('a[rel="noopener"][target="_blank"][class] > span ~ span')).some(o=>o.innerHTML.includes("\uB098\uBB34\uB274\uC2A4"))),r.push(...e.filter(t=>Array.from(t.querySelectorAll("*")).filter(l=>l instanceof HTMLElement).filter(l=>getComputedStyle(l).getPropertyValue("animation-iteration-count")==="infinite").length>=6)),e=e.filter(t=>{let s=Array.from(t.querySelectorAll("*")).filter(l=>l instanceof HTMLElement);return s.some(l=>Number(getComputedStyle(l).getPropertyValue("margin-bottom").replace(/px$/,""))>=10)&&s.every(l=>Number(getComputedStyle(l).getPropertyValue("margin-left").replace(/px$/,""))<=10)}),r.push(...e.filter(t=>{let s=Array.from(t.querySelectorAll("*")).filter(i=>i instanceof HTMLElement),u=Array.from(t.parentElement?.querySelectorAll("*")??[]).filter(i=>i instanceof HTMLElement);return s.every(i=>!i.innerText.includes("alt='external/"))&&u.filter(i=>i.nextElementSibling===t&&!(i instanceof HTMLHeadingElement)).length>0})),r},v=async()=>{let n=[];n.push(...Array.from(a.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ div[class]'))),n.push(...Array.from(a.document.querySelectorAll('div:not([class*=" "]) div[class] div[class*=" "]')));let e=[],r=h((navigator.hardwareConcurrency??4)<4?4:navigator.hardwareConcurrency),t=[];for(let o of y(n,{Count:2}))t.push(r(()=>H(o)));e=await Promise.all(t).then(o=>o.flat()),console.debug("[NamuLink:index]: HideLeftoverElement:",e),L(e)};a.addEventListener("namuwikinavigationwithadvert",v);a.addEventListener("namuwikifristvisit",v);a.addEventListener("namuwikinavigation",M);})();
