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
// @version      3.2.0
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
(()=>{var r=typeof unsafeWindow<"u"?unsafeWindow:window,p=new Event("namuwikinavigationwithadvert"),c=new Event("namuwikinavigation"),f=new Event("namuwikifristvisit");r.TextDecoder.prototype.decode=new Proxy(r.TextDecoder.prototype.decode,{apply(e,i,t){let o=Reflect.apply(e,i,t);return o.includes("//adcr.naver.com/adcr?")?(console.debug("[NamuLink:index]: TextDecoder.prototype.decode:",[e,i,t]),r.dispatchEvent(c),r.dispatchEvent(p),new Error):((o==="enable_ads"||decodeURIComponent(location.href).includes(o))&&r.dispatchEvent(c),o)}});r.Array.prototype.push=new Proxy(r.Array.prototype.push,{apply(e,i,t){t.toString().includes("//adcr.naver.com/adcr?")?(console.debug("[NamuLink:index]: Array.prototype.push:",[e,i,t]),r.dispatchEvent(f)):Reflect.apply(e,i,t)}});var d=[],y=e=>{d.push(...e),e.forEach(i=>{i.style.setProperty("display","none","important")})},h=()=>{console.debug("[NamuLink:index]: ShowElements:",d),d=d.filter(e=>e.parentElement!==null),d.forEach(e=>{e.style.removeProperty("display")}),d=[]},u=()=>{let e=Array.from(r.document.querySelectorAll('article div:not([class*=" "]):has(h1)~ div * ~ div[class]'));e.push(...Array.from(r.document.querySelectorAll('article div:not([class*=" "]):has(h1) ~ *'))),e.push(...Array.from(r.document.querySelectorAll('article div:not([class*=" "]) div[class=""] div[class*=" "]')));let i=e.filter(n=>n instanceof HTMLElement);var t=[];let o=[];t=i.filter(n=>n.innerText.length<25),t=t.filter(n=>Array.from(n.querySelectorAll("*")).filter(l=>l instanceof HTMLElement).some(l=>Number(getComputedStyle(l).getPropertyValue("margin-bottom").replace(/px$/,""))>=4)),t=t.filter(n=>Array.from(n.querySelectorAll("*")).filter(s=>s instanceof HTMLIFrameElement).length===0),o.push(...t.filter(n=>Array.from(n.querySelectorAll("*")).filter(l=>l instanceof HTMLElement).filter(l=>getComputedStyle(l).getPropertyValue("animation-iteration-count")==="infinite").length>=6)),t=t.filter(n=>{let s=Array.from(n.querySelectorAll("*")).filter(l=>l instanceof HTMLElement);return s.some(l=>Number(getComputedStyle(l).getPropertyValue("margin-bottom").replace(/px$/,""))>=10)&&s.every(l=>Number(getComputedStyle(l).getPropertyValue("margin-left").replace(/px$/,""))<=10)}),o.push(...t.filter(n=>{let s=Array.from(n.querySelectorAll("*")).filter(a=>a instanceof HTMLElement),E=Array.from(n.parentElement?.querySelectorAll("*")??[]).filter(a=>a instanceof HTMLElement);return s.every(a=>!a.innerText.includes("alt='external/"))&&E.filter(a=>a.nextElementSibling===n&&!(a instanceof HTMLHeadingElement)).length>0})),console.debug("[NamuLink:index]: HideLeftoverElement:",o),y(o)};r.addEventListener("namuwikinavigationwithadvert",u);r.addEventListener("namuwikifristvisit",u);r.addEventListener("namuwikinavigation",h);})();
