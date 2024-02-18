class e extends Array{renderAll(){for(let e of this)e.render()}}class t{styleEl=void 0;insertMethod="adopt";constructor(e){this.installAddons(e,this.constructor.addons)}installAddons(e,t){for(let s in t){(0,t[s])(e)}}addStylesheetRules(e,t){return Array.isArray(e)?this.addStylesheetRulesArray(e,t):this.addStylesheetRulesObject(e,t)}getEnsureStyleSheet(e){let t,s=e||this.styleEl;if(null!=s)return s;if("sheet"==this.insertMethod&&(s=document.createElement("style"),document.head.appendChild(s),t=s.sheet),"adopt"==this.insertMethod){const e=new CSSStyleSheet;document.adoptedStyleSheets.push(e),t=e}return null==this.styleEl&&(this.styleEl=t),t}addStylesheetRulesArray(t,s){let n=this.getEnsureStyleSheet(s),r=new e,i=n;for(let e=0;e<t.length;e++){let s=t[e];this.pushResponse(r,i,s)}return r}pushResponse(e,t,s){let n=this.pushArrayRule(t,s);return e.push(n),n}getSheet(e){return this.getEnsureStyleSheet(e)}addStylesheetRulesObject(t,s){let n=this.getEnsureStyleSheet(s),r=new e,i=n;for(let e in t){let s=t[e],n=[e,Object.entries(s)];this.pushResponse(r,i,n)}return r}selectorExists(e,t){let s=this.getEnsureStyleSheet(t);for(let t of s.cssRules)if(e==t.selectorText)return!0;return!1}getRuleBySelector(e,t){let s=this.getEnsureStyleSheet(t);for(let t of s.cssRules)if(e==t.selectorText)return e}pushArrayRule(e,t){let s=this;return{conf:t,styleSheet:e,getPropStr(e){let t=1,n=e=null==e?this.conf:e;return Array.isArray(e[1][0])&&(n=n[1],t=0),s.buildPropStr(n,t)},render(e){let t=this.conf,n=e||this.getPropStr(t),r=t[0],i=s.insertRuleSelectorPropStr(this.styleSheet,r,n);this.sheetRule=this.styleSheet.rules[i],this.rule=i},replace(e){if(!this.sheetRule)return this.render(e);let t=this.sheetRule.cssText,s=`${this.conf[0]} {${null==e?this.getPropStr(this.conf):e}}`;this.styleSheet.replace(`${t} ${s}`)}}}buildPropStr(e,t=1){let s="";for(let n=e.length;t<n;t++){let n=e[t],r=n[0],i=n[1];if(this.isLiteralObject(i))for(let e in i){let t=i[e];s+=this.stringEntry(e,t,i.important)}else s+=this.stringEntry(r,i,null!=n[2])}return s}stringEntry(e,t,s=!1){return`${e}: ${t}${s?" !important":""};\n`}isLiteralObject(e){return!!e&&e.constructor===Object}insertRuleSelectorPropStr(e,t,s){let n=`${t} {${s}}`;return e.insertRule(n,e.cssRules.length)}}t.addons={};class s{sep="-";escapeRegex=/[<>*%#()=.@+?\/]/g;dcss=new t(this);constructor(e){this.conf=e||{},this.translateMap={},!1!==this.conf.addons&&this.installAddons(this.getPreAddons()),this.vendorLocked=null!=e?.vendorLocked&&e.vendorLocked,this.sep=e?.sep||this.sep,this.aliasMap={},this.parentSelector=e?.parentSelector,this.processAliases(this.conf?.aliases)}insertTranslator(e,t){this.translateMap[e]=t}getPreAddons(){return this.constructor.addons}installAddons(e){for(let t in e){(0,e[t])(this)}}generate(e){e=e||this?.document?.body;let t=Object.entries(e?.style||{});for(let[e,s]of t)this.addCamelString(e)}addCamelString(e){let t=function(e,t="-"){return e.replace(/[A-Z]+(?![a-z])|[A-Z]/g,((e,s)=>(s?t:"")+e.toLowerCase()))}(e).split("-");this.addTree(t)}addTree(e,t){let s=this.getRoot(),n=this.nodeWord(),r=[];for(let t of e){r.push(t),s[n]||(s[n]={});let e=s[n][t];null==e&&(e=s[n][t]={key:t,position:r}),s=e}return s.leaf=!0,null!=t&&(s.handler=t),s}nodeWord(){return"n"}getRoot(){return this.graph||(this.graph={[this.nodeWord()]:{},meta:{key:"root",isRoot:!0},key:"root"}),this.graph}processAliases(e){for(let t in e)this.addAliases(t,e[t])}getPrefixes(){let e=this.conf;return e.prefixes?e.prefixes:e.prefix?[e.prefix]:[]}isVendorPrefixMatch(e,t){t=null==t?this.getPrefixes():t;for(var s=0;s<t.length;s++){let n=t[s];if(e[s]!=n)return!1}return!0}aliasConvert(e){this.conf.prefixes;let t=[];for(let s of e)t.push(this.aliasMap[s]||s);return t}addAliases(e,t){for(let s of t)this.addAlias(e,s)}addAlias(e,t){this.aliasMap[t]=e}objectSplit(e,t=this.sep,s=!0){let n,r="string"==typeof e?e.split(t):e,i=this.nodeWord(),l=this.getRoot(),o=0,a=this.aliasConvert(r);if(a.length,this.isVendorPrefixMatch(a))a=a.slice(this.getPrefixes().length);else if(this.vendorLocked)return{props:void 0,values:void 0,str:e,node:n,valid:!1};for(let e of a)if(n=l[i][e],o+=1,null!=n){if(!0===n.leaf){let e=a[o],t=n[i];if(null==(t&&t[e]))break}l=n}else if(s)break;let c=a.slice(0,o),h=a.slice(o);return{props:c,values:h,str:e,node:n,valid:n&&h.length>0||!1}}objectSplitTranslateValue(e,t=this.sep,s=!0){let n=this.objectSplit(e,t,s);return this.translateValue(n)}insertLine(e,t){let s=this.objectSplit(e);return this.insertRule(s,t)}translateValue(e){let t=e.values;return t?.join(" "),this.forwardDigestKeys(e,t).join(" ")}forwardDigestKeys(e,t){let s=!0,n=t||[],r=0,i=[];for(;s;){let t=n[r],l=this.translateMap[t];l?[n,i,r]=l(e,n,i,r):i.push(n[r]),r+=1,(r>=n.length||r>100)&&(s=!1)}return i}insertRule(e,t=void 0,s=!0){let n=e?.props?.join("-"),r=this.asSelectorString(e,s);if(this.dcss.selectorExists(r))return this.dcss.getRuleBySelector(r);let i={[n]:this.translateValue(e)};t&&Object.assign(i,t);let l={insert:!0},o=e.node?.handler?.bind(e);if(o&&"function"==typeof o){let t=o(e);void 0!==t&&(l=t)}if(!1!==l.insert){let e=this.dcss.addStylesheetRules({[r]:i});return e.renderAll(),e}}insertReceiver(e,t){let s=this.addTree(e);return s.handler=t,s}asSelectorString(e,t=!0){let s;if(Array.isArray(e)){let t=e.join("-");s=this.escapeStr(t)}if("string"==typeof e&&(s=this.escapeStr(e)),e.props){let t=e.props.join("-");s=this.escapeStr(t)}e.str&&(s=this.escapeStr(e.str));let n=`.${s}`;return t?this.prependParent(n,e):n}prependParent(e,t){if(null!=this.parentSelector){return`${this.parentSelector}${e}`}return e}escapeStr(e){return e.replace(this.escapeRegex,"\\$&")}isProperty(e,t=this.sep){return 0==this.objectSplit(e).values.length}isDeclaration(e,t=this.sep){let s=this.objectSplit(e);return s.values.length>0&&s.props.length>0}getCSSText(){let e="",t=this.dcss.getSheet();for(let s of t.rules)e+=`${s.cssText};\n`;return e}captureNew(e,t,s){let n=this;for(let t of e){if(0==t.length)continue;let e=n.objectSplit(t);e.origin=s;let r=e.node?.handler;(r?r.bind(e):n.insertRule.bind(n))(e)}}processOnLoad(e,t=document){if(1==this.domContentLoaded)return this.process(e);(t||e).addEventListener("DOMContentLoaded",function(){this.process(e),this.domContentLoaded=!0}.bind(this))}process(e=document.body){this.getAllClasses(e,!0).forEach(((e,t)=>this.safeInsertMany(t,e)))}safeInsertMany(e,t){for(let s of t)this.safeInsertLine(s,e)}safeInsertLine(e,t){let s=this.objectSplit(e);s.valid&&(s.origin=t,this.insertRule(s))}getAllClasses(e=document.body,t=!1,s=!0){let n=function(e){e.classList.forEach((e=>r.add(e)))},r=new Set;return t&&(r=new Map,n=function(e){r.set(e,new Set(e.classList))}),s&&n(e),e.querySelectorAll("*").forEach(n),r}addClass(e,...t){let s=this.asNodes(e);for(let e of s)for(let s of t)for(let t of s.split(" "))e.classList.add(t)}removeClass(e,...t){let s=this.asNodes(e);for(let e of s)e.classList.remove(...t)}asNodes(e){let t=[e];return"string"==typeof e&&(t=document.querySelectorAll(e)),t}}s.addons={};const n=function(e){return e.dataset.polyclassId=function(e){return e.dataset.polyclassId||Math.random().toString(32).slice(2)}(e)},r=function(){const e=document.querySelectorAll("*[polyclass]");console.log("Discovered",e.length);for(let t of e){let e=n(t),s=new a({target:t,isInline:!0});l.set(e,s)}};!function(e=this?.document){e?.addEventListener("DOMContentLoaded",function(){r()}.bind(this))}();class i{constructor([e]=[]){this.units=l,console.log("me:",e);let t=new s(e);t.generate(),this._graph=t;(e instanceof(this?.HTMLElement||function(){})?this.hotLoad:this.loadConfig).bind(this)(e)}hotLoad(e){console.log("Hotload"),this.loadConfig({target:e,process:!1})}loadConfig(e){if(console.log("load",e),e?.processOnLoad&&this.processOnLoad(e.processOnLoad),e?.target&&0!=e?.process&&this.process(e.target),e?.isInline){!1!==this.getParsedAttrValue("monitor",e.target)&&this._graph.monitor(e.target)}this.innerProxyHandler={reference:this,get(e,t,s){let n=this.reference;if(t in n)return n[t].bind?n[t].bind(n):n[t]},apply(e,t,s){console.log("innerProxyHandler apply...",s)}},this.innerHead=function(e){},this.proxy=new Proxy(this.innerHead,this.innerProxyHandler)}get graph(){return this._graph}get sheet(){return this._graph.dcss}get config(){return this._graph.conf}getParsedAttrValue(e,t,s=void 0){const n=(t=t||this._graph.conf.target).attributes.getNamedItem(e);if(null===n)return s;let r=n.value;if(0==r.length)return s;return JSON.parse(r)}getInstance(e){void 0===e&&(e=this.target);let t=e?.dataset?.polyclassId||e;return l.get(t)}processOnLoad(){return this._graph.processOnLoad.apply(this._graph,arguments)}process(){return this._graph.process.apply(this._graph,arguments)}add(e,t){return this._graph.addTree.apply(this._graph,arguments)}insertReceiver(e,t){return this._graph.addTree.apply(this._graph,arguments)}insertClassProps(e,t){return this._graph.insertLine.apply(this._graph,arguments)}insertRules(e){return this._graph.dcss.addStylesheetRules.apply(this._graph.dcss,arguments)}asString(){return this._graph.getCSSText()}}const l=new Map,o={safeSpace:{units:l},get(e,t,s){let n=this.getInstance();return t in n?n[t]&&n[t].bind?n[t].bind(n):n[t]:this.safeSpace[t]},newInstance(){return console.log("new instance",Array.from(arguments)),new i(Array.from(arguments))},getInstance(){return this._instance||(this._instance=this.newInstance.apply(this,arguments),this.safeSpace.instance=this._instance),this._instance},apply(e,t,s){return console.log("Polyclass apply...",e,t,s),s[0]instanceof HTMLElement?(console.log("Wrapped"),this.newInstance.apply(this,s)):this.getInstance.apply(this,s)}},a=new Proxy((function(){return console.log("new",arguments),o.newInstance.apply(o,arguments)}),o);(function(){return null!=this?.window})()&&(window.Polyclass=a),function(){let e;const t=function(e,t){values=e.values;let[s,...r]=e.values;if(void 0!==document[`on${s}`]){const t=e.origin;n(e,t,s,r)}else console.warn("Unknown action",s)},n=function(e,t,s,n){t.addEventListener(s,(e=>r(e,s,n)))},r=function(e,t,s){let[n,...r]=s;console.log(e,t,s),console.log(n,r);let i={call(){},toggle(){console.log(r,s,t),e.currentTarget.classList.toggle(r.join("-"))}}[n];i&&i()};console.log("event receiver"),s.addons.varTranslateReceiver=function(s){e=s,e.insertReceiver(["event"],t)}}(),function(){let e;const s=function(e){const t=e.values;let s=o(t),r=i(t,s);h(r).forEach((e=>document.head.appendChild(e))),n(s)},n=function(t){for(let s of Object.values(t)){let t=s.first,n=(e,t)=>t?" ":"",i=r(t.replace(/[+]/g,n));console.log("Installing Font",i),s.cleanName=i,s.definition=l(s),e.dcss.addStylesheetRules(s.definition).renderAll()}},r=function(e){return e.replace(/(^|[\s+])\S/g,(function(e){return e.toUpperCase()}))},i=function(e,t){t=t||o(e);return Object.values(t).flatMap((e=>function(e){return`family=${e.str}`}(e))).join("&")},l=function(t){let s={};const n=e.asSelectorString.bind(e);for(let e of Object.values(t.tokens)){let r={"font-weight":e.int,"font-family":`'${t.cleanName}', sans-serif`},i=["font",t.first];for(let t of e.keys){let e=Object.assign({},r);t.isItal&&(e["font-style"]="italic");let l=i.concat([t.token]);s[`${n(l)}, ${n(l).toLowerCase()}`]=e}}let r=n(["font",t.first]),i=n(["font"].concat(t.first.split("+"))),l=new Set([r,i,r.toLowerCase(),i.toLowerCase()]);return s[Array.from(l).join(", ")]={"font-family":`'${t.cleanName}', sans-serif`},s},o=function(e){let t,s=0,n={},r=/([a-zA-Z-]{0,}?)(\d+)/;for(let i in e){let l=e[i];if(0==s){n[s]={first:l,tokens:{}},t=s,s++;continue}let[o,a]=[null,null];try{let e;[e,o,a]=l.match(r),0==o.length&&(o="r")}catch{n[s]={first:l,tokens:{}},t=s,s++;continue}let c={null:function(){return{regu:1,wasNull:1}},i:function(){return{ital:1}},r:function(){return{regu:1}}},h={int:Number(a)};if(0==h.int){console.warn("Skipping zero weighted item"),s++;continue}for(let e in o){let t=c[o[e]];Object.assign(h,t())}let u=n[t]?.tokens[a]||{};Object.assign(u,h),null==u.keys&&(u.keys=new Set),u.keys.add({isItal:h.ital,token:l}),n[t].tokens[a]=u,s++}return a(n)},a=function(e){for(let t in e){let s=e[t];0!=s.first.length&&c(s)}return e},c=function(e){let t=r(e.first),s=function(e){return 0==Object.values(e.tokens).length&&(e.tokens[400]={int:400,regu:1,keys:new Set([{isItal:void 0,token:"400"}])}),Object.values(e.tokens)}(e),n=Object.assign({},...s),i=null!=n.ital,l=[],o=new Set;i&&l.push("ital"),(i||n.regu)&&l.push("wght");for(let t in e.tokens){let s=e.tokens[t],n=s.ital?1:0,r=s.int,l=i?[n]:[];l.push(r);let a=l.join(",");if(o.add(a),null!=s.regu){let e=i?[0]:[];e.push(r);let t=e.join(",");o.add(t)}}let a=Array.from(o).sort(),c=a.join(";"),h=`${t}:${l.join(",")}@${c}`;Object.assign(e,{weights:a,formatStringParts:l,titleToken:t,str:h})},h=function(e){return[d("link","preconnect",{href:"https://fonts.googleapis.com"}),d("link","preconnect",{href:"https://fonts.gstatic.com",crossorigin:""}),d("link","stylesheet",{href:`https://fonts.googleapis.com/css2?${e}&display=swap`})]};let u={};const d=function(e,t,s){let n={rel:t,href:e};Object.assign(n,s||{});let r=JSON.stringify,i=u[r(n)];return i||(u[r(n)]=f("link",n))},f=function(e,t){if(null==t&&"string"!=typeof e&&null==(e=(t=e).localName))throw Error("createNode requires a localName within a object definition");let s=document.createElement(e);for(let e in t)s.setAttribute(e,t[e]);return s};t.addons.fontPackReceiver=function(t){e=t,e.insertReceiver(["font","pack"],s)}}(),(()=>{let e;const t=function(e){console.log("monitorClasses",e);let t=function(e){"class"==e.attributeName&&n(e)},s=new MutationObserver((function(e){e.forEach(t)}));return s.observe(e,{attributes:!0,subtree:!0,attributeFilter:["class"],attributeOldValue:!0}),s},n=function(t){let s=t.target.classList.value,n=t.oldValue,i=s.split(" "),l=n.split(" ").map((e=>e.trim())),o=l?r(i,l):i;console.log("new",o),e.captureNew(o,void 0,t.target)},r=function(e,t){const s=new Set(e);for(const e of t)s.delete(e);return s};s.addons.monitorClasses=function(t){e=t},s.prototype.monitor=function(e=document.body){return t(e)}})(),function(){let e,t;const n=function(s,n=":root"){if(console.log("Hook",s),null==t){let r={};for(let e in s){let t=`--${e}`,n=s[e];r[t]=n}let i=e.dcss.addStylesheetRules({[n]:r});i.renderAll(),t=i[0],e.varsRoot=t}else for(let e in s){let n=`--${e}`,r=s[e];t.sheetRule.style.setProperty(n,r)}};s.addons.varsReceiver=function(s){e=s,e.vars=n.bind(e),e.varsRoot=t}}(),function(){let e;const t=function(e,t,s,n){let r=t.slice(n).slice(1),i=`var(--${r.join("-")})`;return s.push(i),[[],s,n+r.length]};console.log("var-translate insertReceiver"),s.addons.varTranslateReceiver=function(s){e=s,e.insertTranslator("var",t)}}();
