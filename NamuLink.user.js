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
// @version      4.0.4
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
(()=>{var $=Object.create;var C=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var U=Object.getOwnPropertyNames;var Z=Object.getPrototypeOf,Q=Object.prototype.hasOwnProperty;var Y=(r,e)=>()=>(r&&(e=r(r=0)),e);var f=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);var G=(r,e,u,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of U(e))!Q.call(r,o)&&o!==u&&C(r,o,{get:()=>e[o],enumerable:!(t=_(e,o))||t.enumerable});return r};var K=(r,e,u)=>(u=r!=null?$(Z(r)):{},G(e||!r||!r.__esModule?C(u,"default",{value:r,enumerable:!0}):u,r));var g=Y(()=>{});var T=f((he,F)=>{"use strict";g();var E="-",X=/^xn--/,J=/[^\0-\x7F]/,O=/[\x2E\u3002\uFF0E\uFF61]/g,ee={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},z=35,p=Math.floor,y=String.fromCharCode;function k(r){throw new RangeError(ee[r])}function re(r,e){let u=[],t=r.length;for(;t--;)u[t]=e(r[t]);return u}function M(r,e){let u=r.split("@"),t="";u.length>1&&(t=u[0]+"@",r=u[1]),r=r.replace(O,".");let o=r.split("."),s=re(o,e).join(".");return t+s}function A(r){let e=[],u=0,t=r.length;for(;u<t;){let o=r.charCodeAt(u++);if(o>=55296&&o<=56319&&u<t){let s=r.charCodeAt(u++);(s&64512)==56320?e.push(((o&1023)<<10)+(s&1023)+65536):(e.push(o),u--)}else e.push(o)}return e}var te=r=>String.fromCodePoint(...r),ue=function(r){return r>=48&&r<58?26+(r-48):r>=65&&r<91?r-65:r>=97&&r<123?r-97:36},q=function(r,e){return r+22+75*(r<26)-((e!=0)<<5)},S=function(r,e,u){let t=0;for(r=u?p(r/700):r>>1,r+=p(r/e);r>z*26>>1;t+=36)r=p(r/z);return p(t+(z+1)*r/(r+38))},L=function(r){let e=[],u=r.length,t=0,o=128,s=72,m=r.lastIndexOf(E);m<0&&(m=0);for(let n=0;n<m;++n)r.charCodeAt(n)>=128&&k("not-basic"),e.push(r.charCodeAt(n));for(let n=m>0?m+1:0;n<u;){let c=t;for(let i=1,l=36;;l+=36){n>=u&&k("invalid-input");let d=ue(r.charCodeAt(n++));d>=36&&k("invalid-input"),d>p((2147483647-t)/i)&&k("overflow"),t+=d*i;let b=l<=s?1:l>=s+26?26:l-s;if(d<b)break;let h=36-b;i>p(2147483647/h)&&k("overflow"),i*=h}let a=e.length+1;s=S(t-c,a,c==0),p(t/a)>2147483647-o&&k("overflow"),o+=p(t/a),t%=a,e.splice(t++,0,o)}return String.fromCodePoint(...e)},I=function(r){let e=[];r=A(r);let u=r.length,t=128,o=0,s=72;for(let c of r)c<128&&e.push(y(c));let m=e.length,n=m;for(m&&e.push(E);n<u;){let c=2147483647;for(let i of r)i>=t&&i<c&&(c=i);let a=n+1;c-t>p((2147483647-o)/a)&&k("overflow"),o+=(c-t)*a,t=c;for(let i of r)if(i<t&&++o>2147483647&&k("overflow"),i===t){let l=o;for(let d=36;;d+=36){let b=d<=s?1:d>=s+26?26:d-s;if(l<b)break;let h=l-b,j=36-b;e.push(y(q(b+h%j,0))),l=p(h/j)}e.push(y(q(l,0))),s=S(o,a,n===m),o=0,++n}++o,++t}return e.join("")},oe=function(r){return M(r,function(e){return X.test(e)?L(e.slice(4).toLowerCase()):e})},ne=function(r){return M(r,function(e){return J.test(e)?"xn--"+I(e):e})},ae={version:"2.3.1",ucs2:{decode:A,encode:te},decode:L,encode:I,toASCII:ne,toUnicode:oe};F.exports=ae});var V=f((fe,se)=>{se.exports={"com.ac":!0,"net.ac":!0,"gov.ac":!0,"org.ac":!0,"mil.ac":!0,"co.ae":!0,"net.ae":!0,"gov.ae":!0,"ac.ae":!0,"sch.ae":!0,"org.ae":!0,"mil.ae":!0,"pro.ae":!0,"name.ae":!0,"com.af":!0,"edu.af":!0,"gov.af":!0,"net.af":!0,"org.af":!0,"com.al":!0,"edu.al":!0,"gov.al":!0,"mil.al":!0,"net.al":!0,"org.al":!0,"ed.ao":!0,"gv.ao":!0,"og.ao":!0,"co.ao":!0,"pb.ao":!0,"it.ao":!0,"com.ar":!0,"edu.ar":!0,"gob.ar":!0,"gov.ar":!0,"int.ar":!0,"mil.ar":!0,"net.ar":!0,"org.ar":!0,"tur.ar":!0,"gv.at":!0,"ac.at":!0,"co.at":!0,"or.at":!0,"com.au":!0,"net.au":!0,"org.au":!0,"edu.au":!0,"gov.au":!0,"csiro.au":!0,"asn.au":!0,"id.au":!0,"vic.au":!0,"sa.au":!0,"wa.au":!0,"nt.au":!0,"tas.au":!0,"qld.au":!0,"act.au":!0,"conf.au":!0,"oz.au":!0,"org.ba":!0,"net.ba":!0,"edu.ba":!0,"gov.ba":!0,"mil.ba":!0,"unsa.ba":!0,"untz.ba":!0,"unmo.ba":!0,"unbi.ba":!0,"unze.ba":!0,"co.ba":!0,"com.ba":!0,"rs.ba":!0,"co.bb":!0,"com.bb":!0,"net.bb":!0,"org.bb":!0,"gov.bb":!0,"edu.bb":!0,"info.bb":!0,"store.bb":!0,"tv.bb":!0,"biz.bb":!0,"com.bh":!0,"info.bh":!0,"cc.bh":!0,"edu.bh":!0,"biz.bh":!0,"net.bh":!0,"org.bh":!0,"gov.bh":!0,"com.bn":!0,"edu.bn":!0,"gov.bn":!0,"net.bn":!0,"org.bn":!0,"com.bo":!0,"net.bo":!0,"org.bo":!0,"tv.bo":!0,"mil.bo":!0,"int.bo":!0,"gob.bo":!0,"gov.bo":!0,"edu.bo":!0,"adm.br":!0,"adv.br":!0,"agr.br":!0,"am.br":!0,"arq.br":!0,"art.br":!0,"ato.br":!0,"b.br":!0,"bio.br":!0,"blog.br":!0,"bmd.br":!0,"cim.br":!0,"cng.br":!0,"cnt.br":!0,"com.br":!0,"coop.br":!0,"ecn.br":!0,"edu.br":!0,"eng.br":!0,"esp.br":!0,"etc.br":!0,"eti.br":!0,"far.br":!0,"flog.br":!0,"fm.br":!0,"fnd.br":!0,"fot.br":!0,"fst.br":!0,"g12.br":!0,"ggf.br":!0,"gov.br":!0,"imb.br":!0,"ind.br":!0,"inf.br":!0,"jor.br":!0,"jus.br":!0,"lel.br":!0,"mat.br":!0,"med.br":!0,"mil.br":!0,"mus.br":!0,"net.br":!0,"nom.br":!0,"not.br":!0,"ntr.br":!0,"odo.br":!0,"org.br":!0,"ppg.br":!0,"pro.br":!0,"psc.br":!0,"psi.br":!0,"qsl.br":!0,"rec.br":!0,"slg.br":!0,"srv.br":!0,"tmp.br":!0,"trd.br":!0,"tur.br":!0,"tv.br":!0,"vet.br":!0,"vlog.br":!0,"wiki.br":!0,"zlg.br":!0,"com.bs":!0,"net.bs":!0,"org.bs":!0,"edu.bs":!0,"gov.bs":!0,"om.bz":!0,"du.bz":!0,"ov.bz":!0,"et.bz":!0,"rg.bz":!0,"ab.ca":!0,"bc.ca":!0,"mb.ca":!0,"nb.ca":!0,"nf.ca":!0,"nl.ca":!0,"ns.ca":!0,"nt.ca":!0,"nu.ca":!0,"on.ca":!0,"pe.ca":!0,"qc.ca":!0,"sk.ca":!0,"yk.ca":!0,"co.ck":!0,"org.ck":!0,"edu.ck":!0,"gov.ck":!0,"net.ck":!0,"gen.ck":!0,"biz.ck":!0,"info.ck":!0,"ac.cn":!0,"com.cn":!0,"edu.cn":!0,"gov.cn":!0,"mil.cn":!0,"net.cn":!0,"org.cn":!0,"ah.cn":!0,"bj.cn":!0,"cq.cn":!0,"fj.cn":!0,"gd.cn":!0,"gs.cn":!0,"gz.cn":!0,"gx.cn":!0,"ha.cn":!0,"hb.cn":!0,"he.cn":!0,"hi.cn":!0,"hl.cn":!0,"hn.cn":!0,"jl.cn":!0,"js.cn":!0,"jx.cn":!0,"ln.cn":!0,"nm.cn":!0,"nx.cn":!0,"qh.cn":!0,"sc.cn":!0,"sd.cn":!0,"sh.cn":!0,"sn.cn":!0,"sx.cn":!0,"tj.cn":!0,"tw.cn":!0,"xj.cn":!0,"xz.cn":!0,"yn.cn":!0,"zj.cn":!0,"com.co":!0,"org.co":!0,"edu.co":!0,"gov.co":!0,"net.co":!0,"mil.co":!0,"nom.co":!0,"ac.cr":!0,"co.cr":!0,"ed.cr":!0,"fi.cr":!0,"go.cr":!0,"or.cr":!0,"sa.cr":!0,cr:!0,"ac.cy":!0,"net.cy":!0,"gov.cy":!0,"org.cy":!0,"pro.cy":!0,"name.cy":!0,"ekloges.cy":!0,"tm.cy":!0,"ltd.cy":!0,"biz.cy":!0,"press.cy":!0,"parliament.cy":!0,"com.cy":!0,"edu.do":!0,"gob.do":!0,"gov.do":!0,"com.do":!0,"sld.do":!0,"org.do":!0,"net.do":!0,"web.do":!0,"mil.do":!0,"art.do":!0,"com.dz":!0,"org.dz":!0,"net.dz":!0,"gov.dz":!0,"edu.dz":!0,"asso.dz":!0,"pol.dz":!0,"art.dz":!0,"com.ec":!0,"info.ec":!0,"net.ec":!0,"fin.ec":!0,"med.ec":!0,"pro.ec":!0,"org.ec":!0,"edu.ec":!0,"gov.ec":!0,"mil.ec":!0,"com.eg":!0,"edu.eg":!0,"eun.eg":!0,"gov.eg":!0,"mil.eg":!0,"name.eg":!0,"net.eg":!0,"org.eg":!0,"sci.eg":!0,"com.er":!0,"edu.er":!0,"gov.er":!0,"mil.er":!0,"net.er":!0,"org.er":!0,"ind.er":!0,"rochest.er":!0,"w.er":!0,"com.es":!0,"nom.es":!0,"org.es":!0,"gob.es":!0,"edu.es":!0,"com.et":!0,"gov.et":!0,"org.et":!0,"edu.et":!0,"net.et":!0,"biz.et":!0,"name.et":!0,"info.et":!0,"ac.fj":!0,"biz.fj":!0,"com.fj":!0,"info.fj":!0,"mil.fj":!0,"name.fj":!0,"net.fj":!0,"org.fj":!0,"pro.fj":!0,"co.fk":!0,"org.fk":!0,"gov.fk":!0,"ac.fk":!0,"nom.fk":!0,"net.fk":!0,fr:!0,"tm.fr":!0,"asso.fr":!0,"nom.fr":!0,"prd.fr":!0,"presse.fr":!0,"com.fr":!0,"gouv.fr":!0,"co.gg":!0,"net.gg":!0,"org.gg":!0,"com.gh":!0,"edu.gh":!0,"gov.gh":!0,"org.gh":!0,"mil.gh":!0,"co.gl":!0,"com.gl":!0,"edu.gl":!0,"net.gl":!0,"org.gl":!0,"com.gn":!0,"ac.gn":!0,"gov.gn":!0,"org.gn":!0,"net.gn":!0,"com.gr":!0,"edu.gr":!0,"net.gr":!0,"org.gr":!0,"gov.gr":!0,"mil.gr":!0,"com.gt":!0,"edu.gt":!0,"net.gt":!0,"gob.gt":!0,"org.gt":!0,"mil.gt":!0,"ind.gt":!0,"com.gu":!0,"net.gu":!0,"gov.gu":!0,"org.gu":!0,"edu.gu":!0,"com.hk":!0,"edu.hk":!0,"gov.hk":!0,"idv.hk":!0,"net.hk":!0,"org.hk":!0,"2000.hu":!0,"agrar.hu":!0,"bolt.hu":!0,"casino.hu":!0,"city.hu":!0,"co.hu":!0,"erotica.hu":!0,"erotika.hu":!0,"film.hu":!0,"forum.hu":!0,"games.hu":!0,"hotel.hu":!0,"info.hu":!0,"ingatlan.hu":!0,"jogasz.hu":!0,"konyvelo.hu":!0,"lakas.hu":!0,"media.hu":!0,"news.hu":!0,"org.hu":!0,"priv.hu":!0,"reklam.hu":!0,"sex.hu":!0,"shop.hu":!0,"sport.hu":!0,"suli.huv":!0,"szex.hu":!0,"tm.hu":!0,"tozsde.hu":!0,"utazas.hu":!0,"video.hu":!0,"ac.id":!0,"co.id":!0,"net.id":!0,"or.id":!0,"web.id":!0,"sch.id":!0,"mil.id":!0,"go.id":!0,"war.net.id":!0,"my.id":!0,"biz.id":!0,"ac.il":!0,"co.il":!0,"org.il":!0,"net.il":!0,"k12.il":!0,"gov.il":!0,"muni.il":!0,"idf.il":!0,in:!0,"4fd.in":!0,"co.in":!0,"firm.in":!0,"net.in":!0,"org.in":!0,"gen.in":!0,"ind.in":!0,"ac.in":!0,"edu.in":!0,"res.in":!0,"ernet.in":!0,"gov.in":!0,"mil.in":!0,"nic.in":!0,iq:!0,"gov.iq":!0,"edu.iq":!0,"com.iq":!0,"mil.iq":!0,"org.iq":!0,"net.iq":!0,ir:!0,"ac.ir":!0,"co.ir":!0,"gov.ir":!0,"id.ir":!0,"net.ir":!0,"org.ir":!0,"sch.ir":!0,"dnssec.ir":!0,"gov.it":!0,"edu.it":!0,"co.je":!0,"net.je":!0,"org.je":!0,"com.jo":!0,"net.jo":!0,"gov.jo":!0,"edu.jo":!0,"org.jo":!0,"mil.jo":!0,"name.jo":!0,"sch.jo":!0,"ac.jp":!0,"ad.jp":!0,"co.jp":!0,"ed.jp":!0,"go.jp":!0,"gr.jp":!0,"lg.jp":!0,"ne.jp":!0,"or.jp":!0,"co.ke":!0,"or.ke":!0,"ne.ke":!0,"go.ke":!0,"ac.ke":!0,"sc.ke":!0,"me.ke":!0,"mobi.ke":!0,"info.ke":!0,"per.kh":!0,"com.kh":!0,"edu.kh":!0,"gov.kh":!0,"mil.kh":!0,"net.kh":!0,"org.kh":!0,"com.ki":!0,"biz.ki":!0,"de.ki":!0,"net.ki":!0,"info.ki":!0,"org.ki":!0,"gov.ki":!0,"edu.ki":!0,"mob.ki":!0,"tel.ki":!0,km:!0,"com.km":!0,"coop.km":!0,"asso.km":!0,"nom.km":!0,"presse.km":!0,"tm.km":!0,"medecin.km":!0,"notaires.km":!0,"pharmaciens.km":!0,"veterinaire.km":!0,"edu.km":!0,"gouv.km":!0,"mil.km":!0,"net.kn":!0,"org.kn":!0,"edu.kn":!0,"gov.kn":!0,kr:!0,"co.kr":!0,"ne.kr":!0,"or.kr":!0,"re.kr":!0,"pe.kr":!0,"go.kr":!0,"mil.kr":!0,"ac.kr":!0,"hs.kr":!0,"ms.kr":!0,"es.kr":!0,"sc.kr":!0,"kg.kr":!0,"seoul.kr":!0,"busan.kr":!0,"daegu.kr":!0,"incheon.kr":!0,"gwangju.kr":!0,"daejeon.kr":!0,"ulsan.kr":!0,"gyeonggi.kr":!0,"gangwon.kr":!0,"chungbuk.kr":!0,"chungnam.kr":!0,"jeonbuk.kr":!0,"jeonnam.kr":!0,"gyeongbuk.kr":!0,"gyeongnam.kr":!0,"jeju.kr":!0,"edu.kw":!0,"com.kw":!0,"net.kw":!0,"org.kw":!0,"gov.kw":!0,"com.ky":!0,"org.ky":!0,"net.ky":!0,"edu.ky":!0,"gov.ky":!0,"com.kz":!0,"edu.kz":!0,"gov.kz":!0,"mil.kz":!0,"net.kz":!0,"org.kz":!0,"com.lb":!0,"edu.lb":!0,"gov.lb":!0,"net.lb":!0,"org.lb":!0,"gov.lk":!0,"sch.lk":!0,"net.lk":!0,"int.lk":!0,"com.lk":!0,"org.lk":!0,"edu.lk":!0,"ngo.lk":!0,"soc.lk":!0,"web.lk":!0,"ltd.lk":!0,"assn.lk":!0,"grp.lk":!0,"hotel.lk":!0,"com.lr":!0,"edu.lr":!0,"gov.lr":!0,"org.lr":!0,"net.lr":!0,"com.lv":!0,"edu.lv":!0,"gov.lv":!0,"org.lv":!0,"mil.lv":!0,"id.lv":!0,"net.lv":!0,"asn.lv":!0,"conf.lv":!0,"com.ly":!0,"net.ly":!0,"gov.ly":!0,"plc.ly":!0,"edu.ly":!0,"sch.ly":!0,"med.ly":!0,"org.ly":!0,"id.ly":!0,ma:!0,"net.ma":!0,"ac.ma":!0,"org.ma":!0,"gov.ma":!0,"press.ma":!0,"co.ma":!0,"tm.mc":!0,"asso.mc":!0,"co.me":!0,"net.me":!0,"org.me":!0,"edu.me":!0,"ac.me":!0,"gov.me":!0,"its.me":!0,"priv.me":!0,"org.mg":!0,"nom.mg":!0,"gov.mg":!0,"prd.mg":!0,"tm.mg":!0,"edu.mg":!0,"mil.mg":!0,"com.mg":!0,"com.mk":!0,"org.mk":!0,"net.mk":!0,"edu.mk":!0,"gov.mk":!0,"inf.mk":!0,"name.mk":!0,"pro.mk":!0,"com.ml":!0,"net.ml":!0,"org.ml":!0,"edu.ml":!0,"gov.ml":!0,"presse.ml":!0,"gov.mn":!0,"edu.mn":!0,"org.mn":!0,"com.mo":!0,"edu.mo":!0,"gov.mo":!0,"net.mo":!0,"org.mo":!0,"com.mt":!0,"org.mt":!0,"net.mt":!0,"edu.mt":!0,"gov.mt":!0,"aero.mv":!0,"biz.mv":!0,"com.mv":!0,"coop.mv":!0,"edu.mv":!0,"gov.mv":!0,"info.mv":!0,"int.mv":!0,"mil.mv":!0,"museum.mv":!0,"name.mv":!0,"net.mv":!0,"org.mv":!0,"pro.mv":!0,"ac.mw":!0,"co.mw":!0,"com.mw":!0,"coop.mw":!0,"edu.mw":!0,"gov.mw":!0,"int.mw":!0,"museum.mw":!0,"net.mw":!0,"org.mw":!0,"com.mx":!0,"net.mx":!0,"org.mx":!0,"edu.mx":!0,"gob.mx":!0,"com.my":!0,"net.my":!0,"org.my":!0,"gov.my":!0,"edu.my":!0,"sch.my":!0,"mil.my":!0,"name.my":!0,"com.nf":!0,"net.nf":!0,"arts.nf":!0,"store.nf":!0,"web.nf":!0,"firm.nf":!0,"info.nf":!0,"other.nf":!0,"per.nf":!0,"rec.nf":!0,"com.ng":!0,"org.ng":!0,"gov.ng":!0,"edu.ng":!0,"net.ng":!0,"sch.ng":!0,"name.ng":!0,"mobi.ng":!0,"biz.ng":!0,"mil.ng":!0,"gob.ni":!0,"co.ni":!0,"com.ni":!0,"ac.ni":!0,"edu.ni":!0,"org.ni":!0,"nom.ni":!0,"net.ni":!0,"mil.ni":!0,"com.np":!0,"edu.np":!0,"gov.np":!0,"org.np":!0,"mil.np":!0,"net.np":!0,"edu.nr":!0,"gov.nr":!0,"biz.nr":!0,"info.nr":!0,"net.nr":!0,"org.nr":!0,"com.nr":!0,"com.om":!0,"co.om":!0,"edu.om":!0,"ac.om":!0,"sch.om":!0,"gov.om":!0,"net.om":!0,"org.om":!0,"mil.om":!0,"museum.om":!0,"biz.om":!0,"pro.om":!0,"med.om":!0,"edu.pe":!0,"gob.pe":!0,"nom.pe":!0,"mil.pe":!0,"sld.pe":!0,"org.pe":!0,"com.pe":!0,"net.pe":!0,"com.ph":!0,"net.ph":!0,"org.ph":!0,"mil.ph":!0,"ngo.ph":!0,"i.ph":!0,"gov.ph":!0,"edu.ph":!0,"com.pk":!0,"net.pk":!0,"edu.pk":!0,"org.pk":!0,"fam.pk":!0,"biz.pk":!0,"web.pk":!0,"gov.pk":!0,"gob.pk":!0,"gok.pk":!0,"gon.pk":!0,"gop.pk":!0,"gos.pk":!0,"pwr.pl":!0,"com.pl":!0,"biz.pl":!0,"net.pl":!0,"art.pl":!0,"edu.pl":!0,"org.pl":!0,"ngo.pl":!0,"gov.pl":!0,"info.pl":!0,"mil.pl":!0,"waw.pl":!0,"warszawa.pl":!0,"wroc.pl":!0,"wroclaw.pl":!0,"krakow.pl":!0,"katowice.pl":!0,"poznan.pl":!0,"lodz.pl":!0,"gda.pl":!0,"gdansk.pl":!0,"slupsk.pl":!0,"radom.pl":!0,"szczecin.pl":!0,"lublin.pl":!0,"bialystok.pl":!0,"olsztyn.pl":!0,"torun.pl":!0,"gorzow.pl":!0,"zgora.pl":!0,"biz.pr":!0,"com.pr":!0,"edu.pr":!0,"gov.pr":!0,"info.pr":!0,"isla.pr":!0,"name.pr":!0,"net.pr":!0,"org.pr":!0,"pro.pr":!0,"est.pr":!0,"prof.pr":!0,"ac.pr":!0,"com.ps":!0,"net.ps":!0,"org.ps":!0,"edu.ps":!0,"gov.ps":!0,"plo.ps":!0,"sec.ps":!0,"co.pw":!0,"ne.pw":!0,"or.pw":!0,"ed.pw":!0,"go.pw":!0,"belau.pw":!0,"arts.ro":!0,"com.ro":!0,"firm.ro":!0,"info.ro":!0,"nom.ro":!0,"nt.ro":!0,"org.ro":!0,"rec.ro":!0,"store.ro":!0,"tm.ro":!0,"www.ro":!0,"co.rs":!0,"org.rs":!0,"edu.rs":!0,"ac.rs":!0,"gov.rs":!0,"in.rs":!0,"com.sb":!0,"net.sb":!0,"edu.sb":!0,"org.sb":!0,"gov.sb":!0,"com.sc":!0,"net.sc":!0,"edu.sc":!0,"gov.sc":!0,"org.sc":!0,"co.sh":!0,"com.sh":!0,"org.sh":!0,"gov.sh":!0,"edu.sh":!0,"net.sh":!0,"nom.sh":!0,"com.sl":!0,"net.sl":!0,"org.sl":!0,"edu.sl":!0,"gov.sl":!0,"gov.st":!0,"saotome.st":!0,"principe.st":!0,"consulado.st":!0,"embaixada.st":!0,"org.st":!0,"edu.st":!0,"net.st":!0,"com.st":!0,"store.st":!0,"mil.st":!0,"co.st":!0,"edu.sv":!0,"gob.sv":!0,"com.sv":!0,"org.sv":!0,"red.sv":!0,"co.sz":!0,"ac.sz":!0,"org.sz":!0,"com.tr":!0,"gen.tr":!0,"org.tr":!0,"biz.tr":!0,"info.tr":!0,"av.tr":!0,"dr.tr":!0,"pol.tr":!0,"bel.tr":!0,"tsk.tr":!0,"bbs.tr":!0,"k12.tr":!0,"edu.tr":!0,"name.tr":!0,"net.tr":!0,"gov.tr":!0,"web.tr":!0,"tel.tr":!0,"tv.tr":!0,"co.tt":!0,"com.tt":!0,"org.tt":!0,"net.tt":!0,"biz.tt":!0,"info.tt":!0,"pro.tt":!0,"int.tt":!0,"coop.tt":!0,"jobs.tt":!0,"mobi.tt":!0,"travel.tt":!0,"museum.tt":!0,"aero.tt":!0,"cat.tt":!0,"tel.tt":!0,"name.tt":!0,"mil.tt":!0,"edu.tt":!0,"gov.tt":!0,"edu.tw":!0,"gov.tw":!0,"mil.tw":!0,"com.tw":!0,"net.tw":!0,"org.tw":!0,"idv.tw":!0,"game.tw":!0,"ebiz.tw":!0,"club.tw":!0,"com.mu":!0,"gov.mu":!0,"net.mu":!0,"org.mu":!0,"ac.mu":!0,"co.mu":!0,"or.mu":!0,"ac.mz":!0,"co.mz":!0,"edu.mz":!0,"org.mz":!0,"gov.mz":!0,"com.na":!0,"co.na":!0,"ac.nz":!0,"co.nz":!0,"cri.nz":!0,"geek.nz":!0,"gen.nz":!0,"govt.nz":!0,"health.nz":!0,"iwi.nz":!0,"maori.nz":!0,"mil.nz":!0,"net.nz":!0,"org.nz":!0,"parliament.nz":!0,"school.nz":!0,"abo.pa":!0,"ac.pa":!0,"com.pa":!0,"edu.pa":!0,"gob.pa":!0,"ing.pa":!0,"med.pa":!0,"net.pa":!0,"nom.pa":!0,"org.pa":!0,"sld.pa":!0,"com.pt":!0,"edu.pt":!0,"gov.pt":!0,"int.pt":!0,"net.pt":!0,"nome.pt":!0,"org.pt":!0,"publ.pt":!0,"com.py":!0,"edu.py":!0,"gov.py":!0,"mil.py":!0,"net.py":!0,"org.py":!0,"com.qa":!0,"edu.qa":!0,"gov.qa":!0,"mil.qa":!0,"net.qa":!0,"org.qa":!0,"asso.re":!0,"com.re":!0,"nom.re":!0,"ac.ru":!0,"adygeya.ru":!0,"altai.ru":!0,"amur.ru":!0,"arkhangelsk.ru":!0,"astrakhan.ru":!0,"bashkiria.ru":!0,"belgorod.ru":!0,"bir.ru":!0,"bryansk.ru":!0,"buryatia.ru":!0,"cbg.ru":!0,"chel.ru":!0,"chelyabinsk.ru":!0,"chita.ru":!0,"chukotka.ru":!0,"chuvashia.ru":!0,"com.ru":!0,"dagestan.ru":!0,"e-burg.ru":!0,"edu.ru":!0,"gov.ru":!0,"grozny.ru":!0,"int.ru":!0,"irkutsk.ru":!0,"ivanovo.ru":!0,"izhevsk.ru":!0,"jar.ru":!0,"joshkar-ola.ru":!0,"kalmykia.ru":!0,"kaluga.ru":!0,"kamchatka.ru":!0,"karelia.ru":!0,"kazan.ru":!0,"kchr.ru":!0,"kemerovo.ru":!0,"khabarovsk.ru":!0,"khakassia.ru":!0,"khv.ru":!0,"kirov.ru":!0,"koenig.ru":!0,"komi.ru":!0,"kostroma.ru":!0,"kranoyarsk.ru":!0,"kuban.ru":!0,"kurgan.ru":!0,"kursk.ru":!0,"lipetsk.ru":!0,"magadan.ru":!0,"mari.ru":!0,"mari-el.ru":!0,"marine.ru":!0,"mil.ru":!0,"mordovia.ru":!0,"mosreg.ru":!0,"msk.ru":!0,"murmansk.ru":!0,"nalchik.ru":!0,"net.ru":!0,"nnov.ru":!0,"nov.ru":!0,"novosibirsk.ru":!0,"nsk.ru":!0,"omsk.ru":!0,"orenburg.ru":!0,"org.ru":!0,"oryol.ru":!0,"penza.ru":!0,"perm.ru":!0,"pp.ru":!0,"pskov.ru":!0,"ptz.ru":!0,"rnd.ru":!0,"ryazan.ru":!0,"sakhalin.ru":!0,"samara.ru":!0,"saratov.ru":!0,"simbirsk.ru":!0,"smolensk.ru":!0,"spb.ru":!0,"stavropol.ru":!0,"stv.ru":!0,"surgut.ru":!0,"tambov.ru":!0,"tatarstan.ru":!0,"tom.ru":!0,"tomsk.ru":!0,"tsaritsyn.ru":!0,"tsk.ru":!0,"tula.ru":!0,"tuva.ru":!0,"tver.ru":!0,"tyumen.ru":!0,"udm.ru":!0,"udmurtia.ru":!0,"ulan-ude.ru":!0,"vladikavkaz.ru":!0,"vladimir.ru":!0,"vladivostok.ru":!0,"volgograd.ru":!0,"vologda.ru":!0,"voronezh.ru":!0,"vrn.ru":!0,"vyatka.ru":!0,"yakutia.ru":!0,"yamal.ru":!0,"yekaterinburg.ru":!0,"yuzhno-sakhalinsk.ru":!0,"ac.rw":!0,"co.rw":!0,"com.rw":!0,"edu.rw":!0,"gouv.rw":!0,"gov.rw":!0,"int.rw":!0,"mil.rw":!0,"net.rw":!0,"com.sa":!0,"edu.sa":!0,"gov.sa":!0,"med.sa":!0,"net.sa":!0,"org.sa":!0,"pub.sa":!0,"sch.sa":!0,"com.sd":!0,"edu.sd":!0,"gov.sd":!0,"info.sd":!0,"med.sd":!0,"net.sd":!0,"org.sd":!0,"tv.sd":!0,"a.se":!0,"ac.se":!0,"b.se":!0,"bd.se":!0,"c.se":!0,"d.se":!0,"e.se":!0,"f.se":!0,"g.se":!0,"h.se":!0,"i.se":!0,"k.se":!0,"l.se":!0,"m.se":!0,"n.se":!0,"o.se":!0,"org.se":!0,"p.se":!0,"parti.se":!0,"pp.se":!0,"press.se":!0,"r.se":!0,"s.se":!0,"t.se":!0,"tm.se":!0,"u.se":!0,"w.se":!0,"x.se":!0,"y.se":!0,"z.se":!0,"com.sg":!0,"edu.sg":!0,"gov.sg":!0,"idn.sg":!0,"net.sg":!0,"org.sg":!0,"per.sg":!0,"art.sn":!0,"com.sn":!0,"edu.sn":!0,"gouv.sn":!0,"org.sn":!0,"perso.sn":!0,"univ.sn":!0,"com.sy":!0,"edu.sy":!0,"gov.sy":!0,"mil.sy":!0,"net.sy":!0,"news.sy":!0,"org.sy":!0,"ac.th":!0,"co.th":!0,"go.th":!0,"in.th":!0,"mi.th":!0,"net.th":!0,"or.th":!0,"ac.tj":!0,"biz.tj":!0,"co.tj":!0,"com.tj":!0,"edu.tj":!0,"go.tj":!0,"gov.tj":!0,"info.tj":!0,"int.tj":!0,"mil.tj":!0,"name.tj":!0,"net.tj":!0,"nic.tj":!0,"org.tj":!0,"test.tj":!0,"web.tj":!0,"agrinet.tn":!0,"com.tn":!0,"defense.tn":!0,"edunet.tn":!0,"ens.tn":!0,"fin.tn":!0,"gov.tn":!0,"ind.tn":!0,"info.tn":!0,"intl.tn":!0,"mincom.tn":!0,"nat.tn":!0,"net.tn":!0,"org.tn":!0,"perso.tn":!0,"rnrt.tn":!0,"rns.tn":!0,"rnu.tn":!0,"tourism.tn":!0,"ac.tz":!0,"co.tz":!0,"go.tz":!0,"ne.tz":!0,"or.tz":!0,"biz.ua":!0,"cherkassy.ua":!0,"chernigov.ua":!0,"chernovtsy.ua":!0,"ck.ua":!0,"cn.ua":!0,"co.ua":!0,"com.ua":!0,"crimea.ua":!0,"cv.ua":!0,"dn.ua":!0,"dnepropetrovsk.ua":!0,"donetsk.ua":!0,"dp.ua":!0,"edu.ua":!0,"gov.ua":!0,"if.ua":!0,"in.ua":!0,"ivano-frankivsk.ua":!0,"kh.ua":!0,"kharkov.ua":!0,"kherson.ua":!0,"khmelnitskiy.ua":!0,"kiev.ua":!0,"kirovograd.ua":!0,"km.ua":!0,"kr.ua":!0,"ks.ua":!0,"kv.ua":!0,"lg.ua":!0,"lugansk.ua":!0,"lutsk.ua":!0,"lviv.ua":!0,"me.ua":!0,"mk.ua":!0,"net.ua":!0,"nikolaev.ua":!0,"od.ua":!0,"odessa.ua":!0,"org.ua":!0,"pl.ua":!0,"poltava.ua":!0,"pp.ua":!0,"rovno.ua":!0,"rv.ua":!0,"sebastopol.ua":!0,"sumy.ua":!0,"te.ua":!0,"ternopil.ua":!0,"uzhgorod.ua":!0,"vinnica.ua":!0,"vn.ua":!0,"zaporizhzhe.ua":!0,"zhitomir.ua":!0,"zp.ua":!0,"zt.ua":!0,"ac.ug":!0,"co.ug":!0,"go.ug":!0,"ne.ug":!0,"or.ug":!0,"org.ug":!0,"sc.ug":!0,"ac.uk":!0,"bl.uk":!0,"british-library.uk":!0,"co.uk":!0,"cym.uk":!0,"gov.uk":!0,"govt.uk":!0,"icnet.uk":!0,"jet.uk":!0,"lea.uk":!0,"ltd.uk":!0,"me.uk":!0,"mil.uk":!0,"mod.uk":!0,"national-library-scotland.uk":!0,"nel.uk":!0,"net.uk":!0,"nhs.uk":!0,"nic.uk":!0,"nls.uk":!0,"org.uk":!0,"orgn.uk":!0,"parliament.uk":!0,"plc.uk":!0,"police.uk":!0,"sch.uk":!0,"scot.uk":!0,"soc.uk":!0,"4fd.us":!0,"dni.us":!0,"fed.us":!0,"isa.us":!0,"kids.us":!0,"nsn.us":!0,"com.uy":!0,"edu.uy":!0,"gub.uy":!0,"mil.uy":!0,"net.uy":!0,"org.uy":!0,"co.ve":!0,"com.ve":!0,"edu.ve":!0,"gob.ve":!0,"info.ve":!0,"mil.ve":!0,"net.ve":!0,"org.ve":!0,"web.ve":!0,"co.vi":!0,"com.vi":!0,"k12.vi":!0,"net.vi":!0,"org.vi":!0,"ac.vn":!0,"biz.vn":!0,"com.vn":!0,"edu.vn":!0,"gov.vn":!0,"health.vn":!0,"info.vn":!0,"int.vn":!0,"name.vn":!0,"net.vn":!0,"org.vn":!0,"pro.vn":!0,"co.ye":!0,"com.ye":!0,"gov.ye":!0,"ltd.ye":!0,"me.ye":!0,"net.ye":!0,"org.ye":!0,"plc.ye":!0,"ac.yu":!0,"co.yu":!0,"edu.yu":!0,"gov.yu":!0,"org.yu":!0,"ac.za":!0,"agric.za":!0,"alt.za":!0,"bourse.za":!0,"city.za":!0,"co.za":!0,"cybernet.za":!0,"db.za":!0,"ecape.school.za":!0,"edu.za":!0,"fs.school.za":!0,"gov.za":!0,"gp.school.za":!0,"grondar.za":!0,"iaccess.za":!0,"imt.za":!0,"inca.za":!0,"kzn.school.za":!0,"landesign.za":!0,"law.za":!0,"lp.school.za":!0,"mil.za":!0,"mpm.school.za":!0,"ncape.school.za":!0,"net.za":!0,"ngo.za":!0,"nis.za":!0,"nom.za":!0,"nw.school.za":!0,"olivetti.za":!0,"org.za":!0,"pix.za":!0,"school.za":!0,"tm.za":!0,"wcape.school.za":!0,"web.za":!0,"ac.zm":!0,"co.zm":!0,"com.zm":!0,"edu.zm":!0,"gov.zm":!0,"net.zm":!0,"org.zm":!0,"sch.zm":!0}});var N=f((ze,ce)=>{ce.exports={ad:!0,ae:!0,af:!0,ag:!0,ai:!0,al:!0,am:!0,ao:!0,aq:!0,ar:!0,as:!0,at:!0,au:!0,aw:!0,ax:!0,az:!0,ba:!0,bb:!0,bd:!0,be:!0,bf:!0,bg:!0,bh:!0,bi:!0,bj:!0,bl:!0,bm:!0,bn:!0,bo:!0,bq:!0,br:!0,bs:!0,bt:!0,bv:!0,bw:!0,by:!0,bz:!0,ca:!0,cc:!0,cd:!0,cf:!0,cg:!0,ch:!0,ci:!0,ck:!0,cl:!0,cm:!0,cn:!0,co:!0,cr:!0,cu:!0,cv:!0,cw:!0,cx:!0,cy:!0,cz:!0,de:!0,dj:!0,dk:!0,dm:!0,do:!0,dz:!0,ec:!0,ee:!0,eg:!0,er:!0,es:!0,et:!0,fi:!0,fj:!0,fk:!0,fm:!0,fo:!0,fr:!0,ga:!0,"gb (.uk)":!0,gd:!0,ge:!0,gf:!0,gg:!0,gh:!0,gi:!0,gl:!0,gm:!0,gn:!0,gp:!0,gq:!0,gr:!0,gs:!0,gt:!0,gu:!0,gw:!0,gy:!0,hk:!0,hm:!0,hn:!0,hr:!0,ht:!0,hu:!0,id:!0,ie:!0,il:!0,im:!0,in:!0,io:!0,iq:!0,ir:!0,is:!0,it:!0,je:!0,jm:!0,jo:!0,jp:!0,ke:!0,kg:!0,kh:!0,ki:!0,km:!0,kn:!0,kp:!0,kr:!0,kw:!0,ky:!0,kz:!0,la:!0,lb:!0,lc:!0,li:!0,lk:!0,lr:!0,ls:!0,lt:!0,lu:!0,lv:!0,ly:!0,ma:!0,mc:!0,md:!0,me:!0,mf:!0,mg:!0,mh:!0,mk:!0,ml:!0,mm:!0,mn:!0,mo:!0,mp:!0,mq:!0,mr:!0,ms:!0,mt:!0,mu:!0,mv:!0,mw:!0,mx:!0,my:!0,mz:!0,na:!0,nc:!0,ne:!0,nf:!0,ng:!0,ni:!0,nl:!0,no:!0,np:!0,nr:!0,nu:!0,nz:!0,om:!0,pa:!0,pe:!0,pf:!0,pg:!0,ph:!0,pk:!0,pl:!0,pm:!0,pn:!0,pr:!0,ps:!0,pt:!0,pw:!0,py:!0,qa:!0,re:!0,ro:!0,rs:!0,ru:!0,rw:!0,sa:!0,sb:!0,sc:!0,sd:!0,se:!0,sg:!0,sh:!0,si:!0,sj:!0,sk:!0,sl:!0,sm:!0,sn:!0,so:!0,sr:!0,ss:!0,st:!0,sv:!0,sx:!0,sy:!0,sz:!0,tc:!0,td:!0,tf:!0,tg:!0,th:!0,tj:!0,tk:!0,tl:!0,tm:!0,tn:!0,to:!0,tr:!0,tt:!0,tv:!0,tw:!0,tz:!0,ua:!0,ug:!0,us:!0,uy:!0,uz:!0,va:!0,vc:!0,ve:!0,vg:!0,vi:!0,vn:!0,vu:!0,wf:!0,ws:!0,ye:!0,yt:!0,za:!0,zm:!0,zw:!0}});var W=f((ye,R)=>{g();var ie=T(),me=V(),ge=N();R.exports=function(e,u){if(typeof e!="string"||(u instanceof Object||(u={}),e=e.toLowerCase(),e.endsWith(".")&&(e=e.slice(0,e.length-1)),u.allowUnicode&&(e=ie.toASCII(e)),e.length>253)||!/^([\u0E00-\u0E7Fa-z0-9-._*]+)$/g.test(e))return!1;if(u.topLevel&&ge[e.replace(/\.$/,"")])return!0;let o=/(.*)\.(([\u0E00-\u0E7Fa-z0-9]+)(\.[a-z0-9]+))/,s=e.match(o),m=null,n=null;return s&&s.length>2&&me[s[2]]&&(m=s[2],n=s[1].split(".")),!n&&(n=e.split("."),n.length<=1||(m=n.pop(),!/^(?:xn--)?(?!^\d+$)[\u0E00-\u0E7Fa-z0-9]+$/gi.test(m)))||u.subdomain===!1&&n.length>1?!1:n.every(function(a,i){if(u.wildcard&&i===0&&a==="*"&&n.length>1)return!0;let l=/^([\u0E00-\u0E7Fa-zA-Z0-9-_]+)$/g;i===n.length-1&&(l=/^([\u0E00-\u0E7Fa-zA-Z0-9-]+)$/g);let d=(a.match(/--(--)?/g)||[]).length,b=(a.match(/xn--/g)||[]).length;return i===n.length-1&&d!==b?!1:l.test(a)&&a.length<64&&!a.startsWith("-")&&!a.endsWith("-")})}});g();var H=K(W(),1);g();g();var w=class{value;next;constructor(e){this.value=e}},v=class{#e;#r;#t;constructor(){this.clear()}enqueue(e){let u=new w(e);this.#e?(this.#r.next=u,this.#r=u):(this.#e=u,this.#r=u),this.#t++}dequeue(){let e=this.#e;if(e)return this.#e=this.#e.next,this.#t--,e.value}clear(){this.#e=void 0,this.#r=void 0,this.#t=0}get size(){return this.#t}*[Symbol.iterator](){let e=this.#e;for(;e;)yield e.value,e=e.next}};g();var D={bind(r,e,u){return r.bind(u)}};function x(r){if(!((Number.isInteger(r)||r===Number.POSITIVE_INFINITY)&&r>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");let e=new v,u=0,t=()=>{u--,e.size>0&&e.dequeue()()},o=async(n,c,a)=>{u++;let i=(async()=>n(...a))();c(i);try{await i}catch{}t()},s=(n,c,a)=>{e.enqueue(D.bind(o.bind(void 0,n,c,a))),(async()=>(await Promise.resolve(),u<r&&e.size>0&&e.dequeue()()))()},m=(n,...c)=>new Promise(a=>{s(n,a,c)});return Object.defineProperties(m,{activeCount:{get:()=>u},pendingCount:{get:()=>e.size},clearQueue:{value(){e.clear()}}}),m}g();function le(r){if(!Number.isInteger(r.Count))throw new Error("MultithreadArrayOptions.Count should be an integer");if(r.Count<=0)throw new Error("MultithreadArrayOptions.Count should be greater than 0")}function P(r,e){le(e);let u=new Array(Math.ceil(r.length/e.Count));for(var t=0;t<u.length;t++)u[t]=r.slice(t===0?t:t*e.Count,(t+1)*e.Count>r.length?r.length:(t+1)*e.Count);return u}var B=typeof unsafeWindow<"u"?unsafeWindow:window,de=r=>{r.forEach(e=>{e.remove()})},pe=r=>{let e=[];return e=r.filter(u=>Number(getComputedStyle(u).getPropertyValue("margin-top").replace("px",""))>10||Array.from(u.children).some(t=>Number(getComputedStyle(t).getPropertyValue("padding-left").replace("px",""))>5&&Number(getComputedStyle(t).getPropertyValue("padding-top").replace("px",""))>5&&Number(getComputedStyle(t).getPropertyValue("padding-right").replace("px",""))>5&&Number(getComputedStyle(t).getPropertyValue("padding-bottom").replace("px",""))>5)),e=e.filter(u=>Array.from(u.querySelectorAll("a,span")).filter(t=>t instanceof HTMLElement&&(0,H.default)((t.innerText.replaceAll(/​ /g,"").match(/^[^/]+(?=\/)?/g)??[""])[0],{allowUnicode:!0,subdomain:!0})).length>=2||Array.from(u.querySelectorAll("*")).filter(t=>t instanceof HTMLElement&&getComputedStyle(t).getPropertyValue("animation-duration")==="1.5s").length>=4),e},be=async()=>{let r=[];r.push(...Array.from(B.document.querySelectorAll('div[class] div[class*=" "]:has(span ~ ul li) ~ div div[class] > div[class] div[class] ~ *[class]'))),r.push(...Array.from(B.document.querySelectorAll('div:not([class*=" "]) div[class] *[class*=" "]')));let e=[],u=x((navigator.hardwareConcurrency??4)<4?4:navigator.hardwareConcurrency),t=[];for(let o of P(r,{Count:2}))t.push(u(()=>pe(o)));e=await Promise.all(t).then(o=>o.flat()),console.debug("[NamuLink:index]: RemovePowerLinkAd:",e),de(e)};location.hostname!=="board.namu.wiki"&&setInterval(be,1500);})();
