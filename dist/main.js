!function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=0)}([function(n,t,e){"use strict";e.r(t);e(1);const r=document.getElementById("canvas");r.width=localStorage.getItem("canvas-width")?localStorage.getItem("canvas-width"):128,r.height=r.width;const o=r.getContext("2d");o.imageSmoothingEnabled=!1;const a=document.getElementById("color-active");let i=localStorage.getItem("color")?localStorage.getItem("color"):a.value;a.parentElement.style.backgroundColor=i;const l=document.getElementById("color-prev");l.style.backgroundColor=localStorage.getItem("color-previous")?localStorage.getItem("color-previous"):i;const s=Array.from(document.querySelectorAll(".tools__tool")),c=s.pop(),d=Array.from(document.querySelectorAll(".colors__color"));d.shift();let u=512/r.width,p=r.width;const f=document.getElementById("search-input"),h=document.getElementById("load-btn"),g=document.getElementById("size-switcher");g.value=localStorage.getItem("size-switcher-value")?localStorage.getItem("size-switcher-value"):10;const m=document.getElementById("size-switcher-label");switch(g.value){case"10":m.innerHTML="128&times;128";break;case"20":m.innerHTML="256&times;256";break;case"30":m.innerHTML="512&times;512"}const b=document.getElementById("b&w-btn");let x=localStorage.getItem("pixel-picture")?localStorage.getItem("pixel-picture"):null,v=null,w=localStorage.getItem("active-tool")?s[localStorage.getItem("active-tool")]:s[2];w.classList.add("tools__tool_active");const y=document.getElementById("login");let _=null;function k(){o.fillStyle="rgb(128, 128, 128)",o.fillRect(0,0,r.width,r.width)}if(y.addEventListener("click",n=>{n.preventDefault(),null==_?new netlify.default({}).authenticate({provider:"github",scope:"user"},(n,t)=>{_=t.token,n?console.log(n):fetch("https://api.github.com/user",{headers:{Authorization:`token ${_}`}}).then(n=>n.json().then(n=>{y.innerText=`Logged in as ${n.login}`}))}):(_=null,y.innerText="Log in",y.style.backgroundColor="#000000")}),x){const n=new Image;n.src=x,n.onload=()=>{o.drawImage(n,0,0,r.width,r.height)}}else k();function I(n){const t=i;i=n,l.style.backgroundColor=t,a.parentElement.style.backgroundColor=i}function S(n){w.classList.remove("tools__tool_active"),(w=s[n]).classList.add("tools__tool_active")}function E(n){x=x||r.toDataURL(),(v=new Image).src=x,r.width=n,r.height=n,u=512/r.width,p=n,m.innerHTML=`${n}&times;${n}`,o.imageSmoothingEnabled=!1,o.webkitImageSmoothingEnabled=!1,v.onload=()=>{o.drawImage(v,0,0,r.width,r.width)}}function L(n,t,e){o.fillStyle=n,o.fillRect(e,t,1,1)}async function M(n){const t=await fetch(n),e=await t.json();k(),(v=new Image).crossOrigin="Anonymous",v.src=e.urls.small,v.onload=()=>{const[n,t,e]=function(){const n=r.width/v.width,t=r.width/v.height,e=Math.min(n,t);return[(r.width-v.width*e)/2,(r.height-v.height*e)/2,e]}();o.drawImage(v,n,t,v.width*e,v.height*e),x=r.toDataURL()}}g.addEventListener("input",()=>{switch(g.value){case"10":E(128);break;case"20":E(256);break;case"30":E(512)}}),h.addEventListener("click",()=>{const n="https://api.unsplash.com/photos/random?query=town,"+`${f.value}`+"&client_id=7a3d99c5f600e86bde4732a3fa580fa3353b56c7ffe03cd92ee6a9b3da45deec";x=null,k(),M(n)}),b.addEventListener("click",()=>{if(!x)return void alert("upload image first");const n=o.getImageData(0,0,r.width,r.height),{data:t}=n;for(let n=0;n<t.length;n+=4){const e=(t[n]+t[n+1]+t[n+2])/3;t[n]=e,t[n+1]=e,t[n+2]=e}o.putImageData(n,0,0),x=r.toDataURL()}),a.addEventListener("input",()=>{I(a.value)}),s.forEach((n,t)=>{n.addEventListener("click",()=>{S(t)})}),c.addEventListener("click",()=>{k(),x=null}),d.forEach(n=>{n.addEventListener("click",()=>{I(window.getComputedStyle(n.firstElementChild).backgroundColor)})}),document.addEventListener("keypress",n=>{switch(n.code){case"KeyB":S(0);break;case"KeyC":S(1);break;case"KeyP":S(2)}});let C=!1,j=0,R=0;function B(n){if(!C)return;const t=Math.floor(n.offsetX/u),e=Math.floor(n.offsetY/u),r=Math.abs(t-j),o=Math.abs(e-R),a=j<t?1:-1,l=R<e?1:-1;let s=r-o;for(;j>=0&&j<p&&R>=0&&R<p&&(L(i,R,j),j!==t||R!==e);){const n=2*s;n>-o&&(s-=o,j+=a),n<r&&(s+=r,R+=l)}}function z(n,t){const e=o.getImageData(n,t,1,1).data;return`rgb(${e[0]}, ${e[1]}, ${e[2]})`}document.addEventListener("click",n=>{if(w===s[1]&&"canvas"===n.target.id){I(z(Math.floor(n.offsetX/u),Math.floor(n.offsetY/u)))}}),r.addEventListener("mousemove",B),r.addEventListener("mousedown",n=>{w===s[2]?(C=!0,j=Math.floor(n.offsetX/u),R=Math.floor(n.offsetY/u)):w===s[0]&&function(n,t){const e=[[n,t]];let o;const a=z(n,t);if(a!==i)for(;e.length>0;)(o=e.pop())[0]<0||o[0]>r.width||o[1]<0||o[1]>r.width||z(o[0],o[1])===a&&(L(i,o[1],o[0]),e.push([o[0]-1,o[1]]),e.push([o[0]+1,o[1]]),e.push([o[0],o[1]-1]),e.push([o[0],o[1]+1]))}(Math.floor(n.offsetX/u),Math.floor(n.offsetY/u))}),r.addEventListener("mouseup",()=>{x=r.toDataURL(),C=!1}),r.addEventListener("mouseout",n=>{C&&(B(n),x=r.toDataURL()),C=!1}),window.addEventListener("beforeunload",()=>{const n=s.indexOf(w),t=getComputedStyle(l).backgroundColor;x&&localStorage.setItem("pixel-picture",x),localStorage.setItem("canvas-width",r.width),localStorage.setItem("active-tool",n),localStorage.setItem("color",i),localStorage.setItem("size-switcher-value",g.value),localStorage.setItem("color-previous",t)})},function(n,t,e){var r=e(2);"string"==typeof r&&(r=[[n.i,r,""]]);var o={insert:"head",singleton:!1};e(4)(r,o);r.locals&&(n.exports=r.locals)},function(n,t,e){(n.exports=e(3)(!1)).push([n.i,'* {\r\n    margin: 0;\r\n    padding: 0;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n}\r\n  \r\n.header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 20px 0 20px;\r\n    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.header__right {\r\n    display: flex;\r\n}\r\n  \r\n.header__burger-menu {\r\n    width: 20px;\r\n    height: 20px;\r\n    margin-top: 10px;\r\n    margin-right: 35px;\r\n}\r\n  \r\n.header__headline {\r\n    margin-top: 10px;\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 20px;\r\n}\r\n\r\n.netlify-identity__user-name {\r\n    display: block;\r\n    margin-top: 10px;\r\n    margin-right: 10px;\r\n    text-decoration: none;\r\n    font-family: "Roboto", sans-serif;\r\n    color: black;\r\n    font-size: 20px;\r\n}\r\n  \r\n.main {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    width: 100%;\r\n    padding: 80px 100px 0 40px;\r\n}\r\n  \r\n.main__container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\r\n    width: 1400px;\r\n    margin: 0 auto;\r\n}\r\n  \r\n.main__tools-and-colors {\r\n    width: 230px;\r\n}\r\n  \r\n.tools {\r\n    width: 100%;\r\n    margin-bottom: 90px;\r\n    list-style-type: none;\r\n    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.tools__tool {\r\n    display: flex;\r\n    width: 100%;\r\n    height: 55px;\r\n    padding: 10px 0 0 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n.tools__tool:nth-child(2) {\r\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.tools__tool-img {\r\n    width: 25px;\r\n    height: 25px;\r\n    margin-right: 35px;\r\n}\r\n  \r\n.tools__tool-name {\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 15px;\r\n    line-height: 25px;\r\n    color: rgba(0, 0, 0, 0.541327);\r\n}\r\n  \r\n.colors {\r\n    width: 100%;\r\n    list-style-type: none;\r\n    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.colors__color {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    width: 100%;\r\n    height: 55px;\r\n    padding: 10px 0 0 20px;\r\n    cursor: pointer;\r\n}\r\n  \r\n.colors__color:nth-child(2) {\r\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\r\n}\r\n  \r\n.colors__color-circle {\r\n    width: 20px;\r\n    height: 20px;\r\n    margin-top: 5px;\r\n    margin-right: 35px;\r\n    border: 1px solid black;\r\n    border-radius: 100%;\r\n    cursor: pointer;\r\n}\r\n\r\n.colors__color-input {\r\n    display: none;\r\n}\r\n  \r\n.colors__color-name {\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 15px;\r\n    line-height: 25px;\r\n    color: rgba(0, 0, 0, 0.541327);\r\n}\r\n  \r\n.main__canvas {\r\n    width: 512px;\r\n    height: 512px;\r\n    margin-top: 5px;\r\n    image-rendering: pixelated;\r\n    background-color: rgb(128, 128, 128);\r\n}\r\n\r\n.main__size-input {\r\n    display: block;\r\n    width: 300px;\r\n    margin-bottom: 7px;\r\n}\r\n\r\n.main__size-label {\r\n    font-family: "Roboto", sans-serif;\r\n    font-size: 18px;\r\n}\r\n\r\n.search-container {\r\n    display: flex;\r\n}\r\n\r\n.search-container__load-btn {\r\n    width: 65px;\r\n    height: 33px;\r\n    margin-right: 15px;\r\n    padding-top: 3px;\r\n    background-color: #00BCD4;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 3px;\r\n    cursor: pointer;\r\n}\r\n\r\n.search-container__black-white-btn {\r\n    width: 65px;\r\n    height: 33px;\r\n    margin-left: auto;\r\n    padding-top: 3px;\r\n    background-color: #00BCD4;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 3px;\r\n    cursor: pointer;\r\n}\r\n\r\n.search-container__input {\r\n    padding-left: 7px;\r\n}\r\n  \r\n.colors__color-circle_current-color {\r\n    background-color: black;\r\n}\r\n  \r\n.colors__color-circle_prev-color {\r\n    background-color: #41F795;\r\n}\r\n  \r\n.colors__color-circle_red-color {\r\n    background-color: #f74141;\r\n}\r\n  \r\n.colors__color-circle_blue-color {\r\n    background-color: #41B6F7;\r\n}\r\n\r\n.tools__tool_active {\r\n    background-color: #dcdcdc;\r\n}\r\n',""])},function(n,t,e){"use strict";n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var e=function(n,t){var e=n[1]||"",r=n[3];if(!r)return e;if(t&&"function"==typeof btoa){var o=(i=r,l=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(s," */")),a=r.sources.map((function(n){return"/*# sourceURL=".concat(r.sourceRoot).concat(n," */")}));return[e].concat(a).concat([o]).join("\n")}var i,l,s;return[e].join("\n")}(t,n);return t[2]?"@media ".concat(t[2],"{").concat(e,"}"):e})).join("")},t.i=function(n,e){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(var i=0;i<n.length;i++){var l=n[i];null!=l[0]&&r[l[0]]||(e&&!l[2]?l[2]=e:e&&(l[2]="(".concat(l[2],") and (").concat(e,")")),t.push(l))}},t}},function(n,t,e){"use strict";var r,o={},a=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var n={};return function(t){if(void 0===n[t]){var e=document.querySelector(t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}n[t]=e}return n[t]}}();function l(n,t){for(var e=[],r={},o=0;o<n.length;o++){var a=n[o],i=t.base?a[0]+t.base:a[0],l={css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(l):e.push(r[i]={id:i,parts:[l]})}return e}function s(n,t){for(var e=0;e<n.length;e++){var r=n[e],a=o[r.id],i=0;if(a){for(a.refs++;i<a.parts.length;i++)a.parts[i](r.parts[i]);for(;i<r.parts.length;i++)a.parts.push(m(r.parts[i],t))}else{for(var l=[];i<r.parts.length;i++)l.push(m(r.parts[i],t));o[r.id]={id:r.id,refs:1,parts:l}}}}function c(n){var t=document.createElement("style");if(void 0===n.attributes.nonce){var r=e.nc;r&&(n.attributes.nonce=r)}if(Object.keys(n.attributes).forEach((function(e){t.setAttribute(e,n.attributes[e])})),"function"==typeof n.insert)n.insert(t);else{var o=i(n.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}return t}var d,u=(d=[],function(n,t){return d[n]=t,d.filter(Boolean).join("\n")});function p(n,t,e,r){var o=e?"":r.css;if(n.styleSheet)n.styleSheet.cssText=u(t,o);else{var a=document.createTextNode(o),i=n.childNodes;i[t]&&n.removeChild(i[t]),i.length?n.insertBefore(a,i[t]):n.appendChild(a)}}function f(n,t,e){var r=e.css,o=e.media,a=e.sourceMap;if(o&&n.setAttribute("media",o),a&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var h=null,g=0;function m(n,t){var e,r,o;if(t.singleton){var a=g++;e=h||(h=c(t)),r=p.bind(null,e,a,!1),o=p.bind(null,e,a,!0)}else e=c(t),r=f.bind(null,e,t),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)};return r(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return;r(n=t)}else o()}}n.exports=function(n,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a());var e=l(n,t);return s(e,t),function(n){for(var r=[],a=0;a<e.length;a++){var i=e[a],c=o[i.id];c&&(c.refs--,r.push(c))}n&&s(l(n,t),t);for(var d=0;d<r.length;d++){var u=r[d];if(0===u.refs){for(var p=0;p<u.parts.length;p++)u.parts[p]();delete o[u.id]}}}}}]);