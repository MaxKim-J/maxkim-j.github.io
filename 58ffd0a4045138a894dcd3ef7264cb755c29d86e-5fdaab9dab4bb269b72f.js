(self.webpackChunkmax_kim_tech_blog=self.webpackChunkmax_kim_tech_blog||[]).push([[173],{6061:function(r){"use strict";var t="%[a-f0-9]{2}",e=new RegExp(t,"gi"),n=new RegExp("("+t+")+","gi");function o(r,t){try{return decodeURIComponent(r.join(""))}catch(a){}if(1===r.length)return r;t=t||1;var e=r.slice(0,t),n=r.slice(t);return Array.prototype.concat.call([],o(e),o(n))}function a(r){try{return decodeURIComponent(r)}catch(a){for(var t=r.match(e),n=1;n<t.length;n++)t=(r=o(t,n).join("")).match(e);return r}}r.exports=function(r){if("string"!=typeof r)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof r+"`");try{return r=r.replace(/\+/g," "),decodeURIComponent(r)}catch(t){return function(r){for(var e={"%FE%FF":"��","%FF%FE":"��"},o=n.exec(r);o;){try{e[o[0]]=decodeURIComponent(o[0])}catch(t){var i=a(o[0]);i!==o[0]&&(e[o[0]]=i)}o=n.exec(r)}e["%C2"]="�";for(var u=Object.keys(e),c=0;c<u.length;c++){var s=u[c];r=r.replace(new RegExp(s,"g"),e[s])}return r}(r)}}},7033:function(r){"use strict";r.exports=function(r,t){for(var e={},n=Object.keys(r),o=Array.isArray(t),a=0;a<n.length;a++){var i=n[a],u=r[i];(o?-1!==t.indexOf(i):t(i,u,r))&&(e[i]=u)}return e}},2953:function(r,t,e){"use strict";var n=e(8626),o=e(2142),a=e(3270);function i(r,t){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=function(r,t){if(!r)return;if("string"==typeof r)return u(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);"Object"===e&&r.constructor&&(e=r.constructor.name);if("Map"===e||"Set"===e)return Array.from(r);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return u(r,t)}(r))||t&&r&&"number"==typeof r.length){e&&(r=e);var n=0,o=function(){};return{s:o,n:function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}},e:function(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){e=e.call(r)},n:function(){var r=e.next();return i=r.done,r},e:function(r){c=!0,a=r},f:function(){try{i||null==e.return||e.return()}finally{if(c)throw a}}}}function u(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}var c=e(2129),s=e(6061),l=e(2716),f=e(7033),p=Symbol("encodeFragmentIdentifier");function y(r){if("string"!=typeof r||1!==r.length)throw new TypeError("arrayFormatSeparator must be single character string")}function d(r,t){return t.encode?t.strict?c(r):encodeURIComponent(r):r}function m(r,t){return t.decode?s(r):r}function v(r){return Array.isArray(r)?r.sort():"object"==typeof r?v(Object.keys(r)).sort((function(r,t){return Number(r)-Number(t)})).map((function(t){return r[t]})):r}function g(r){var t=r.indexOf("#");return-1!==t&&(r=r.slice(0,t)),r}function b(r){var t=(r=g(r)).indexOf("?");return-1===t?"":r.slice(t+1)}function x(r,t){return t.parseNumbers&&!Number.isNaN(Number(r))&&"string"==typeof r&&""!==r.trim()?r=Number(r):!t.parseBooleans||null===r||"true"!==r.toLowerCase()&&"false"!==r.toLowerCase()||(r="true"===r.toLowerCase()),r}function h(r,t){y((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);var e=function(r){var t;switch(r.arrayFormat){case"index":return function(r,e,n){t=/\[(\d*)\]$/.exec(r),r=r.replace(/\[\d*\]$/,""),t?(void 0===n[r]&&(n[r]={}),n[r][t[1]]=e):n[r]=e};case"bracket":return function(r,e,n){t=/(\[\])$/.exec(r),r=r.replace(/\[\]$/,""),t?void 0!==n[r]?n[r]=[].concat(n[r],e):n[r]=[e]:n[r]=e};case"colon-list-separator":return function(r,e,n){t=/(:list)$/.exec(r),r=r.replace(/:list$/,""),t?void 0!==n[r]?n[r]=[].concat(n[r],e):n[r]=[e]:n[r]=e};case"comma":case"separator":return function(t,e,n){var o="string"==typeof e&&e.includes(r.arrayFormatSeparator),a="string"==typeof e&&!o&&m(e,r).includes(r.arrayFormatSeparator);e=a?m(e,r):e;var i=o||a?e.split(r.arrayFormatSeparator).map((function(t){return m(t,r)})):null===e?e:m(e,r);n[t]=i};case"bracket-separator":return function(t,e,n){var o=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),o){var a=null===e?[]:e.split(r.arrayFormatSeparator).map((function(t){return m(t,r)}));void 0!==n[t]?n[t]=[].concat(n[t],a):n[t]=a}else n[t]=e?m(e,r):e};default:return function(r,t,e){void 0!==e[r]?e[r]=[].concat(e[r],t):e[r]=t}}}(t),n=Object.create(null);if("string"!=typeof r)return n;if(!(r=r.trim().replace(/^[?#&]/,"")))return n;var a,u=i(r.split("&"));try{for(u.s();!(a=u.n()).done;){var c=a.value;if(""!==c){var s=l(t.decode?c.replace(/\+/g," "):c,"="),f=o(s,2),p=f[0],d=f[1];d=void 0===d?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?d:m(d,t),e(m(p,t),d,n)}}}catch(E){u.e(E)}finally{u.f()}for(var g=0,b=Object.keys(n);g<b.length;g++){var h=b[g],j=n[h];if("object"==typeof j&&null!==j)for(var k=0,S=Object.keys(j);k<S.length;k++){var w=S[k];j[w]=x(j[w],t)}else n[h]=x(j,t)}return!1===t.sort?n:(!0===t.sort?Object.keys(n).sort():Object.keys(n).sort(t.sort)).reduce((function(r,t){var e=n[t];return Boolean(e)&&"object"==typeof e&&!Array.isArray(e)?r[t]=v(e):r[t]=e,r}),Object.create(null))}t.extract=b,t.parse=h,t.stringify=function(r,t){if(!r)return"";y((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);for(var e=function(e){return t.skipNull&&null==r[e]||t.skipEmptyString&&""===r[e]},n=function(r){switch(r.arrayFormat){case"index":return function(t){return function(e,n){var o=e.length;return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(a(e),null===n?[[d(t,r),"[",o,"]"].join("")]:[[d(t,r),"[",d(o,r),"]=",d(n,r)].join("")])}};case"bracket":return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(a(e),null===n?[[d(t,r),"[]"].join("")]:[[d(t,r),"[]=",d(n,r)].join("")])}};case"colon-list-separator":return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(a(e),null===n?[[d(t,r),":list="].join("")]:[[d(t,r),":list=",d(n,r)].join("")])}};case"comma":case"separator":case"bracket-separator":var t="bracket-separator"===r.arrayFormat?"[]=":"=";return function(e){return function(n,o){return void 0===o||r.skipNull&&null===o||r.skipEmptyString&&""===o?n:(o=null===o?"":o,0===n.length?[[d(e,r),t,d(o,r)].join("")]:[[n,d(o,r)].join(r.arrayFormatSeparator)])}};default:return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(a(e),null===n?[d(t,r)]:[[d(t,r),"=",d(n,r)].join("")])}}}}(t),o={},i=0,u=Object.keys(r);i<u.length;i++){var c=u[i];e(c)||(o[c]=r[c])}var s=Object.keys(o);return!1!==t.sort&&s.sort(t.sort),s.map((function(e){var o=r[e];return void 0===o?"":null===o?d(e,t):Array.isArray(o)?0===o.length&&"bracket-separator"===t.arrayFormat?d(e,t)+"[]":o.reduce(n(e),[]).join("&"):d(e,t)+"="+d(o,t)})).filter((function(r){return r.length>0})).join("&")},t.parseUrl=function(r,t){t=Object.assign({decode:!0},t);var e=l(r,"#"),n=o(e,2),a=n[0],i=n[1];return Object.assign({url:a.split("?")[0]||"",query:h(b(r),t)},t&&t.parseFragmentIdentifier&&i?{fragmentIdentifier:m(i,t)}:{})},t.stringifyUrl=function(r,e){e=Object.assign(n({encode:!0,strict:!0},p,!0),e);var o=g(r.url).split("?")[0]||"",a=t.extract(r.url),i=t.parse(a,{sort:!1}),u=Object.assign(i,r.query),c=t.stringify(u,e);c&&(c="?".concat(c));var s=function(r){var t="",e=r.indexOf("#");return-1!==e&&(t=r.slice(e)),t}(r.url);return r.fragmentIdentifier&&(s="#".concat(e[p]?d(r.fragmentIdentifier,e):r.fragmentIdentifier)),"".concat(o).concat(c).concat(s)},t.pick=function(r,e,o){o=Object.assign(n({parseFragmentIdentifier:!0},p,!1),o);var a=t.parseUrl(r,o),i=a.url,u=a.query,c=a.fragmentIdentifier;return t.stringifyUrl({url:i,query:f(u,e),fragmentIdentifier:c},o)},t.exclude=function(r,e,n){var o=Array.isArray(e)?function(r){return!e.includes(r)}:function(r,t){return!e(r,t)};return t.pick(r,o,n)}},2716:function(r){"use strict";r.exports=function(r,t){if("string"!=typeof r||"string"!=typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[r];var e=r.indexOf(t);return-1===e?[r]:[r.slice(0,e),r.slice(e+t.length)]}},2129:function(r){"use strict";r.exports=function(r){return encodeURIComponent(r).replace(/[!'()*]/g,(function(r){return"%".concat(r.charCodeAt(0).toString(16).toUpperCase())}))}},4021:function(r,t,e){"use strict";e.d(t,{Z:function(){return s}});var n=e(959),o=e(6069);var a=function(r){var t=r.id,e=r.frontmatter,a=r.lang,i=e.title,u=e.date,c=e.description,s=e.slug;return n.createElement("li",{className:"drpl8i1"},n.createElement(o.rU,{to:"ko"===a?"/posts/"+s:"/"+a+"/posts/"+s,key:t},n.createElement("span",{className:"drpl8i2"},i),n.createElement("span",{className:"drpl8i3"},u," - ",c)))},i=e(823),u=e(1637),c=e(6294);var s=function(r){var t=r.postList,e=(0,u.$G)().t,o=(0,i.v)((function(r){return r.category})),s=(0,c.Xi)((function(r){return r.lang})),l=t.filter((function(r){var t=r.frontmatter;return"all"===o?null!==t.category:t.category===o}));return n.createElement("ol",{className:"_1scttw60","aria-label":e("포스트 목록")},l.length?l.map((function(r){var t=r.id,e=r.frontmatter,o=r.slug;return n.createElement(a,{lang:s,key:t,id:t,slug:o,frontmatter:e})})):n.createElement("div",null,"No post"))}},823:function(r,t,e){"use strict";e.d(t,{m:function(){return a},v:function(){return u}});var n=e(5226),o=e(2953),a=["all","tech","essay","culture"],i=function(){var r=("undefined"!=typeof window?(0,o.parse)(location.search):{}).category,t=Array.isArray(r)?r[0]:r;return function(r){return a.includes(r)}(t)?t:null},u=(0,n.Ue)((function(r){var t;return{category:null!==(t=i())&&void 0!==t?t:"all",setCategory:function(t){r((function(){return{category:t}}))}}}))},3126:function(r,t,e){var n=e(3347);r.exports=function(r){if(Array.isArray(r))return n(r)},r.exports.__esModule=!0,r.exports.default=r.exports},8626:function(r,t,e){var n=e(4219);r.exports=function(r,t,e){return(t=n(t))in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r},r.exports.__esModule=!0,r.exports.default=r.exports},6952:function(r){r.exports=function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)},r.exports.__esModule=!0,r.exports.default=r.exports},8513:function(r){r.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},r.exports.__esModule=!0,r.exports.default=r.exports},3270:function(r,t,e){var n=e(3126),o=e(6952),a=e(1079),i=e(8513);r.exports=function(r){return n(r)||o(r)||a(r)||i()},r.exports.__esModule=!0,r.exports.default=r.exports},7187:function(r,t,e){var n=e(5259).default;r.exports=function(r,t){if("object"!=n(r)||!r)return r;var e=r[Symbol.toPrimitive];if(void 0!==e){var o=e.call(r,t||"default");if("object"!=n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(r)},r.exports.__esModule=!0,r.exports.default=r.exports},4219:function(r,t,e){var n=e(5259).default,o=e(7187);r.exports=function(r){var t=o(r,"string");return"symbol"==n(t)?t:String(t)},r.exports.__esModule=!0,r.exports.default=r.exports},5259:function(r){function t(e){return r.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},r.exports.__esModule=!0,r.exports.default=r.exports,t(e)}r.exports=t,r.exports.__esModule=!0,r.exports.default=r.exports}}]);
//# sourceMappingURL=58ffd0a4045138a894dcd3ef7264cb755c29d86e-5fdaab9dab4bb269b72f.js.map