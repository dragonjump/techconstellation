(()=>{var e={4912:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>x});var s=r(3379),n=r.n(s),o=r(7795),a=r.n(o),i=r(569),p=r.n(i),c=r(3565),u=r.n(c),d=r(9216),g=r.n(d),l=r(4589),m=r.n(l);const f={};var v={};v.styleTagTransform=m(),v.setAttributes=u(),v.insert=p().bind(null,"head"),v.domAPI=a(),v.insertStyleElement=g(),n()(f,v);const x=f&&f.locals?f.locals:void 0},3379:e=>{"use strict";var t=[];function r(e){for(var r=-1,s=0;s<t.length;s++)if(t[s].identifier===e){r=s;break}return r}function s(e,s){for(var o={},a=[],i=0;i<e.length;i++){var p=e[i],c=s.base?p[0]+s.base:p[0],u=o[c]||0,d="".concat(c," ").concat(u);o[c]=u+1;var g=r(d),l={css:p[1],media:p[2],sourceMap:p[3],supports:p[4],layer:p[5]};if(-1!==g)t[g].references++,t[g].updater(l);else{var m=n(l,s);s.byIndex=i,t.splice(i,0,{identifier:d,updater:m,references:1})}a.push(d)}return a}function n(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,n){var o=s(e=e||[],n=n||{});return function(e){e=e||[];for(var a=0;a<o.length;a++){var i=r(o[a]);t[i].references--}for(var p=s(e,n),c=0;c<o.length;c++){var u=r(o[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}o=p}}},569:e=>{"use strict";var t={};e.exports=function(e,r){var s=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(r)}},9216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},3565:(e,t,r)=>{"use strict";e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},7795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var s="";r.supports&&(s+="@supports (".concat(r.supports,") {")),r.media&&(s+="@media ".concat(r.media," {"));var n=void 0!==r.layer;n&&(s+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),s+=r.css,n&&(s+="}"),r.media&&(s+="}"),r.supports&&(s+="}");var o=r.sourceMap;o&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(s,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},4589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},8367:(e,t,r)=>{"use strict";e.exports=r.p+"images/arrow-icon.svg"},3487:(e,t,r)=>{"use strict";e.exports=r.p+"images/arrow-white-icon.svg"},9318:(e,t,r)=>{"use strict";e.exports=r.p+"images/banner-image-desktop.jpg"},3871:(e,t,r)=>{"use strict";e.exports=r.p+"images/banner-image-mobile.jpg"},6059:(e,t,r)=>{"use strict";e.exports=r.p+"images/company1.svg"},1632:(e,t,r)=>{"use strict";e.exports=r.p+"images/company2.svg"},8982:(e,t,r)=>{"use strict";e.exports=r.p+"images/company3.svg"},3839:(e,t,r)=>{"use strict";e.exports=r.p+"images/existing.svg"},9016:(e,t,r)=>{"use strict";e.exports=r.p+"images/favicon.ico"},7522:(e,t,r)=>{"use strict";e.exports=r.p+"images/first-quadrant-btn-bg.svg"},1459:(e,t,r)=>{"use strict";e.exports=r.p+"images/fourth-quadrant-btn-bg.svg"},7262:(e,t,r)=>{"use strict";e.exports=r.p+"images/image0.png"},7532:(e,t,r)=>{"use strict";e.exports=r.p+"images/moved.svg"},8505:(e,t,r)=>{"use strict";e.exports=r.p+"images/new.svg"},9787:(e,t,r)=>{"use strict";e.exports=r.p+"images/no-change.svg"},914:(e,t,r)=>{"use strict";e.exports=r.p+"images/pdf_banner.png"},3879:(e,t,r)=>{"use strict";e.exports=r.p+"images/search-active-wave.svg"},9462:(e,t,r)=>{"use strict";e.exports=r.p+"images/search-logo-2x.svg"},4196:(e,t,r)=>{"use strict";e.exports=r.p+"images/second-quadrant-btn-bg.svg"},8739:(e,t,r)=>{"use strict";e.exports=r.p+"images/star.svg"},3324:(e,t,r)=>{"use strict";e.exports=r.p+"images/tech-radar-landing-page-wide.png"},6600:(e,t,r)=>{"use strict";e.exports=r.p+"images/third-quadrant-btn-bg.svg"},9333:(e,t,r)=>{"use strict";e.exports=r.p+"images/tw-logo.png"}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/",r.nc=void 0,r(4912),r(3324),r(9333),r(9016),r(9462),r(3871),r(9318),r(7262),r(8505),r(7532),r(3839),r(9787),r(8367),r(7522),r(4196),r(6600),r(1459),r(3487),r(3879),r(8739),r(6059),r(1632),r(8982),r(914)})();