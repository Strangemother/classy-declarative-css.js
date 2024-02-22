document.createElement("span"),(()=>{var e=Math.round,t=parseInt,s=(e,t,s)=>`rgb(${e},${t},${s})`;let r=function(e,t="#000000",s="#FFFFFF"){return e||(d?t:s)},n=function(e){return r(e,s(0,0,0),s(255,255,255))},l=function(e,t,s){let r=e>>t;return s?r&s:r},i=function(e,t,s,r){let n=l(e,t,s);return a(n,r)},o=(e,s)=>a(t(e),s),a=function(t,s){return e(h(t-s))+s},h=function(e){return e*c};var c,d;function u(e,l,i){return c=(d=e<0)?-1*e:e,l.length>7?function(e,r,l){let i=r.split(","),a=n(l),h=a.split(","),c=t(i[0].slice(4)),d=t(i[1]),u=t(i[2]),p=o(h[0].slice(4),c),f=o(h[1],d),g=o(h[2],u);return s(p,f,g)}(0,l,i):function(e,s,n){var l=t(s.slice(1),16),i=r(n).slice(1),o=t(i,16),a=p(l,o,16,0),h=p(l,o,8,255),c=p(l,o,0,255);return`#${(16777216+65536*a+256*h+c).toString(16).slice(1)}`}(0,l,i)}function p(e,t,s,r){let n=l(e,s,r);return i(t,s,r,n)}function f(e,t,s){var r=e<0?-1*e:e,n=Math.round,l=parseInt;if(t.length>7){var i=t.split(","),o=(s||(e<0?"rgb(0,0,0)":"rgb(255,255,255)")).split(","),a=l(i[0].slice(4)),h=l(i[1]),c=l(i[2]);return"rgb("+(n((l(o[0].slice(4))-a)*r)+a)+","+(n((l(o[1])-h)*r)+h)+","+(n((l(o[2])-c)*r)+c)+")"}var d=(i=l(t.slice(1),16))>>16,u=i>>8&255,p=255&i;return"#"+(16777216+65536*(n((((o=l((s||(e<0?"#000000":"#FFFFFF")).slice(1),16))>>16)-d)*r)+d)+256*(n(((o>>8&255)-u)*r)+u)+(n(((255&o)-p)*r)+p)).toString(16).slice(1)}var g="#FF343B",y="#343BFF",S="rgb(234,47,120)",b="rgb(120,99,248)";blendedcolor=u(-.8,S,b),blendedcolor2=f(-.8,S,b),blendedcolor!=blendedcolor2&&console.error("Fault",blendedcolor,blendedcolor2),console.log(blendedcolor,blendedcolor2),blendedcolor=u(-.8,g,y),blendedcolor2=f(-.8,g,y),blendedcolor!=blendedcolor2&&console.error("Fault",blendedcolor,blendedcolor2),console.log(blendedcolor,blendedcolor2)})();class e extends Array{renderAll(){for(let e of this)e.render()}}class t{styleEl=void 0;insertMethod="adopt";constructor(e){this.installAddons(e,this.constructor.addons)}installAddons(e,t){for(let s in t){(0,t[s])(e)}}addStylesheetRules(e,t){return Array.isArray(e)?this.addStylesheetRulesArray(e,t):this.addStylesheetRulesObject(e,t)}getEnsureStyleSheet(e){let t,s=e||this.styleEl;if(null!=s)return s;if("sheet"==this.insertMethod&&(s=document.createElement("style"),document.head.appendChild(s),t=s.sheet),"adopt"==this.insertMethod){const e=new CSSStyleSheet;document.adoptedStyleSheets.push(e),t=e}return null==this.styleEl&&(this.styleEl=t),t}addStylesheetRulesArray(t,s){let r=this.getEnsureStyleSheet(s),n=new e,l=r;for(let e=0;e<t.length;e++){let s=t[e];this.pushResponse(n,l,s)}return n}pushResponse(e,t,s){let r=this.pushArrayRule(t,s);return e.push(r),r}getSheet(e){return this.getEnsureStyleSheet(e)}addStylesheetRulesObject(t,s){let r=this.getEnsureStyleSheet(s),n=new e,l=r;for(let e in t){let s=t[e],r=[e,Object.entries(s)];this.pushResponse(n,l,r)}return n}selectorExists(e,t){let s=this.getEnsureStyleSheet(t);for(let t of s.cssRules)if(e==t.selectorText)return!0;return!1}getRuleBySelector(e,t){let s=this.getEnsureStyleSheet(t);for(let t of s.cssRules)if(e==t.selectorText)return e}pushArrayRule(e,t){let s=this;return{conf:t,styleSheet:e,getPropStr(e){let t=1,r=e=null==e?this.conf:e;return Array.isArray(e[1][0])&&(r=r[1],t=0),s.buildPropStr(r,t)},render(e){let t=this.conf,r=e||this.getPropStr(t),n=t[0],l=s.insertRuleSelectorPropStr(this.styleSheet,n,r);this.sheetRule=this.styleSheet.rules[l],this.rule=l},replace(e){if(!this.sheetRule)return this.render(e);let t=this.sheetRule.cssText,s=`${this.conf[0]} {${null==e?this.getPropStr(this.conf):e}}`;this.styleSheet.replace(`${t} ${s}`)}}}buildPropStr(e,t=1){let s="";for(let r=e.length;t<r;t++){let r=e[t],n=r[0],l=r[1];if(this.isLiteralObject(l))for(let e in l){let t=l[e];s+=this.stringEntry(e,t,l.important)}else s+=this.stringEntry(n,l,null!=r[2])}return s}stringEntry(e,t,s=!1){return`${e}: ${t}${s?" !important":""};\n`}isLiteralObject(e){return!!e&&e.constructor===Object}insertRuleSelectorPropStr(e,t,s){let r=`${t} {${s}}`;return e.insertRule(r,e.cssRules.length)}}t.addons={};class s{sep="-";escapeRegex=/[<>*% #():=.@+?\/]/g;dcss=new t(this);constructor(e){this.conf=e||{},this.translateMap={},!1!==this.conf.addons&&this.installAddons(this.getPreAddons()),this.vendorLocked=null!=e?.vendorLocked&&e.vendorLocked,this.sep=e?.sep||this.sep,this.aliasMap={},this.parentSelector=e?.parentSelector,this.processAliases(this.conf?.aliases)}insertTranslator(e,t){this.translateMap[e]=t}getPreAddons(){return this.constructor.addons}installAddons(e){for(let t in e){(0,e[t])(this)}}generate(e){let t=Object.entries(e?.style||{});for(let[e,s]of t)this.addCamelString(e)}addCamelString(e){let t=function(e,t="-"){return e.replace(/[A-Z]+(?![a-z])|[A-Z]/g,((e,s)=>(s?t:"")+e.toLowerCase()))}(e).split("-");this.addTree(t)}addTree(e,t){let s=this.getRoot(),r=this.nodeWord(),n=[];for(let t of e){n.push(t),s[r]||(s[r]={});let e=s[r][t];null==e&&(e=s[r][t]={key:t,position:n}),s=e}return s.leaf=!0,null!=t&&(s.handler=t),s}nodeWord(){return"n"}getRoot(){return this.graph||(this.graph=this.generateRootGraph()),this.graph}generateRootGraph(){return{[this.nodeWord()]:{},meta:{key:"root",isRoot:!0},key:"root"}}processAliases(e){for(let t in e)this.addAliases(t,e[t])}getPrefixes(){let e=this.conf;return e.prefixes?e.prefixes:e.prefix?[e.prefix]:[]}isVendorPrefixMatch(e,t){t=null==t?this.getPrefixes():t;for(var s=0;s<t.length;s++){let r=t[s];if(e[s]!=r)return!1}return!0}aliasConvert(e){this.conf.prefixes;let t=[];for(let s of e)t.push(this.aliasMap[s]||s);return t}addAliases(e,t){for(let s of t)this.addAlias(e,s)}addAlias(e,t){this.aliasMap[t]=e}objectSplit(e,t=this.sep,s=!0,r=-1){let n,l="string"==typeof e?e.split(t):e,i=this.nodeWord(),o=this.getRoot(),a=0,h=this.aliasConvert(l);if(h.length,this.isVendorPrefixMatch(h))h=h.slice(this.getPrefixes().length);else if(this.vendorLocked)return{props:void 0,values:void 0,str:e,index:r,node:n,valid:!1};for(let e of h)if(n=o[i][e],a+=1,null!=n){if(!0===n.leaf){let e=h[a],t=n[i];if(null==(t&&t[e]))break}o=n}else if(s)break;let c=h.slice(0,a),d=h.slice(a);return{props:c,values:d,str:e,node:n,index:r,valid:n&&d.length>0||!1}}minorCapture(e,t=this.sep,s=!0){let r="string"==typeof e?e.split(t):e,n=this.aliasConvert(r);n.length;let l,i=this.nodeWord(),o=this.getRoot(),a=0;if(this.isVendorPrefixMatch(n))n=n.slice(this.getPrefixes().length);else if(this.vendorLocked)return{props:void 0,values:void 0,str:e,node:l,valid:!1};for(let e of n)if(l=o[i][e],a+=1,null!=l){if(!0===l.leaf){let e=n[a],t=l[i];if(null==(t&&t[e]))break}o=l}else if(s)break;let h=n.slice(0,a),c=n.slice(a);return{props:h,values:c,str:e,node:l,valid:l&&c.length>0||!1}}objectSplitTranslateValue(e,t=this.sep,s=!0){let r=this.objectSplit(e,t,s);return this.translateValue(r)}insertLine(e,t){let s=this.objectSplit(e);return this.insertRule(s,t)}translateValue(e){let t=e.values;return t?.join(" "),this.forwardDigestKeys(e,t).join(" ")}forwardDigestKeys(e,t){let s=!0,r=t||[],n=0,l=[];for(;s;){let t=r[n],i=this.translateMap[t];i?[r,l,n]=i(e,r,l,n):l.push(this.beforeOutStack(r[n],n,e)),n+=1,(n>=r.length||n>100)&&(s=!1)}return l}keyValueFunctions=new Map;beforeOutStack(e,t,s){let r=this.getKeyFunctionMatch(e),n=this.collapseFunctions(r,s);return null==n?e:n}collapseFunctions(e,t){let s;for(var r=e.length-1;r>=0;r--){let n=e[r],l=null==s?n.remainder:s,i=n.handler;s=i&&i(l,n,r,t)||s}return s}getKeyFunctionMatch(e){let t=null!=e,s=e,r=[];for(;t;){let e=this.getKeyFunctionMatchOnce(s);e.success,t=e.match.start>-1,t&&(s=e.remainder,r.push(e))}return r}getKeyFunctionMatchOnce(e,t=".",s=":"){let r=e.lastIndexOf(t),n=e.length,l=e.slice(r+1,n).split(s),i=l[0],o=l.slice(1),a=this.keyValueFunctions.get(i),h={value:e,remainder:e.slice(0,r),handler:a,args:o,match:{start:r,end:n,name:i}};return h.success=null!=a,h}filterClasses(e,t,s=!1){let r=e.classList,n=s?{}:[],l=(e,t,s)=>n.push([s,t]);return s&&(l=(e,t,s)=>n[e]=[s,t]),r.forEach((function(e,s,r){let n=e.split("-")[0];t.indexOf(n)>-1&&l(n,e,s)})),n}filterSplit(e,t,s=!1){let r=this.filterClasses(e,t,s);if(s){let e={};for(let t in r){let s=r[t];e[t]=this.objectSplit(s[1],void 0,void 0,s[0])}return e}let n=[];return r.forEach((e=>{n.push(this.objectSplit(e))})),n}insertRule(e,t=void 0,s=!0){let r=e?.props?.join("-"),n=this.asSelectorString(e,s);if(this.dcss.selectorExists(n))return this.dcss.getRuleBySelector(n);let l={[r]:this.translateValue(e)};t&&Object.assign(l,t);let i={insert:!0},o=e.node?.handler?.bind(e);if(o&&"function"==typeof o){let t=o(e);void 0!==t&&(i=t)}if(!1!==i.insert){let e=this.dcss.addStylesheetRules({[n]:l});return e.renderAll(),e}}insertReceiver(e,t){let s=this.addTree(e);return s.handler=t,s}asSelectorString(e,t=!0){let s;if(Array.isArray(e)){let t=e.join("-");s=this.escapeStr(t)}if("string"==typeof e&&(s=this.escapeStr(e)),e.props){let t=e.props.join("-");s=this.escapeStr(t)}e.str&&(s=this.escapeStr(e.str));let r=`.${s}`;return t?this.prependParent(r,e):r}prependParent(e,t){if(null!=this.parentSelector){return`${this.parentSelector}${e}`}return e}escapeStr(e){return e.replace(this.escapeRegex,"\\$&")}isProperty(e,t=this.sep){return 0==this.objectSplit(e).values.length}isDeclaration(e,t=this.sep){let s=this.objectSplit(e);return s.values.length>0&&s.props.length>0}getCSSText(){let e="",t=this.dcss.getSheet();for(let s of t.rules)e+=`${s.cssText};\n`;return e}captureNew(e,t,s){let r=this;for(let t of e){if(0==t.length)continue;let e=r.objectSplit(t);e.origin=s;let n=e.node?.handler;(n?n.bind(e):r.insertRule.bind(r))(e)}}processOnLoad(e,t=document){if(1==this.domContentLoaded)return this.process(e);(t||e).addEventListener("DOMContentLoaded",function(){this.process(e),this.domContentLoaded=!0}.bind(this))}process(e=document.body){this.getAllClasses(e,!0).forEach(((e,t)=>this.safeInsertMany(t,e)))}safeInsertMany(e,t){let s=0;for(let r of t)this.safeInsertLine(r,e,s++)}safeInsertLine(e,t,s=-1){let r=this.objectSplit(e,void 0,void 0,s);r.valid&&(r.origin=t,this.insertRule(r))}getAllClasses(e=document.body,t=!1,s=!0){let r=function(e){e.classList.forEach((e=>n.add(e)))},n=new Set;return t&&(n=new Map,r=function(e){n.set(e,new Set(e.classList))}),s&&r(e),e.querySelectorAll("*").forEach(r),n}addClass(e,...t){let s=this.asNodes(e);for(let e of s)for(let s of t)for(let t of s.split(" "))e.classList.add(t)}removeClass(e,...t){let s=this.asNodes(e);for(let e of s)e.classList.remove(...t)}asNodes(e){let t=[e];return"string"==typeof e&&(t=document.querySelectorAll(e)),t}}s.addons={};const r=function(e){return e.dataset.polyclassId=function(e){return e.dataset.polyclassId||Math.random().toString(32).slice(2)}(e)},n=function(){const e=document.querySelectorAll("*[polyclass]");console.log("Discovered",e.length);for(let t of e){let e=r(t),s=new a({target:t,isInline:!0});i.set(e,s)}};!function(e=document){e.addEventListener("DOMContentLoaded",function(){n()}.bind(this))}();class l{constructor([e]=[]){this.units=i,console.log("me:",e);let t=new s(e);t.generate(e?.target),this._graph=t;(e instanceof(this?.HTMLElement||function(){})?this.hotLoad:this.loadConfig).bind(this)(e)}hotLoad(e){return console.log("Hotload"),this.loadConfig({target:e,process:!1})}loadConfig(e){if(console.log("load",e),e?.processOnLoad&&this.processOnLoad(e.processOnLoad),e?.target&&0!=e?.process&&this.process(e.target),e?.isInline){!1!==this.getParsedAttrValue("monitor",e.target)&&this._graph.monitor(e.target)}this.innerProxyHandler={reference:this,get(e,t,s){let r=this.reference;if(t in r)return r[t].bind?r[t].bind(r):r[t]},apply(e,t,s){console.log("innerProxyHandler apply...",s)}},this.innerHead=function(e){},this.proxy=new Proxy(this.innerHead,this.innerProxyHandler)}get graph(){return this._graph}get sheet(){return this._graph.dcss}get config(){return this._graph.conf}getParsedAttrValue(e,t,s=void 0){const r=(t=t||this._graph.conf.target).attributes.getNamedItem(e);if(null===r)return s;let n=r.value;if(0==n.length)return s;return JSON.parse(n)}getInstance(e){void 0===e&&(e=this.target);let t=e?.dataset?.polyclassId||e;return i.get(t)}processOnLoad(){return this._graph.processOnLoad.apply(this._graph,arguments)}process(){return this._graph.process.apply(this._graph,arguments)}add(e,t){return this._graph.addTree.apply(this._graph,arguments)}insertReceiver(e,t){return this._graph.addTree.apply(this._graph,arguments)}insertClassProps(e,t){return this._graph.insertLine.apply(this._graph,arguments)}insertRules(e){return this._graph.dcss.addStylesheetRules.apply(this._graph.dcss,arguments)}asString(){return this._graph.getCSSText()}}const i=new Map,o={safeSpace:{units:i},get(e,t,s){let r=this.getInstance();if(t in r){let e=r[t];return e&&e.bind?e.bind(r):e}return this.safeSpace[t]},newInstance(){return console.log("new instance",Array.from(arguments)),new l(Array.from(arguments))},getInstance(){return this._instance||(this._instance=this.newInstance.apply(this,arguments),this.safeSpace.instance=this._instance),this._instance},apply(e,t,s){return console.log("Polyclass apply...",e,t,s),s[0]instanceof HTMLElement?(console.log("Wrapped"),this.newInstance.apply(this,s)):this.getInstance.apply(this,s)}},a=new Proxy((function(){return console.log("new",arguments),o.newInstance.apply(o,arguments)}),o);
