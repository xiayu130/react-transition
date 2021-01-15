!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports["react-flip-transition"]=t(require("react")):e["react-flip-transition"]=t(e.React)}(window,(function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){var r=n(11);function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}e.exports=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!=typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var a=i?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(n,u,a):n[u]=e[u]}return n.default=e,t&&t.set(e,n),n}},function(t,n){t.exports=e},function(e,t,n){var r=n(12),o=n(13),i=n(6),u=n(14);e.exports=function(e,t){return r(e)||o(e,t)||i(e,t)||u()}},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t,n){"use strict";var r=n(1),o=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.STATUS=void 0;var i=o(n(4)),u=o(n(3)),a=r(n(2)),c=n(8),f=o(n(19));function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,i.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d,v=function(){};t.STATUS=d,function(e){e.UNMOUNTED="unmounted",e.ENTERED="entered",e.ENTERING="entering",e.LEAVEED="leaveed",e.LEAVEING="leaveing"}(d||(t.STATUS=d={}));var p=function(e){var t=e.name,n=void 0===t?"r":t,r=e.duration,o=void 0===r?200:r,i=e.delay,l=void 0===i?0:i,p=e.animation,y=void 0!==p&&p,m=e.unmount,b=void 0!==m&&m,E=e.onUnmounted,O=void 0===E?v:E,j=e.onEntered,x=void 0===j?v:j,g=e.onEntering,h=void 0===g?v:g,w=e.onLeaveed,P=void 0===w?v:w,_=e.onLeaveing,D=void 0===_?v:_,S=e.leaveDisplayNone,N=void 0!==S&&S,T=e.appear,L=void 0!==T&&T,A=e.children,R=(0,a.useState)(y),M=(0,u.default)(R,2),k=M[0],V=M[1],U=(0,a.useState)((function(){return k?L?d.ENTERED:d.LEAVEED:b?d.UNMOUNTED:d.LEAVEED})),I=(0,u.default)(U,2),C=I[0],G=I[1],F=(0,a.useState)(0),q=(0,u.default)(F,2),W=q[0],$=q[1],B=(0,a.useRef)(!0),H=(0,a.useRef)(A.props.className||""),z=(0,a.useRef)(A.props.style||""),J=(0,a.useRef)((0,f.default)()),K=(0,a.useRef)(new Set([])),Q="undefined"!=typeof window&&window.requestAnimationFrame,X=(0,a.useContext)(c.TransitionsContext),Y=X.prefix,Z=X.animations,ee=X.collection,te=Q?function(e){Q((function(){Q(e)}))}:function(e){setTimeout(e,50)},ne=function(e,t){return setTimeout(t,e)};(0,a.useEffect)((function(){switch(K.current.forEach((function(e){clearTimeout(e)})),K.current.clear(),C){case d.UNMOUNTED:B.current||O(),k&&G(d.LEAVEED);break;case d.LEAVEED:!function(){if(k)te((function(){var e=l,t=ne(e+=W,(function(){G(d.ENTERING)}));K.current.add(t)}));else{P();var t=e._onLeaveed;t&&t(),b&&G(d.UNMOUNTED)}}();break;case d.LEAVEING:!function(){if(D(),k){var e=l,t=ne(e+=W,(function(){G(d.ENTERING)}));K.current.add(t)}else{var n="number"==typeof o?o:o.leave,r=ne(n,(function(){G(d.LEAVEED)}));K.current.add(r)}}();break;case d.ENTERED:!function(){if(x(),k);else{var e=l,t=ne(e+=W,(function(){G(d.LEAVEING)}));K.current.add(t)}}();break;case d.ENTERING:!function(){if(h(),k){var e="number"==typeof o?o:o.enter,t=ne(e,(function(){G(d.ENTERED)}));K.current.add(t)}else{var n=l,r=ne(n+=W,(function(){G(d.LEAVEING)}));K.current.add(r)}}()}B.current=!1}),[C,k]),(0,a.useEffect)((function(){var e=J.current;if(Z[e]){var t=Z[e],n=t.animation,r=t.delay;$(r),V(n)}}),[Z]),(0,a.useEffect)((function(){V(y)}),[y]),(0,a.useEffect)((function(){ee&&ee.push(J.current)}),[]);var re=(0,a.useMemo)((function(){var e=Y||n;switch(C){case d.LEAVEED:return"".concat(e,"-leaveed");case d.LEAVEING:return"".concat(e,"-leaveing");case d.ENTERED:return"".concat(e,"-entered");case d.ENTERING:return"".concat(e,"-entering")}}),[C,Y,n]),oe=(0,a.useMemo)((function(){return C===d.LEAVEED&&N&&!k?{display:"none"}:null}),[N,C,k]);if(C===d.UNMOUNTED)return null;var ie=H.current?"".concat(re," ").concat(H.current):"".concat(re);return a.default.cloneElement(a.default.Children.only(A),{className:ie,style:s(s({},z.current),oe)})};t.default=p},function(e,t,n){var r=n(7);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},function(e,t,n){"use strict";var r=n(1),o=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.TransitionsContext=void 0;var i=o(n(15)),u=o(n(3)),a=r(n(2)),c=a.default.createContext({animations:{},collection:[],prefix:""});t.TransitionsContext=c;var f=function(e){var t=e.masterSwitch,n=void 0!==t&&t,r=e.interval,o=void 0===r?200:r,f=e.prefix,l=void 0===f?"":f,s=e.children,d=(0,a.useState)({}),v=(0,u.default)(d,2),p=v[0],y=v[1],m=(0,a.useRef)([]);return(0,a.useEffect)((function(){var e=(0,i.default)(m.current),t=n?e:e.reverse(),r={},u=0;t.forEach((function(e){r[e]={delay:u*o,animation:n},u+=1})),y(r)}),[n,o]),a.default.createElement(c.Provider,{value:{animations:p,collection:m.current,prefix:l}},s)};t.default=f},function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Flip",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"Flips",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"Observer",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"Transition",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"Transitions",{enumerable:!0,get:function(){return c.default}});var o=r(n(10)),i=r(n(20)),u=r(n(21)),a=r(n(5)),c=r(n(8))},function(e,t,n){"use strict";var r=n(0),o=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n(2)),u=r(n(5)),a=function(e){return e.getBoundingClientRect()},c=function(e){return e.parentNode},f=function(e){var t=e.children,n=e,r=n._inOutDuration,o=n._animation,f=n._onLeaveed,l=n._name,s=(0,i.useRef)(),d=(0,i.useRef)(),v=(0,i.useRef)(),p=(0,i.useRef)(!1),y=function(e,t){var n=a(e),r=a(t);return r.x=n.x-r.x,r.y=n.y-r.y,r};(0,i.useLayoutEffect)((function(){var e,t,n=s.current;if(n&&d.current){var r="".concat(l,"-move"),o=c(n),i=y(o,n),u=d.current,a=i.x-u.x,f=i.y-u.y;if(0===a&&0===f)return;var m=n.style;m.transform=m.webkitTransform="translate(".concat(a,"px,").concat(f,"px)"),m.transitionDuration="0s",v.current=document.body.offsetHeight,e=n,(t=r)&&(t=t.trim())&&e.classList.add(t),m.transform=m.webkitTransform=m.transitionDuration="",p.current=!0,n.addEventListener("transitionend",(function e(t){t&&t.target!==n||t&&!/transform$/.test(t.propertyName)||(n.removeEventListener("transitionend",e),p.current=!1,function(e,t){t&&(t=t.trim())&&(e.classList.remove(t),e.classList.length||e.removeAttribute("class"))}(n,r))}))}}));var m=i.cloneElement(i.Children.only(t),{ref:s});return function(){var e=s.current;if(e){var t=c(e),n=y(t,e);d.current=n,p.current}}(),i.createElement(u.default,{name:l,animation:o,onLeaveed:f,duration:r,unmount:!0},m)};t.default=f},function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,n){var r=n(16),o=n(17),i=n(6),u=n(18);e.exports=function(e){return r(e)||o(e)||i(e)||u()}},function(e,t,n){var r=n(7);e.exports=function(e){if(Array.isArray(e))return r(e)}},function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){var e=new Uint32Array(4);window.crypto.getRandomValues(e);var t=-1;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){t++;var r=e[t>>3]>>t%8*4&15;return("x"==n?r:3&r|8).toString(16)}))};t.default=r},function(e,t,n){"use strict";var r=n(1),o=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n(3)),u=o(n(4)),a=r(n(2));function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var f=function(e){var t=e.inOutDuration,n=void 0===t?200:t,r=e.wrap,o=void 0===r?"div":r,f=e.wrapClass,l=void 0===f?"":f,s=e.name,d=void 0===s?"r":s,v=e.children,p=function(e){x((function(t){return e in t&&delete t[e],function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,u.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t)}))},y=function(e,t){var n,r=Object.create(null);e&&(null===(n=a.Children.map(e,(function(e){return e})))||void 0===n||n.forEach((function(e){var n=e.key||"";n&&(r[n]=a.isValidElement(e)&&t?t(e):e)})));return r},m=function(e,t){var r=y(e),o=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,o=Object.create(null),i=[];for(var u in e)u in t?i.length&&(o[u]=i,i=[]):i.push(u);var a={};for(var c in t){if(o[c])for(r=0;r<o[c].length;r++){var f=o[c][r];a[f]=n(f)}a[c]=n(c)}for(r=0;r<i.length;r++)a[i[r]]=n(i[r]);return a}(t,r);return Object.keys(o).forEach((function(e){var i,u=o[e];if(a.isValidElement(u)){var c=void 0!==r[e],f=void 0!==t[e],l=c&&!f,s=!c&&f,v=c&&f,y=null===(i=t[e])||void 0===i?void 0:i.props;l?o[e]=a.cloneElement(u,{_name:d,_inOutDuration:n,_animation:!0,_onLeave:function(){var e=u.key||"";p(e)}}):s?o[e]=a.cloneElement(u,{_animation:!1}):v&&(o[e]=a.cloneElement(u,{_animation:y._animation,_inOutDuration:y._inOutDuration,_name:y._name,_onLeave:function(){var e=u.key||"";p(e)}}))}})),o},b=(0,a.useRef)(!0),E=(0,a.useState)((function(){return function(e){return y(e,(function(e){return a.cloneElement(e,{_inOutDuration:n,_name:d,_animation:!0,_onLeave:function(){var t=e.key||"";p(t)}})}))}(v)})),O=(0,i.default)(E,2),j=O[0],x=O[1];(0,a.useEffect)((function(){b.current?b.current=!1:x(m(v,j))}),[v]);var g=Object.values(j);if(o){var h=a.createElement(o,{className:l},g);return a.createElement(a.Fragment,null,h)}return a.createElement(a.Fragment,null,g)};t.default=f},function(e,t,n){"use strict";var r=n(1),o=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n(3)),u=o(n(4)),a=r(n(2));function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var f=function(e){var t=e.children,n=e.wrap,r=void 0===n?"":n,o=e.wrapClass,f=void 0===o?"":o,l=function(e,t){var n,r=Object.create(null);e&&(null===(n=a.Children.map(e,(function(e){return e})))||void 0===n||n.forEach((function(e){var n=e.key||"";n&&(r[n]=a.isValidElement(e)&&t?t(e):e)})));return r},s=function(e,t){var n=l(e),r=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,o=Object.create(null),i=[];for(var u in e)u in t?i.length&&(o[u]=i,i=[]):i.push(u);var a={};for(var c in t){if(o[c])for(r=0;r<o[c].length;r++){var f=o[c][r];a[f]=n(f)}a[c]=n(c)}for(r=0;r<i.length;r++)a[i[r]]=n(i[r]);return a}(t,n);return Object.keys(r).forEach((function(e){var o,i=r[e];if(a.isValidElement(i)){var u=void 0!==n[e],c=void 0!==t[e],f=u&&!c,l=!u&&c,s=u&&c,v=null===(o=t[e])||void 0===o?void 0:o.props;f?r[e]=a.cloneElement(i,{animation:!0,_onLeaveed:function(){var e=i.key||"";d(e)}}):l?r[e]=a.cloneElement(i,{animation:!1}):s&&(r[e]=a.cloneElement(i,{animation:v.animation,_onLeaveed:function(){var e=i.key||"";d(e)}}))}})),r},d=function(e){b((function(t){return e in t&&delete t[e],function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,u.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t)}))},v=(0,a.useRef)(!0),p=(0,a.useState)((function(){return function(e){return l(e,(function(e){return a.cloneElement(e,{animation:!0,_onLeaveed:function(){var t=e.key||"";d(t)}})}))}(t)})),y=(0,i.default)(p,2),m=y[0],b=y[1];(0,a.useEffect)((function(){v.current||b(s(t,m)),v.current=!1}),[t]);var E=Object.values(m);if(r){var O=a.createElement(r,{className:f},E);return a.createElement(a.Fragment,null,O)}return a.createElement(a.Fragment,null,E)};t.default=f}])}));
//# sourceMappingURL=main.js.map