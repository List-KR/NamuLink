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
// @version      3.0.0
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
(()=>{var L=Object.defineProperty;var q=(e,n)=>{for(var t in n)L(e,t,{get:n[t],enumerable:!0})};var m={};q(m,{Struct:()=>s,StructError:()=>k,any:()=>Z,array:()=>V,assert:()=>A,assign:()=>C,bigint:()=>v,boolean:()=>ee,coerce:()=>S,create:()=>P,date:()=>ne,defaulted:()=>me,define:()=>p,deprecated:()=>G,dynamic:()=>H,empty:()=>we,enums:()=>te,func:()=>re,instance:()=>ie,integer:()=>oe,intersection:()=>ce,is:()=>E,lazy:()=>K,literal:()=>se,map:()=>fe,mask:()=>D,max:()=>$e,min:()=>ge,never:()=>N,nonempty:()=>ke,nullable:()=>ue,number:()=>de,object:()=>$,omit:()=>Q,optional:()=>I,partial:()=>U,pattern:()=>je,pick:()=>X,record:()=>ae,refine:()=>b,regexp:()=>pe,set:()=>ye,size:()=>xe,string:()=>M,struct:()=>Y,trimmed:()=>he,tuple:()=>le,type:()=>O,union:()=>be,unknown:()=>W,validate:()=>h});var k=class extends TypeError{constructor(n,t){let r,{message:i,explanation:o,...c}=n,{path:u}=n,d=u.length===0?i:`At path: ${u.join(".")} -- ${i}`;super(o??d),o!=null&&(this.cause=d),Object.assign(this,c),this.name=this.constructor.name,this.failures=()=>r??(r=[n,...t()])}};function J(e){return l(e)&&typeof e[Symbol.iterator]=="function"}function l(e){return typeof e=="object"&&e!=null}function z(e){if(Object.prototype.toString.call(e)!=="[object Object]")return!1;let n=Object.getPrototypeOf(e);return n===null||n===Object.prototype}function a(e){return typeof e=="symbol"?e.toString():typeof e=="string"?JSON.stringify(e):`${e}`}function T(e){let{done:n,value:t}=e.next();return n?void 0:t}function B(e,n,t,r){if(e===!0)return;e===!1?e={}:typeof e=="string"&&(e={message:e});let{path:i,branch:o}=n,{type:c}=t,{refinement:u,message:d=`Expected a value of type \`${c}\`${u?` with refinement \`${u}\``:""}, but received: \`${a(r)}\``}=e;return{value:r,type:c,refinement:u,key:i[i.length-1],path:i,branch:o,...e,message:d}}function*j(e,n,t,r){J(e)||(e=[e]);for(let i of e){let o=B(i,n,t,r);o&&(yield o)}}function*x(e,n,t={}){let{path:r=[],branch:i=[e],coerce:o=!1,mask:c=!1}=t,u={path:r,branch:i};if(o&&(e=n.coercer(e,u),c&&n.type!=="type"&&l(n.schema)&&l(e)&&!Array.isArray(e)))for(let f in e)n.schema[f]===void 0&&delete e[f];let d="valid";for(let f of n.validator(e,u))f.explanation=t.message,d="not_valid",yield[f,void 0];for(let[f,y,F]of n.entries(e,u)){let R=x(y,F,{path:f===void 0?r:[...r,f],branch:f===void 0?i:[...i,y],coerce:o,mask:c,message:t.message});for(let g of R)g[0]?(d=g[0].refinement!=null?"not_refined":"not_valid",yield[g[0],void 0]):o&&(y=g[1],f===void 0?e=y:e instanceof Map?e.set(f,y):e instanceof Set?e.add(y):l(e)&&(y!==void 0||f in e)&&(e[f]=y))}if(d!=="not_valid")for(let f of n.refiner(e,u))f.explanation=t.message,d="not_refined",yield[f,void 0];d==="valid"&&(yield[void 0,e])}var s=class{constructor(n){let{type:t,schema:r,validator:i,refiner:o,coercer:c=d=>d,entries:u=function*(){}}=n;this.type=t,this.schema=r,this.entries=u,this.coercer=c,i?this.validator=(d,f)=>{let y=i(d,f);return j(y,f,this,d)}:this.validator=()=>[],o?this.refiner=(d,f)=>{let y=o(d,f);return j(y,f,this,d)}:this.refiner=()=>[]}assert(n,t){return A(n,this,t)}create(n,t){return P(n,this,t)}is(n){return E(n,this)}mask(n,t){return D(n,this,t)}validate(n,t={}){return h(n,this,t)}};function A(e,n,t){let r=h(e,n,{message:t});if(r[0])throw r[0]}function P(e,n,t){let r=h(e,n,{coerce:!0,message:t});if(r[0])throw r[0];return r[1]}function D(e,n,t){let r=h(e,n,{coerce:!0,mask:!0,message:t});if(r[0])throw r[0];return r[1]}function E(e,n){return!h(e,n)[0]}function h(e,n,t={}){let r=x(e,n,t),i=T(r);return i[0]?[new k(i[0],function*(){for(let c of r)c[0]&&(yield c[0])}),void 0]:[void 0,i[1]]}function C(...e){let n=e[0].type==="type",t=e.map(i=>i.schema),r=Object.assign({},...t);return n?O(r):$(r)}function p(e,n){return new s({type:e,schema:null,validator:n})}function G(e,n){return new s({...e,refiner:(t,r)=>t===void 0||e.refiner(t,r),validator(t,r){return t===void 0?!0:(n(t,r),e.validator(t,r))}})}function H(e){return new s({type:"dynamic",schema:null,*entries(n,t){yield*e(n,t).entries(n,t)},validator(n,t){return e(n,t).validator(n,t)},coercer(n,t){return e(n,t).coercer(n,t)},refiner(n,t){return e(n,t).refiner(n,t)}})}function K(e){let n;return new s({type:"lazy",schema:null,*entries(t,r){n??(n=e()),yield*n.entries(t,r)},validator(t,r){return n??(n=e()),n.validator(t,r)},coercer(t,r){return n??(n=e()),n.coercer(t,r)},refiner(t,r){return n??(n=e()),n.refiner(t,r)}})}function Q(e,n){let{schema:t}=e,r={...t};for(let i of n)delete r[i];switch(e.type){case"type":return O(r);default:return $(r)}}function U(e){let n=e instanceof s?{...e.schema}:{...e};for(let t in n)n[t]=I(n[t]);return $(n)}function X(e,n){let{schema:t}=e,r={};for(let i of n)r[i]=t[i];return $(r)}function Y(e,n){return console.warn("superstruct@0.11 - The `struct` helper has been renamed to `define`."),p(e,n)}function Z(){return p("any",()=>!0)}function V(e){return new s({type:"array",schema:e,*entries(n){if(e&&Array.isArray(n))for(let[t,r]of n.entries())yield[t,r,e]},coercer(n){return Array.isArray(n)?n.slice():n},validator(n){return Array.isArray(n)||`Expected an array value, but received: ${a(n)}`}})}function v(){return p("bigint",e=>typeof e=="bigint")}function ee(){return p("boolean",e=>typeof e=="boolean")}function ne(){return p("date",e=>e instanceof Date&&!isNaN(e.getTime())||`Expected a valid \`Date\` object, but received: ${a(e)}`)}function te(e){let n={},t=e.map(r=>a(r)).join();for(let r of e)n[r]=r;return new s({type:"enums",schema:n,validator(r){return e.includes(r)||`Expected one of \`${t}\`, but received: ${a(r)}`}})}function re(){return p("func",e=>typeof e=="function"||`Expected a function, but received: ${a(e)}`)}function ie(e){return p("instance",n=>n instanceof e||`Expected a \`${e.name}\` instance, but received: ${a(n)}`)}function oe(){return p("integer",e=>typeof e=="number"&&!isNaN(e)&&Number.isInteger(e)||`Expected an integer, but received: ${a(e)}`)}function ce(e){return new s({type:"intersection",schema:null,*entries(n,t){for(let r of e)yield*r.entries(n,t)},*validator(n,t){for(let r of e)yield*r.validator(n,t)},*refiner(n,t){for(let r of e)yield*r.refiner(n,t)}})}function se(e){let n=a(e),t=typeof e;return new s({type:"literal",schema:t==="string"||t==="number"||t==="boolean"?e:null,validator(r){return r===e||`Expected the literal \`${n}\`, but received: ${a(r)}`}})}function fe(e,n){return new s({type:"map",schema:null,*entries(t){if(e&&n&&t instanceof Map)for(let[r,i]of t.entries())yield[r,r,e],yield[r,i,n]},coercer(t){return t instanceof Map?new Map(t):t},validator(t){return t instanceof Map||`Expected a \`Map\` object, but received: ${a(t)}`}})}function N(){return p("never",()=>!1)}function ue(e){return new s({...e,validator:(n,t)=>n===null||e.validator(n,t),refiner:(n,t)=>n===null||e.refiner(n,t)})}function de(){return p("number",e=>typeof e=="number"&&!isNaN(e)||`Expected a number, but received: ${a(e)}`)}function $(e){let n=e?Object.keys(e):[],t=N();return new s({type:"object",schema:e||null,*entries(r){if(e&&l(r)){let i=new Set(Object.keys(r));for(let o of n)i.delete(o),yield[o,r[o],e[o]];for(let o of i)yield[o,r[o],t]}},validator(r){return l(r)||`Expected an object, but received: ${a(r)}`},coercer(r){return l(r)?{...r}:r}})}function I(e){return new s({...e,validator:(n,t)=>n===void 0||e.validator(n,t),refiner:(n,t)=>n===void 0||e.refiner(n,t)})}function ae(e,n){return new s({type:"record",schema:null,*entries(t){if(l(t))for(let r in t){let i=t[r];yield[r,r,e],yield[r,i,n]}},validator(t){return l(t)||`Expected an object, but received: ${a(t)}`}})}function pe(){return p("regexp",e=>e instanceof RegExp)}function ye(e){return new s({type:"set",schema:null,*entries(n){if(e&&n instanceof Set)for(let t of n)yield[t,t,e]},coercer(n){return n instanceof Set?new Set(n):n},validator(n){return n instanceof Set||`Expected a \`Set\` object, but received: ${a(n)}`}})}function M(){return p("string",e=>typeof e=="string"||`Expected a string, but received: ${a(e)}`)}function le(e){let n=N();return new s({type:"tuple",schema:null,*entries(t){if(Array.isArray(t)){let r=Math.max(e.length,t.length);for(let i=0;i<r;i++)yield[i,t[i],e[i]||n]}},validator(t){return Array.isArray(t)||`Expected an array, but received: ${a(t)}`}})}function O(e){let n=Object.keys(e);return new s({type:"type",schema:e,*entries(t){if(l(t))for(let r of n)yield[r,t[r],e[r]]},validator(t){return l(t)||`Expected an object, but received: ${a(t)}`},coercer(t){return l(t)?{...t}:t}})}function be(e){let n=e.map(t=>t.type).join(" | ");return new s({type:"union",schema:null,coercer(t){for(let r of e){let[i,o]=r.validate(t,{coerce:!0});if(!i)return o}return t},validator(t,r){let i=[];for(let o of e){let[...c]=x(t,o,r),[u]=c;if(u[0])for(let[d]of c)d&&i.push(d);else return[]}return[`Expected the value to satisfy a union of \`${n}\`, but received: ${a(t)}`,...i]}})}function W(){return p("unknown",()=>!0)}function S(e,n,t){return new s({...e,coercer:(r,i)=>E(r,n)?e.coercer(t(r,i),i):e.coercer(r,i)})}function me(e,n,t={}){return S(e,W(),r=>{let i=typeof n=="function"?n():n;if(r===void 0)return i;if(!t.strict&&z(r)&&z(i)){let o={...r},c=!1;for(let u in i)o[u]===void 0&&(o[u]=i[u],c=!0);if(c)return o}return r})}function he(e){return S(e,M(),n=>n.trim())}function we(e){return b(e,"empty",n=>{let t=_(n);return t===0||`Expected an empty ${e.type} but received one with a size of \`${t}\``})}function _(e){return e instanceof Map||e instanceof Set?e.size:e.length}function $e(e,n,t={}){let{exclusive:r}=t;return b(e,"max",i=>r?i<n:i<=n||`Expected a ${e.type} less than ${r?"":"or equal to "}${n} but received \`${i}\``)}function ge(e,n,t={}){let{exclusive:r}=t;return b(e,"min",i=>r?i>n:i>=n||`Expected a ${e.type} greater than ${r?"":"or equal to "}${n} but received \`${i}\``)}function ke(e){return b(e,"nonempty",n=>_(n)>0||`Expected a nonempty ${e.type} but received an empty one`)}function je(e,n){return b(e,"pattern",t=>n.test(t)||`Expected a ${e.type} matching \`/${n.source}/\` but received "${t}"`)}function xe(e,n,t=n){let r=`Expected a ${e.type}`,i=n===t?`of \`${n}\``:`between \`${n}\` and \`${t}\``;return b(e,"size",o=>{if(typeof o=="number"||o instanceof Date)return n<=o&&o<=t||`${r} ${i} but received \`${o}\``;if(o instanceof Map||o instanceof Set){let{size:c}=o;return n<=c&&c<=t||`${r} with a size ${i} but received one with a size of \`${c}\``}else{let{length:c}=o;return n<=c&&c<=t||`${r} with a length ${i} but received one with a length of \`${c}\``}})}function b(e,n,t){return new s({...e,*refiner(r,i){yield*e.refiner(r,i);let o=t(r,i),c=j(o,i,e,r);for(let u of c)yield{...u,refinement:n}}})}var w=typeof unsafeWindow<"u"?unsafeWindow:window,Ee=e=>{if(Array.isArray(e)){if(e.toString().includes("//adcr.naver.com/adcr?"))return!0}else for(let n of Object.keys(e))try{if(typeof e[n]=="string"&&e[n].includes("//adcr.naver.com/adcr?"))return!0}catch{}return!1},Ne=e=>!Number.isNaN(Number(e)),Oe=m.object({enable_ads:m.define("IsFakeNumber",Ne)}),Se=e=>typeof e[0]<"u"&&typeof e[0]=="object"&&m.validate(e,Oe)&&Ee(e[0]);w.Object.defineProperty=new Proxy(w.Object.defineProperty,{apply(e,n,t){Se(t)?console.debug("[NamuLink:index]: Object.defineProperty:",[e,n,t]):Reflect.apply(e,n,t)}});w.TextDecoder.prototype.decode=new Proxy(w.TextDecoder.prototype.decode,{apply(e,n,t){let r=Reflect.apply(e,n,t);return r.includes("//adcr.naver.com/adcr?")?(console.debug("[NamuLink:index]: TextDecoder.prototype.decode:",[e,n,t]),new Error):r}});w.Array.prototype.push=new Proxy(w.Array.prototype.push,{apply(e,n,t){t.toString().includes("//adcr.naver.com/adcr?")?console.debug("[NamuLink:index]: Array.prototype.push:",[e,n,t]):Reflect.apply(e,n,t)}});})();
