!function(n){var t={};function r(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,t){if(1&t&&(n=r(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)r.d(e,o,function(t){return n[t]}.bind(null,o));return e},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){"use strict";r.r(t);r(1);const e=document.getElementById("canvas");e.width=localStorage.getItem("canvas-width")?localStorage.getItem("canvas-width"):128,e.height=e.width;const o=e.getContext("2d");o.imageSmoothingEnabled=!1;const i=document.getElementById("color-active");let a=localStorage.getItem("color")?localStorage.getItem("color"):i.value;i.parentElement.style.backgroundColor=a;const l=document.getElementById("color-prev");l.style.backgroundColor=localStorage.getItem("color-previous")?localStorage.getItem("color-previous"):a;const s=Array.from(document.querySelectorAll(".tools__tool")),c=s.pop(),d=Array.from(document.querySelectorAll(".colors__color"));d.shift();let p=512/e.width,u=e.width;const f=document.getElementById("search-input"),g=document.getElementById("load-btn"),h=document.getElementById("size-switcher");h.value=localStorage.getItem("size-switcher-value")?localStorage.getItem("size-switcher-value"):10;const m=document.getElementById("size-switcher-label");switch(h.value){case"10":m.innerHTML="128&times;128";break;case"20":m.innerHTML="256&times;256";break;case"30":m.innerHTML="512&times;512"}const b=document.getElementById("b&w-btn");let x=localStorage.getItem("pixel-picture")?localStorage.getItem("pixel-picture"):null,y=null,w=localStorage.getItem("active-tool")?s[localStorage.getItem("active-tool")]:s[2];function v(){o.fillStyle="rgb(128, 128, 128)",o.fillRect(0,0,e.width,e.width)}if(w.classList.add("tools__tool_active"),window.netlifyIdentity.on("login",()=>{console.log(window.netlifyIdentity.currentUser()),fetch("https://api.github.com/user",{headers:{Authorization:`token ${window.netlifyIdentity.currentUser().token}`}}).then(n=>console.log(n)),document.getElementById("user-name").style.display="block",document.getElementById("user-name").innerHTML=window.netlifyIdentity.currentUser().user_metadata.full_name}),window.netlifyIdentity.on("init",()=>{window.netlifyIdentity.currentUser()&&(document.getElementById("user-name").style.display="block",document.getElementById("user-name").innerHTML=window.netlifyIdentity.currentUser().user_metadata.full_name)}),window.netlifyIdentity.on("logout",()=>{document.getElementById("user-name").style.display="none"}),x){const n=new Image;n.src=x,n.onload=()=>{o.drawImage(n,0,0,e.width,e.height)}}else v();function _(n){const t=a;a=n,l.style.backgroundColor=t,i.parentElement.style.backgroundColor=a}function k(n){w.classList.remove("tools__tool_active"),(w=s[n]).classList.add("tools__tool_active")}function I(n){x=x||e.toDataURL(),(y=new Image).src=x,e.width=n,e.height=n,p=512/e.width,u=n,m.innerHTML=`${n}&times;${n}`,o.imageSmoothingEnabled=!1,o.webkitImageSmoothingEnabled=!1,y.onload=()=>{o.drawImage(y,0,0,e.width,e.width)}}function E(n,t,r){o.fillStyle=n,o.fillRect(r,t,1,1)}async function S(n){const t=await fetch(n),r=await t.json();v(),(y=new Image).crossOrigin="Anonymous",y.src=r.urls.small,y.onload=()=>{const[n,t,r]=function(){const n=e.width/y.width,t=e.width/y.height,r=Math.min(n,t);return[(e.width-y.width*r)/2,(e.height-y.height*r)/2,r]}();o.drawImage(y,n,t,y.width*r,y.height*r),x=e.toDataURL()}}h.addEventListener("input",()=>{switch(h.value){case"10":I(128);break;case"20":I(256);break;case"30":I(512)}}),g.addEventListener("click",()=>{const n="https://api.unsplash.com/photos/random?query=town,"+`${f.value}`+"&client_id=7a3d99c5f600e86bde4732a3fa580fa3353b56c7ffe03cd92ee6a9b3da45deec";x=null,v(),S(n)}),b.addEventListener("click",()=>{if(!x)return void alert("upload image first");const n=o.getImageData(0,0,e.width,e.height),{data:t}=n;for(let n=0;n<t.length;n+=4){const r=(t[n]+t[n+1]+t[n+2])/3;t[n]=r,t[n+1]=r,t[n+2]=r}o.putImageData(n,0,0),x=e.toDataURL()}),i.addEventListener("input",()=>{_(i.value)}),s.forEach((n,t)=>{n.addEventListener("click",()=>{k(t)})}),c.addEventListener("click",()=>{v(),x=null}),d.forEach(n=>{n.addEventListener("click",()=>{_(window.getComputedStyle(n.firstElementChild).backgroundColor)})}),document.addEventListener("keypress",n=>{switch(n.code){case"KeyB":k(0);break;case"KeyC":k(1);break;case"KeyP":k(2)}});let L=!1,M=0,C=0;function j(n){if(!L)return;const t=Math.floor(n.offsetX/p),r=Math.floor(n.offsetY/p),e=Math.abs(t-M),o=Math.abs(r-C),i=M<t?1:-1,l=C<r?1:-1;let s=e-o;for(;M>=0&&M<u&&C>=0&&C<u&&(E(a,C,M),M!==t||C!==r);){const n=2*s;n>-o&&(s-=o,M+=i),n<e&&(s+=e,C+=l)}}function R(n,t){const r=o.getImageData(n,t,1,1).data;return`rgb(${r[0]}, ${r[1]}, ${r[2]})`}document.addEventListener("click",n=>{if(w===s[1]&&"canvas"===n.target.id){_(R(Math.floor(n.offsetX/p),Math.floor(n.offsetY/p)))}}),e.addEventListener("mousemove",j),e.addEventListener("mousedown",n=>{w===s[2]?(L=!0,M=Math.floor(n.offsetX/p),C=Math.floor(n.offsetY/p)):w===s[0]&&function(n,t){const r=[[n,t]];let o;const i=R(n,t);if(i!==a)for(;r.length>0;)(o=r.pop())[0]<0||o[0]>e.width||o[1]<0||o[1]>e.width||R(o[0],o[1])===i&&(E(a,o[1],o[0]),r.push([o[0]-1,o[1]]),r.push([o[0]+1,o[1]]),r.push([o[0],o[1]-1]),r.push([o[0],o[1]+1]))}(Math.floor(n.offsetX/p),Math.floor(n.offsetY/p))}),e.addEventListener("mouseup",()=>{x=e.toDataURL(),L=!1}),e.addEventListener("mouseout",n=>{L&&(j(n),x=e.toDataURL()),L=!1}),window.addEventListener("beforeunload",()=>{const n=s.indexOf(w),t=getComputedStyle(l).backgroundColor;x&&localStorage.setItem("pixel-picture",x),localStorage.setItem("canvas-width",e.width),localStorage.setItem("active-tool",n),localStorage.setItem("color",a),localStorage.setItem("size-switcher-value",h.value),localStorage.setItem("color-previous",t)})},function(n,t,r){var e=r(2);"string"==typeof e&&(e=[[n.i,e,""]]);var o={insert:"head",singleton:!1};r(4)(e,o);e.locals&&(n.exports=e.locals)},function(n,t,r){(n.exports=r(3)(!1)).push([n.i,'* {\r\n    margin: 0;\r\n    padding: 0;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n}\r\n  \r\n.header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 20px 0 20px;\r\n    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.header__right {\r\n    display: flex;\r\n}\r\n  \r\n.header__burger-menu {\r\n    width: 20px;\r\n    height: 20px;\r\n    margin-top: 10px;\r\n    margin-right: 35px;\r\n}\r\n  \r\n.header__headline {\r\n    margin-top: 10px;\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 20px;\r\n}\r\n\r\n.netlify-identity {\r\n    display: flex;\r\n}\r\n\r\n.netlify-identity-menu {\r\n    display: flex;\r\n    margin-top: 5px;\r\n    list-style-type: none;\r\n}\r\n\r\n.netlify-identity-signup {\r\n    display: block;\r\n    width: 100px;\r\n    height: 40px;\r\n    margin-right: 15px;\r\n    padding-top: 10px;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    font-family: "Roboto", sans-serif;\r\n    background-color: dimgrey;\r\n    color: white;\r\n    border-radius: 4px;\r\n}\r\n\r\n.netlify-identity-logout {\r\n    display: block;\r\n    width: 100px;\r\n    height: 40px;\r\n    margin-right: 15px;\r\n    padding-top: 10px;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    font-family: "Roboto", sans-serif;\r\n    background-color: dimgrey;\r\n    color: white;\r\n    border-radius: 4px;\r\n}\r\n\r\n.netlify-identity-user-details {\r\n    display: none;\r\n}\r\n\r\n.netlify-identity__user-name {\r\n    display: none;\r\n    margin-top: 10px;\r\n    margin-right: 10px;\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 20px;\r\n}\r\n\r\n.netlify-identity-login {\r\n    display: block;\r\n    width: 100px;\r\n    height: 40px;\r\n    padding-top: 10px;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    font-family: "Roboto", sans-serif;\r\n    background-color: dimgrey;\r\n    color: white;\r\n    border-radius: 4px;\r\n}\r\n  \r\n.main {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    width: 100%;\r\n    padding: 80px 100px 0 40px;\r\n}\r\n  \r\n.main__container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\r\n    width: 1400px;\r\n    margin: 0 auto;\r\n}\r\n  \r\n.main__tools-and-colors {\r\n    width: 230px;\r\n}\r\n  \r\n.tools {\r\n    width: 100%;\r\n    margin-bottom: 90px;\r\n    list-style-type: none;\r\n    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.tools__tool {\r\n    display: flex;\r\n    width: 100%;\r\n    height: 55px;\r\n    padding: 10px 0 0 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n.tools__tool:nth-child(2) {\r\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.tools__tool-img {\r\n    width: 25px;\r\n    height: 25px;\r\n    margin-right: 35px;\r\n}\r\n  \r\n.tools__tool-name {\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 15px;\r\n    line-height: 25px;\r\n    color: rgba(0, 0, 0, 0.541327);\r\n}\r\n  \r\n.colors {\r\n    width: 100%;\r\n    list-style-type: none;\r\n    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.colors__color {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    width: 100%;\r\n    height: 55px;\r\n    padding: 10px 0 0 20px;\r\n    cursor: pointer;\r\n}\r\n  \r\n.colors__color:nth-child(2) {\r\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.colors__color-circle {\r\n    width: 20px;\r\n    height: 20px;\r\n    margin-top: 5px;\r\n    margin-right: 35px;\r\n    border: 1px solid black;\r\n    border-radius: 100%;\r\n    cursor: pointer;\r\n}\r\n\r\n.colors__color-input {\r\n    display: none;\r\n}\r\n  \r\n.colors__color-name {\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 15px;\r\n    line-height: 25px;\r\n    color: rgba(0, 0, 0, 0.541327);\r\n}\r\n  \r\n.main__canvas {\r\n    width: 512px;\r\n    height: 512px;\r\n    margin-top: 5px;\r\n    image-rendering: pixelated;\r\n    background-color: rgb(128, 128, 128);\r\n}\r\n\r\n.main__size-input {\r\n    display: block;\r\n    width: 300px;\r\n    margin-bottom: 7px;\r\n}\r\n\r\n.main__size-label {\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 18px;\r\n}\r\n\r\n.search-container {\r\n    display: flex;\r\n}\r\n\r\n.search-container__load-btn {\r\n    width: 65px;\r\n    height: 33px;\r\n    margin-right: 15px;\r\n    padding-top: 3px;\r\n    background-color: #00BCD4;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 3px;\r\n    cursor: pointer;\r\n}\r\n\r\n.search-container__black-white-btn {\r\n    width: 65px;\r\n    height: 33px;\r\n    margin-left: auto;\r\n    padding-top: 3px;\r\n    background-color: #00BCD4;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 3px;\r\n    cursor: pointer;\r\n}\r\n\r\n.search-container__input {\r\n    padding-left: 7px;\r\n}\r\n  \r\n.colors__color-circle_current-color {\r\n    background-color: black;\r\n}\r\n  \r\n.colors__color-circle_prev-color {\r\n    background-color: #41F795;\r\n}\r\n  \r\n.colors__color-circle_red-color {\r\n    background-color: #f74141;\r\n}\r\n  \r\n.colors__color-circle_blue-color {\r\n    background-color: #41B6F7;\r\n}\r\n\r\n.tools__tool_active {\r\n    background-color: #dcdcdc;\r\n}\r\n',""])},function(n,t,r){"use strict";n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var r=function(n,t){var r=n[1]||"",e=n[3];if(!e)return r;if(t&&"function"==typeof btoa){var o=(a=e,l=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(s," */")),i=e.sources.map((function(n){return"/*# sourceURL=".concat(e.sourceRoot).concat(n," */")}));return[r].concat(i).concat([o]).join("\n")}var a,l,s;return[r].join("\n")}(t,n);return t[2]?"@media ".concat(t[2],"{").concat(r,"}"):r})).join("")},t.i=function(n,r){"string"==typeof n&&(n=[[null,n,""]]);for(var e={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(e[i]=!0)}for(var a=0;a<n.length;a++){var l=n[a];null!=l[0]&&e[l[0]]||(r&&!l[2]?l[2]=r:r&&(l[2]="(".concat(l[2],") and (").concat(r,")")),t.push(l))}},t}},function(n,t,r){"use strict";var e,o={},i=function(){return void 0===e&&(e=Boolean(window&&document&&document.all&&!window.atob)),e},a=function(){var n={};return function(t){if(void 0===n[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}n[t]=r}return n[t]}}();function l(n,t){for(var r=[],e={},o=0;o<n.length;o++){var i=n[o],a=t.base?i[0]+t.base:i[0],l={css:i[1],media:i[2],sourceMap:i[3]};e[a]?e[a].parts.push(l):r.push(e[a]={id:a,parts:[l]})}return r}function s(n,t){for(var r=0;r<n.length;r++){var e=n[r],i=o[e.id],a=0;if(i){for(i.refs++;a<i.parts.length;a++)i.parts[a](e.parts[a]);for(;a<e.parts.length;a++)i.parts.push(m(e.parts[a],t))}else{for(var l=[];a<e.parts.length;a++)l.push(m(e.parts[a],t));o[e.id]={id:e.id,refs:1,parts:l}}}}function c(n){var t=document.createElement("style");if(void 0===n.attributes.nonce){var e=r.nc;e&&(n.attributes.nonce=e)}if(Object.keys(n.attributes).forEach((function(r){t.setAttribute(r,n.attributes[r])})),"function"==typeof n.insert)n.insert(t);else{var o=a(n.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}return t}var d,p=(d=[],function(n,t){return d[n]=t,d.filter(Boolean).join("\n")});function u(n,t,r,e){var o=r?"":e.css;if(n.styleSheet)n.styleSheet.cssText=p(t,o);else{var i=document.createTextNode(o),a=n.childNodes;a[t]&&n.removeChild(a[t]),a.length?n.insertBefore(i,a[t]):n.appendChild(i)}}function f(n,t,r){var e=r.css,o=r.media,i=r.sourceMap;if(o&&n.setAttribute("media",o),i&&btoa&&(e+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}var g=null,h=0;function m(n,t){var r,e,o;if(t.singleton){var i=h++;r=g||(g=c(t)),e=u.bind(null,r,i,!1),o=u.bind(null,r,i,!0)}else r=c(t),e=f.bind(null,r,t),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(r)};return e(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return;e(n=t)}else o()}}n.exports=function(n,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i());var r=l(n,t);return s(r,t),function(n){for(var e=[],i=0;i<r.length;i++){var a=r[i],c=o[a.id];c&&(c.refs--,e.push(c))}n&&s(l(n,t),t);for(var d=0;d<e.length;d++){var p=e[d];if(0===p.refs){for(var u=0;u<p.parts.length;u++)p.parts[u]();delete o[p.id]}}}}}]);