!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){!function(){"use strict";const t=io("https://pixel1.herokuapp.com/");let n={sendPixelData:function(e){t.emit("pixel data",e)},getSocketObject:function(){return t}};e.exports=n}()},function(e,t,n){"use strict";n.r(t);n(2);var o=n(0),r=n.n(o);!function(){const e=r.a.getSocketObject(),t=document.querySelector("#canvas");t.width=500,t.height=500;let n=25;const o=t.getContext("2d");o.lineWidth=n,o.lineCap="round",o.lineJoin="round";function i(e){o.lineWidth=e.pixelSize,o.strokeStyle=e.color,o.beginPath(),o.moveTo(e.x,e.y),o.lineTo(e.x+.001,e.y+.001),o.stroke(),o.closePath()}document.querySelector("#brushSize").addEventListener("input",(function(e){let t=document.querySelector("#currentBrushSize"),o=e.target.value;t.textContent=o,n=o})),t.addEventListener("mousemove",(function(e){let o=(c=t,a=e,u=c.getBoundingClientRect(),{x:a.clientX-u.left,y:a.clientY-u.top});var c,a,u;o.color=window.app.color,o.pixelSize=n,i(o),r.a.sendPixelData(o)})),t.addEventListener("touchmove",(function(e){e.target==t&&e.preventDefault();var n=e.touches[0],o=new MouseEvent("mousemove",{clientX:n.clientX,clientY:n.clientY});t.dispatchEvent(o)})),e.on("transmit pixel data",(function(e){i(e.pixelData)}))}()},function(e,t){!function(){"use strict";Pickr.create({el:".color-picker",theme:"classic",inline:!0,showAlways:!0,useAsButton:!0,swatches:["rgba(244, 67, 54, 1)","rgba(233, 30, 99, 1)","rgba(156, 39, 176, 1)","rgba(103, 58, 183, 1)","rgba(63, 81, 181, 1)","rgba(33, 150, 243, 1)","rgba(3, 169, 244, 1)","rgba(0, 188, 212, 1)","rgba(0, 150, 136, 1)","rgba(76, 175, 80, 1)","rgba(139, 195, 74, 1)","rgba(205, 220, 57, 1)","rgba(255, 235, 59, 1)","rgba(255, 193, 7, 1)"],components:{preview:!0,hue:!0,interaction:{hex:!0,rgba:!0,hsla:!0,hsva:!0,cmyk:!0,input:!0}}}).on("change",(function(e){let t=e.toHEXA().toString();window.app.color=t})),window.app=window.app||{},window.app.color="#42445A"}()}]);