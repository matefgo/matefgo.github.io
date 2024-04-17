var B=Object.defineProperty;var _=(i,t,e)=>t in i?B(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var u=(i,t,e)=>(_(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();const q=new WeakMap;function $(i,t,e,s){if(!i&&!q.has(t))return!1;const n=q.get(t)??new WeakMap;q.set(t,n);const o=n.get(e)??new Set;n.set(e,o);const r=o.has(s);return i?o.add(s):o.delete(s),r&&i}function K(i,t){let e=i.target;if(e instanceof Text&&(e=e.parentElement),e instanceof Element&&i.currentTarget instanceof Element){const s=e.closest(t);if(s&&i.currentTarget.contains(s))return s}}function Q(i,t,e,s={}){const{signal:n,base:o=document}=s;if(n!=null&&n.aborted)return;const{once:r,...a}=s,c=o instanceof Document?o.documentElement:o,l=!!(typeof s=="object"?s.capture:s),h=m=>{const v=K(m,i);if(v){const g=Object.assign(m,{delegateTarget:v});e.call(c,g),r&&(c.removeEventListener(t,h,a),$(!1,c,e,d))}},d=JSON.stringify({selector:i,type:t,capture:l});$(!0,c,e,d)||c.addEventListener(t,h,a),n==null||n.addEventListener("abort",()=>{$(!1,c,e,d)})}function f(){return f=Object.assign?Object.assign.bind():function(i){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=e[s])}return i},f.apply(this,arguments)}const F=(i,t)=>String(i).toLowerCase().replace(/[\s/_.]+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+|-+$/g,"")||t||"",k=({hash:i}={})=>window.location.pathname+window.location.search+(i?window.location.hash:""),G=(i,t={})=>{const e=f({url:i=i||k({hash:!0}),random:Math.random(),source:"swup"},t);window.history.pushState(e,"",i)},C=(i=null,t={})=>{i=i||k({hash:!0});const e=f({},window.history.state||{},{url:i,random:Math.random(),source:"swup"},t);window.history.replaceState(e,"",i)},J=(i,t,e,s)=>{const n=new AbortController;return s=f({},s,{signal:n.signal}),Q(i,t,e,s),{destroy:()=>n.abort()}};class b extends URL{constructor(t,e=document.baseURI){super(t.toString(),e),Object.setPrototypeOf(this,b.prototype)}get url(){return this.pathname+this.search}static fromElement(t){const e=t.getAttribute("href")||t.getAttribute("xlink:href")||"";return new b(e)}static fromUrl(t){return new b(t)}}class A extends Error{constructor(t,e){super(t),this.url=void 0,this.status=void 0,this.aborted=void 0,this.timedOut=void 0,this.name="FetchError",this.url=e.url,this.status=e.status,this.aborted=e.aborted||!1,this.timedOut=e.timedOut||!1}}async function Z(i,t={}){var e;i=b.fromUrl(i).url;const{visit:s=this.visit}=t,n=f({},this.options.requestHeaders,t.headers),o=(e=t.timeout)!=null?e:this.options.timeout,r=new AbortController,{signal:a}=r;t=f({},t,{headers:n,signal:a});let c,l=!1,h=null;o&&o>0&&(h=setTimeout(()=>{l=!0,r.abort("timeout")},o));try{c=await this.hooks.call("fetch:request",s,{url:i,options:t},(w,{url:y,options:P})=>fetch(y,P)),h&&clearTimeout(h)}catch(w){throw l?(this.hooks.call("fetch:timeout",s,{url:i}),new A(`Request timed out: ${i}`,{url:i,timedOut:l})):(w==null?void 0:w.name)==="AbortError"||a.aborted?new A(`Request aborted: ${i}`,{url:i,aborted:!0}):w}const{status:d,url:p}=c,m=await c.text();if(d===500)throw this.hooks.call("fetch:error",s,{status:d,response:c,url:p}),new A(`Server error: ${p}`,{status:d,url:p});if(!m)throw new A(`Empty response: ${p}`,{status:d,url:p});const{url:v}=b.fromUrl(p),g={url:v,html:m};return!s.cache.write||t.method&&t.method!=="GET"||i!==v||this.cache.set(g.url,g),g}class tt{constructor(t){this.swup=void 0,this.pages=new Map,this.swup=t}get size(){return this.pages.size}get all(){const t=new Map;return this.pages.forEach((e,s)=>{t.set(s,f({},e))}),t}has(t){return this.pages.has(this.resolve(t))}get(t){const e=this.pages.get(this.resolve(t));return e&&f({},e)}set(t,e){e=f({},e,{url:t=this.resolve(t)}),this.pages.set(t,e),this.swup.hooks.callSync("cache:set",void 0,{page:e})}update(t,e){t=this.resolve(t);const s=f({},this.get(t),e,{url:t});this.pages.set(t,s)}delete(t){this.pages.delete(this.resolve(t))}clear(){this.pages.clear(),this.swup.hooks.callSync("cache:clear",void 0,void 0)}prune(t){this.pages.forEach((e,s)=>{t(s,e)&&this.delete(s)})}resolve(t){const{url:e}=b.fromUrl(t);return this.swup.resolveUrl(e)}}const I=(i,t=document)=>t.querySelector(i),D=(i,t=document)=>Array.from(t.querySelectorAll(i)),V=()=>new Promise(i=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{i()})})});function X(i){return!!i&&(typeof i=="object"||typeof i=="function")&&typeof i.then=="function"}function et(i,t=[]){return new Promise((e,s)=>{const n=i(...t);X(n)?n.then(e,s):e(n)})}function it(i){var t;(t=i=i||document.body)==null||t.getBoundingClientRect()}class st{constructor(t){this.swup=void 0,this.swupClasses=["to-","is-changing","is-rendering","is-popstate","is-animating","is-leaving"],this.swup=t}get selectors(){const{scope:t}=this.swup.visit.animation;return t==="containers"?this.swup.visit.containers:t==="html"?["html"]:Array.isArray(t)?t:[]}get selector(){return this.selectors.join(",")}get targets(){return this.selector.trim()?D(this.selector):[]}add(...t){this.targets.forEach(e=>e.classList.add(...t))}remove(...t){this.targets.forEach(e=>e.classList.remove(...t))}clear(){this.targets.forEach(t=>{const e=t.className.split(" ").filter(s=>this.isSwupClass(s));t.classList.remove(...e)})}isSwupClass(t){return this.swupClasses.some(e=>t.startsWith(e))}}class Y{constructor(t,e){this.id=void 0,this.state=void 0,this.from=void 0,this.to=void 0,this.containers=void 0,this.animation=void 0,this.trigger=void 0,this.cache=void 0,this.history=void 0,this.scroll=void 0;const{to:s,from:n=t.currentPageUrl,hash:o,el:r,event:a}=e;this.id=Math.random(),this.state=1,this.from={url:n},this.to={url:s,hash:o},this.containers=t.options.containers,this.animation={animate:!0,wait:!1,name:void 0,native:t.options.native,scope:t.options.animationScope,selector:t.options.animationSelector},this.trigger={el:r,event:a},this.cache={read:t.options.cache,write:t.options.cache},this.history={action:"push",popstate:!1,direction:void 0},this.scroll={reset:!0,target:void 0}}advance(t){this.state<t&&(this.state=t)}abort(){this.state=8}get done(){return this.state>=7}}function nt(i){return new Y(this,i)}class ot{constructor(t){this.swup=void 0,this.registry=new Map,this.hooks=["animation:out:start","animation:out:await","animation:out:end","animation:in:start","animation:in:await","animation:in:end","animation:skip","cache:clear","cache:set","content:replace","content:scroll","enable","disable","fetch:request","fetch:error","fetch:timeout","history:popstate","link:click","link:self","link:anchor","link:newtab","page:load","page:view","scroll:top","scroll:anchor","visit:start","visit:transition","visit:abort","visit:end"],this.swup=t,this.init()}init(){this.hooks.forEach(t=>this.create(t))}create(t){this.registry.has(t)||this.registry.set(t,new Map)}exists(t){return this.registry.has(t)}get(t){const e=this.registry.get(t);if(e)return e;console.error(`Unknown hook '${t}'`)}clear(){this.registry.forEach(t=>t.clear())}on(t,e,s={}){const n=this.get(t);if(!n)return console.warn(`Hook '${t}' not found.`),()=>{};const o=f({},s,{id:n.size+1,hook:t,handler:e});return n.set(e,o),()=>this.off(t,e)}before(t,e,s={}){return this.on(t,e,f({},s,{before:!0}))}replace(t,e,s={}){return this.on(t,e,f({},s,{replace:!0}))}once(t,e,s={}){return this.on(t,e,f({},s,{once:!0}))}off(t,e){const s=this.get(t);s&&e?s.delete(e)||console.warn(`Handler for hook '${t}' not found.`):s&&s.clear()}async call(t,e,s,n){const[o,r,a]=this.parseCallArgs(t,e,s,n),{before:c,handler:l,after:h}=this.getHandlers(t,a);await this.run(c,o,r);const[d]=await this.run(l,o,r,!0);return await this.run(h,o,r),this.dispatchDomEvent(t,o,r),d}callSync(t,e,s,n){const[o,r,a]=this.parseCallArgs(t,e,s,n),{before:c,handler:l,after:h}=this.getHandlers(t,a);this.runSync(c,o,r);const[d]=this.runSync(l,o,r,!0);return this.runSync(h,o,r),this.dispatchDomEvent(t,o,r),d}parseCallArgs(t,e,s,n){return e instanceof Y||typeof e!="object"&&typeof s!="function"?[e,s,n]:[void 0,e,s]}async run(t,e=this.swup.visit,s,n=!1){const o=[];for(const{hook:r,handler:a,defaultHandler:c,once:l}of t)if(e==null||!e.done){l&&this.off(r,a);try{const h=await et(a,[e,s,c]);o.push(h)}catch(h){if(n)throw h;console.error(`Error in hook '${r}':`,h)}}return o}runSync(t,e=this.swup.visit,s,n=!1){const o=[];for(const{hook:r,handler:a,defaultHandler:c,once:l}of t)if(e==null||!e.done){l&&this.off(r,a);try{const h=a(e,s,c);o.push(h),X(h)&&console.warn(`Swup will not await Promises in handler for synchronous hook '${r}'.`)}catch(h){if(n)throw h;console.error(`Error in hook '${r}':`,h)}}return o}getHandlers(t,e){const s=this.get(t);if(!s)return{found:!1,before:[],handler:[],after:[],replaced:!1};const n=Array.from(s.values()),o=this.sortRegistrations,r=n.filter(({before:d,replace:p})=>d&&!p).sort(o),a=n.filter(({replace:d})=>d).filter(d=>!0).sort(o),c=n.filter(({before:d,replace:p})=>!d&&!p).sort(o),l=a.length>0;let h=[];if(e&&(h=[{id:0,hook:t,handler:e}],l)){const d=a.length-1,p=m=>{const v=a[m-1];return v?(g,w)=>v.handler(g,w,p(m-1)):e};h=[{id:0,hook:t,handler:a[d].handler,defaultHandler:p(d)}]}return{found:!0,before:r,handler:h,after:c,replaced:l}}sortRegistrations(t,e){var s,n;return((s=t.priority)!=null?s:0)-((n=e.priority)!=null?n:0)||t.id-e.id||0}dispatchDomEvent(t,e,s){if(e!=null&&e.done)return;const n={hook:t,args:s,visit:e||this.swup.visit};document.dispatchEvent(new CustomEvent("swup:any",{detail:n,bubbles:!0})),document.dispatchEvent(new CustomEvent(`swup:${t}`,{detail:n,bubbles:!0}))}}const rt=i=>{if(i&&i.charAt(0)==="#"&&(i=i.substring(1)),!i)return null;const t=decodeURIComponent(i);let e=document.getElementById(i)||document.getElementById(t)||I(`a[name='${CSS.escape(i)}']`)||I(`a[name='${CSS.escape(t)}']`);return e||i!=="top"||(e=document.body),e},S="transition",E="animation";async function at({elements:i,selector:t}){if(t===!1&&!i)return;let e=[];if(i)e=Array.from(i);else if(t&&(e=D(t,document.body),!e.length))return void console.warn(`[swup] No elements found matching animationSelector \`${t}\``);const s=e.map(n=>function(o){const{type:r,timeout:a,propCount:c}=function(l){const h=window.getComputedStyle(l),d=L(h,`${S}Delay`),p=L(h,`${S}Duration`),m=H(d,p),v=L(h,`${E}Delay`),g=L(h,`${E}Duration`),w=H(v,g),y=Math.max(m,w),P=y>0?m>w?S:E:null;return{type:P,timeout:y,propCount:P?P===S?p.length:g.length:0}}(o);return!(!r||!a)&&new Promise(l=>{const h=`${r}end`,d=performance.now();let p=0;const m=()=>{o.removeEventListener(h,v),l()},v=g=>{if(g.target===o){if(!function(w){return[`${S}end`,`${E}end`].includes(w.type)}(g))throw new Error("Not a transition or animation event.");(performance.now()-d)/1e3<g.elapsedTime||++p>=c&&m()}};setTimeout(()=>{p<c&&m()},a+1),o.addEventListener(h,v)})}(n));s.filter(Boolean).length>0?await Promise.all(s):t&&console.warn(`[swup] No CSS animation duration defined on elements matching \`${t}\``)}function L(i,t){return(i[t]||"").split(", ")}function H(i,t){for(;i.length<t.length;)i=i.concat(i);return Math.max(...t.map((e,s)=>T(e)+T(i[s])))}function T(i){return 1e3*parseFloat(i)}function ht(i,t={},e={}){if(typeof i!="string")throw new Error("swup.navigate() requires a URL parameter");if(this.shouldIgnoreVisit(i,{el:e.el,event:e.event}))return void window.location.assign(i);const{url:s,hash:n}=b.fromUrl(i),o=this.createVisit(f({},e,{to:s,hash:n}));this.performNavigation(o,t)}async function ct(i,t={}){if(this.navigating){if(this.visit.state>=6)return i.state=2,void(this.onVisitEnd=()=>this.performNavigation(i,t));await this.hooks.call("visit:abort",this.visit,void 0),delete this.visit.to.document,this.visit.state=8}this.navigating=!0,this.visit=i;const{el:e}=i.trigger;t.referrer=t.referrer||this.currentPageUrl,t.animate===!1&&(i.animation.animate=!1),i.animation.animate||this.classes.clear();const s=t.history||(e==null?void 0:e.getAttribute("data-swup-history"))||void 0;s&&["push","replace"].includes(s)&&(i.history.action=s);const n=t.animation||(e==null?void 0:e.getAttribute("data-swup-animation"))||void 0;var o,r;n&&(i.animation.name=n),typeof t.cache=="object"?(i.cache.read=(o=t.cache.read)!=null?o:i.cache.read,i.cache.write=(r=t.cache.write)!=null?r:i.cache.write):t.cache!==void 0&&(i.cache={read:!!t.cache,write:!!t.cache}),delete t.cache;try{await this.hooks.call("visit:start",i,void 0),i.state=3;const a=this.hooks.call("page:load",i,{options:t},async(c,l)=>{let h;return c.cache.read&&(h=this.cache.get(c.to.url)),l.page=h||await this.fetchPage(c.to.url,l.options),l.cache=!!h,l.page});if(a.then(({html:c})=>{i.advance(5),i.to.html=c,i.to.document=new DOMParser().parseFromString(c,"text/html")}),!i.history.popstate){const c=i.to.url+i.to.hash;i.history.action==="replace"||i.to.url===this.currentPageUrl?C(c):(this.currentHistoryIndex++,G(c,{index:this.currentHistoryIndex}))}if(this.currentPageUrl=k(),i.history.popstate&&this.classes.add("is-popstate"),i.animation.name&&this.classes.add(`to-${F(i.animation.name)}`),i.animation.wait&&await a,i.done||(await this.hooks.call("visit:transition",i,void 0,async()=>{if(!i.animation.animate)return await this.hooks.call("animation:skip",void 0),void await this.renderPage(i,await a);i.advance(4),await this.animatePageOut(i),i.animation.native&&document.startViewTransition?await document.startViewTransition(async()=>await this.renderPage(i,await a)).finished:await this.renderPage(i,await a),await this.animatePageIn(i)}),i.done))return;await this.hooks.call("visit:end",i,void 0,()=>this.classes.clear()),i.state=7,this.navigating=!1,this.onVisitEnd&&(this.onVisitEnd(),this.onVisitEnd=void 0)}catch(a){if(!a||a!=null&&a.aborted)return void(i.state=8);i.state=9,console.error(a),this.options.skipPopStateHandling=()=>(window.location.assign(i.to.url+i.to.hash),!0),window.history.back()}finally{delete i.to.document}}const lt=async function(i){await this.hooks.call("animation:out:start",i,void 0,()=>{this.classes.add("is-changing","is-animating","is-leaving")}),await this.hooks.call("animation:out:await",i,{skip:!1},(t,{skip:e})=>{if(!e)return this.awaitAnimations({selector:t.animation.selector})}),await this.hooks.call("animation:out:end",i,void 0)},ut=function(i){var t;const e=i.to.document;if(!e)return!1;const s=((t=e.querySelector("title"))==null?void 0:t.innerText)||"";document.title=s;const n=D('[data-swup-persist]:not([data-swup-persist=""])'),o=i.containers.map(r=>{const a=document.querySelector(r),c=e.querySelector(r);return a&&c?(a.replaceWith(c.cloneNode(!0)),!0):(a||console.warn(`[swup] Container missing in current document: ${r}`),c||console.warn(`[swup] Container missing in incoming document: ${r}`),!1)}).filter(Boolean);return n.forEach(r=>{const a=r.getAttribute("data-swup-persist"),c=I(`[data-swup-persist="${a}"]`);c&&c!==r&&c.replaceWith(r)}),o.length===i.containers.length},dt=function(i){const t={behavior:"auto"},{target:e,reset:s}=i.scroll,n=e??i.to.hash;let o=!1;return n&&(o=this.hooks.callSync("scroll:anchor",i,{hash:n,options:t},(r,{hash:a,options:c})=>{const l=this.getAnchorElement(a);return l&&l.scrollIntoView(c),!!l})),s&&!o&&(o=this.hooks.callSync("scroll:top",i,{options:t},(r,{options:a})=>(window.scrollTo(f({top:0,left:0},a)),!0))),o},pt=async function(i){if(i.done)return;const t=this.hooks.call("animation:in:await",i,{skip:!1},(e,{skip:s})=>{if(!s)return this.awaitAnimations({selector:e.animation.selector})});await V(),await this.hooks.call("animation:in:start",i,void 0,()=>{this.classes.remove("is-animating")}),await t,await this.hooks.call("animation:in:end",i,void 0)},mt=async function(i,t){if(i.done)return;i.advance(6);const{url:e}=t;this.isSameResolvedUrl(k(),e)||(C(e),this.currentPageUrl=k(),i.to.url=this.currentPageUrl),await this.hooks.call("content:replace",i,{page:t},(s,{})=>{if(this.classes.remove("is-leaving"),s.animation.animate&&this.classes.add("is-rendering"),!this.replaceContent(s))throw new Error("[swup] Container mismatch, aborting");s.animation.animate&&(this.classes.add("is-changing","is-animating","is-rendering"),s.animation.name&&this.classes.add(`to-${F(s.animation.name)}`))}),await this.hooks.call("content:scroll",i,void 0,()=>this.scrollToContent(i)),await this.hooks.call("page:view",i,{url:this.currentPageUrl,title:document.title})},ft=function(i){var t;if(t=i,!!(t!=null&&t.isSwupPlugin)){if(i.swup=this,!i._checkRequirements||i._checkRequirements())return i._beforeMount&&i._beforeMount(),i.mount(),this.plugins.push(i),this.plugins}else console.error("Not a swup plugin instance",i)};function gt(i){const t=this.findPlugin(i);if(t)return t.unmount(),t._afterUnmount&&t._afterUnmount(),this.plugins=this.plugins.filter(e=>e!==t),this.plugins;console.error("No such plugin",t)}function vt(i){return this.plugins.find(t=>t===i||t.name===i||t.name===`Swup${String(i)}`)}function wt(i){if(typeof this.options.resolveUrl!="function")return console.warn("[swup] options.resolveUrl expects a callback function."),i;const t=this.options.resolveUrl(i);return t&&typeof t=="string"?t.startsWith("//")||t.startsWith("http")?(console.warn("[swup] options.resolveUrl needs to return a relative url"),i):t:(console.warn("[swup] options.resolveUrl needs to return a url"),i)}function yt(i,t){return this.resolveUrl(i)===this.resolveUrl(t)}const bt={animateHistoryBrowsing:!1,animationSelector:'[class*="transition-"]',animationScope:"html",cache:!0,containers:["#swup"],ignoreVisit:(i,{el:t}={})=>!(t==null||!t.closest("[data-no-swup]")),linkSelector:"a[href]",linkToSelf:"scroll",native:!1,plugins:[],resolveUrl:i=>i,requestHeaders:{"X-Requested-With":"swup",Accept:"text/html, application/xhtml+xml"},skipPopStateHandling:i=>{var t;return((t=i.state)==null?void 0:t.source)!=="swup"},timeout:0};class kt{constructor(t={}){var e,s;this.version="4.6.1",this.options=void 0,this.defaults=bt,this.plugins=[],this.visit=void 0,this.cache=void 0,this.hooks=void 0,this.classes=void 0,this.currentPageUrl=k(),this.currentHistoryIndex=void 0,this.clickDelegate=void 0,this.navigating=!1,this.onVisitEnd=void 0,this.use=ft,this.unuse=gt,this.findPlugin=vt,this.log=()=>{},this.navigate=ht,this.performNavigation=ct,this.createVisit=nt,this.delegateEvent=J,this.fetchPage=Z,this.awaitAnimations=at,this.renderPage=mt,this.replaceContent=ut,this.animatePageIn=pt,this.animatePageOut=lt,this.scrollToContent=dt,this.getAnchorElement=rt,this.getCurrentUrl=k,this.resolveUrl=wt,this.isSameResolvedUrl=yt,this.options=f({},this.defaults,t),this.handleLinkClick=this.handleLinkClick.bind(this),this.handlePopState=this.handlePopState.bind(this),this.cache=new tt(this),this.classes=new st(this),this.hooks=new ot(this),this.visit=this.createVisit({to:""}),this.currentHistoryIndex=(e=(s=window.history.state)==null?void 0:s.index)!=null?e:1,this.enable()}async enable(){var t;const{linkSelector:e}=this.options;this.clickDelegate=this.delegateEvent(e,"click",this.handleLinkClick),window.addEventListener("popstate",this.handlePopState),this.options.animateHistoryBrowsing&&(window.history.scrollRestoration="manual"),this.options.native=this.options.native&&!!document.startViewTransition,this.options.plugins.forEach(s=>this.use(s)),((t=window.history.state)==null?void 0:t.source)!=="swup"&&C(null,{index:this.currentHistoryIndex}),await V(),await this.hooks.call("enable",void 0,void 0,()=>{const s=document.documentElement;s.classList.add("swup-enabled"),s.classList.toggle("swup-native",this.options.native)})}async destroy(){this.clickDelegate.destroy(),window.removeEventListener("popstate",this.handlePopState),this.cache.clear(),this.options.plugins.forEach(t=>this.unuse(t)),await this.hooks.call("disable",void 0,void 0,()=>{const t=document.documentElement;t.classList.remove("swup-enabled"),t.classList.remove("swup-native")}),this.hooks.clear()}shouldIgnoreVisit(t,{el:e,event:s}={}){const{origin:n,url:o,hash:r}=b.fromUrl(t);return n!==window.location.origin||!(!e||!this.triggerWillOpenNewWindow(e))||!!this.options.ignoreVisit(o+r,{el:e,event:s})}handleLinkClick(t){const e=t.delegateTarget,{href:s,url:n,hash:o}=b.fromElement(e);if(this.shouldIgnoreVisit(s,{el:e,event:t}))return;if(this.navigating&&n===this.visit.to.url)return void t.preventDefault();const r=this.createVisit({to:n,hash:o,el:e,event:t});t.metaKey||t.ctrlKey||t.shiftKey||t.altKey?this.hooks.callSync("link:newtab",r,{href:s}):t.button===0&&this.hooks.callSync("link:click",r,{el:e,event:t},()=>{var a;const c=(a=r.from.url)!=null?a:"";t.preventDefault(),n&&n!==c?this.isSameResolvedUrl(n,c)||this.performNavigation(r):o?this.hooks.callSync("link:anchor",r,{hash:o},()=>{C(n+o),this.scrollToContent(r)}):this.hooks.callSync("link:self",r,void 0,()=>{this.options.linkToSelf==="navigate"?this.performNavigation(r):(C(n),this.scrollToContent(r))})})}handlePopState(t){var e,s,n,o;const r=(e=(s=t.state)==null?void 0:s.url)!=null?e:window.location.href;if(this.options.skipPopStateHandling(t)||this.isSameResolvedUrl(k(),this.currentPageUrl))return;const{url:a,hash:c}=b.fromUrl(r),l=this.createVisit({to:a,hash:c,event:t});l.history.popstate=!0;const h=(n=(o=t.state)==null?void 0:o.index)!=null?n:0;h&&h!==this.currentHistoryIndex&&(l.history.direction=h-this.currentHistoryIndex>0?"forwards":"backwards",this.currentHistoryIndex=h),l.animation.animate=!1,l.scroll.reset=!1,l.scroll.target=!1,this.options.animateHistoryBrowsing&&(l.animation.animate=!0,l.scroll.reset=!0),this.hooks.callSync("history:popstate",l,{event:t},()=>{this.performNavigation(l)})}triggerWillOpenNewWindow(t){return!!t.matches('[download], [target="_blank"]')}}function M(){return M=Object.assign?Object.assign.bind():function(i){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=e[s])}return i},M.apply(this,arguments)}const j=i=>String(i).split(".").map(t=>String(parseInt(t||"0",10))).concat(["0","0"]).slice(0,3).join(".");let Pt=class{constructor(){this.isSwupPlugin=!0,this.swup=void 0,this.version=void 0,this.requires={},this.handlersToUnregister=[]}mount(){}unmount(){this.handlersToUnregister.forEach(t=>t()),this.handlersToUnregister=[]}_beforeMount(){if(!this.name)throw new Error("You must define a name of plugin when creating a class.")}_afterUnmount(){}_checkRequirements(){return typeof this.requires!="object"||Object.entries(this.requires).forEach(([t,e])=>{if(!function(s,n,o){const r=function(a,c){var l;if(a==="swup")return(l=c.version)!=null?l:"";{var h;const d=c.findPlugin(a);return(h=d==null?void 0:d.version)!=null?h:""}}(s,o);return!!r&&((a,c)=>c.every(l=>{const[,h,d]=l.match(/^([\D]+)?(.*)$/)||[];var p,m;return((v,g)=>{const w={"":y=>y===0,">":y=>y>0,">=":y=>y>=0,"<":y=>y<0,"<=":y=>y<=0};return(w[g]||w[""])(v)})((m=d,p=j(p=a),m=j(m),p.localeCompare(m,void 0,{numeric:!0})),h||">=")}))(r,n)}(t,e=Array.isArray(e)?e:[e],this.swup)){const s=`${t} ${e.join(", ")}`;throw new Error(`Plugin version mismatch: ${this.name} requires ${s}`)}}),!0}on(t,e,s={}){var n;e=!(n=e).name.startsWith("bound ")||n.hasOwnProperty("prototype")?e.bind(this):e;const o=this.swup.hooks.on(t,e,s);return this.handlersToUnregister.push(o),o}once(t,e,s={}){return this.on(t,e,M({},s,{once:!0}))}before(t,e,s={}){return this.on(t,e,M({},s,{before:!0}))}replace(t,e,s={}){return this.on(t,e,M({},s,{replace:!0}))}off(t,e){return this.swup.hooks.off(t,e)}};function R(){return R=Object.assign?Object.assign.bind():function(i){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=e[s])}return i},R.apply(this,arguments)}class St extends Pt{constructor(t={}){super(),this.name="SwupParallelPlugin",this.requires={swup:">=4.6"},this.defaults={containers:[],keep:0},this.options=void 0,this.originalContainers=null,this.parallelContainers=[],this.startVisit=e=>{this.originalContainers=null,this.visitHasPotentialParallelAnimation(e)&&(e.animation.wait=!0,e.animation.parallel=!0)},this.skipOutAnimation=(e,s)=>{this.isParallelVisit(e)&&(s.skip=!0)},this.insertContainers=e=>{if(!this.isParallelVisit(e))return;const s=this.getParallelContainersForVisit(e);this.parallelContainers=s,this.swup.hooks.call("content:insert",{containers:s},()=>{for(const{all:o,next:r,previous:a,keep:c,remove:l}of s)o.forEach((h,d)=>h.style.setProperty("--swup-parallel-container",`${d}`)),a.setAttribute("aria-hidden","true"),a.before(r),e.animation.animate&&(r.classList.add("is-next-container"),it(r),r.classList.remove("is-next-container")),a.classList.add("is-previous-container"),c.forEach(h=>h.classList.add("is-kept-container")),l.forEach(h=>h.classList.add("is-removing-container"))}),this.originalContainers=e.containers;const n=this.parallelContainers.map(({selector:o})=>o);e.containers=e.containers.filter(o=>!n.includes(o))},this.resetContainers=e=>{this.originalContainers&&(e.containers=this.originalContainers)},this.cleanupContainers=()=>{const e=this.parallelContainers;this.swup.hooks.call("content:remove",{containers:e},()=>{for(const{remove:s,next:n}of e)s.forEach(o=>o.remove()),n.classList.remove("is-next-container")}),this.parallelContainers=[]},this.options=R({},this.defaults,t)}mount(){this.options.containers.length||(this.options.containers=this.swup.options.containers),this.swup.hooks.create("content:insert"),this.swup.hooks.create("content:remove"),this.on("visit:start",this.startVisit,{priority:1}),this.before("animation:out:await",this.skipOutAnimation,{priority:1}),this.before("content:replace",this.insertContainers,{priority:1}),this.on("content:replace",this.resetContainers),this.on("visit:end",this.cleanupContainers)}getParallelContainersForVisit(t){const{containers:e}=this.options,s=e.filter(n=>t.containers.includes(n));return s.length?s.reduce((n,o)=>{let{keep:r}=this.options;r=typeof r=="object"?r[o]:r,r=Math.max(0,Number(r));const a=t.to.document.querySelector(o),c=Array.from(document.querySelectorAll(o)),l=c[0],h=c.slice(0,r),d=c.slice(r),p=[...new Set([a,l,...h,...d])];return a&&l?[...n,{selector:o,next:a,previous:l,keep:h,remove:d,all:p}]:(console.warn(`Parallel container ${o} not found`),n)},[]):(console.warn("No parallel containers found in list of replaced containers"),[])}isParallelVisit(t){return t.animation.parallel}markVisitAsParallelAnimation(t){t.animation.wait=!0,t.animation.parallel=!0}visitHasPotentialParallelAnimation(t){return t.animation.parallel!==!1&&this.visitHasParallelContainers(t)}visitHasParallelContainers(t){return this.options.containers.some(e=>{const s=document.querySelector(e);return s==null?void 0:s.matches(t.containers.join(","))})}}class x{constructor(t){u(this,"width",0);u(this,"heigth",0);u(this,"canvas");u(this,"ctx");this.canvas=document.querySelector(t),this.ctx=this.canvas.getContext("2d"),this.setCanvasSize(),window.onresize=()=>{this.setCanvasSize()}}setCanvasSize(){this.ctx.scale(devicePixelRatio,devicePixelRatio),this.width=this.canvas.width=innerWidth*devicePixelRatio,this.heigth=this.canvas.height=innerHeight*devicePixelRatio}}class Ct extends x{constructor(){super(".about canvas");u(this,"currentAnimationId",0);u(this,"mouseX",Math.floor(this.width/2));u(this,"mouseY",Math.floor(this.heigth/2));u(this,"realMouseX",this.width/2);u(this,"realMouseY",this.heigth/2);u(this,"sphereDisplacementFactor",0);u(this,"size",3);u(this,"spacing",12);u(this,"distortionRadius",Math.max(this.width,300));u(this,"dynamicAngle",Math.random()*360);u(this,"rectangles",[]);u(this,"sphere");this.sphere=document.querySelector("#sphere"),document.addEventListener("mousemove",e=>{this.realMouseX=e.clientX,this.realMouseY=e.clientY,this.sphereDisplacementFactor=0}),this.defineSquareList(),this.drawScene()}defineSquareList(){const e=Math.floor(this.width/this.spacing),s=Math.floor(this.heigth/this.spacing);for(let n=0;n<s;n++){const o=(2*n-1)*this.spacing;for(let r=0;r<e;r++){const a=(2*r-1)*this.spacing;this.rectangles.push({x:a,y:o})}}}defineRectPath(e){let s=e.x,n=e.y;const o=this.mouseX-s,r=this.mouseY-n,a=Math.hypot(o,r),c=this.distortionRadius*1.66;if(a<this.distortionRadius){const h=a**2/c;n+=Math.floor(h-c+this.distortionRadius);const d=this.waveDistortion(this.distortionRadius);this.ctx.rect(s,n-d,this.size,this.size);return}const l=this.waveDistortion(a);this.ctx.rect(s,n-l,this.size,this.size)}waveDistortion(e){const s=2*e/(this.distortionRadius*1.66),n=Math.cos(2*Math.PI*s+this.dynamicAngle/100);return Math.floor(100*Math.exp(-s)*n)}handleMouseMove(){const e=this.realMouseX-this.mouseX,s=this.realMouseY-this.mouseY;if(this.sphereDisplacementFactor===170){this.mouseX=this.realMouseX,this.mouseY=this.realMouseY;return}const n=this.sphereDisplacementFactor/100,o=1/(1+Math.exp(5-2*n));this.mouseX+=o*e,this.mouseY+=o*s,this.sphereDisplacementFactor+=1}drawSquares(){this.ctx.clearRect(0,0,this.width,this.heigth),this.ctx.fillStyle="white",this.ctx.globalCompositeOperation="overlay",this.ctx.beginPath();for(const e of this.rectangles)this.defineRectPath(e);this.ctx.fill()}defineColorAngle(){this.dynamicAngle+=1,this.dynamicAngle>=36e3&&(this.dynamicAngle=0),document.documentElement.style.setProperty("--color-angle",`${Math.floor(this.dynamicAngle/100)}`)}defineRadiusProperty(){this.size=3*window.devicePixelRatio,this.spacing=12*window.devicePixelRatio,this.distortionRadius=Math.floor(this.width/5),document.documentElement.style.setProperty("--diameter",`${Math.floor(this.distortionRadius*2)}px`)}definePositions(){const e=this.waveDistortion(this.distortionRadius),s=Math.floor(this.mouseY-this.distortionRadius-e),n=Math.floor(this.mouseX-this.distortionRadius);this.sphere.style.top=s+"px",this.sphere.style.left=n+"px"}drawScene(){this.drawSquares(),this.defineColorAngle(),this.definePositions(),this.defineRadiusProperty(),this.handleMouseMove(),this.animateCanvas()}animateCanvas(){this.currentAnimationId=requestAnimationFrame(()=>{this.drawScene()})}stopAnimation(){cancelAnimationFrame(this.currentAnimationId)}}class Mt{constructor(){u(this,"x");u(this,"y");u(this,"lineFunction");u(this,"blur");u(this,"size");u(this,"displacement",0);u(this,"radians");u(this,"quadrant");this.radians=Math.random()*Math.PI*2,this.quadrant=Math.floor(this.radians/(Math.PI/2)),this.blur=Math.floor(Math.random()*3)+3,this.size=Math.floor(Math.random()*6e3+3e3),this.lineFunction=this.defineLineFunction(),this.x=this.defineX(),this.y=this.defineY()}isOutOfScreen(){const t=Math.cos(this.radians),e=Math.sin(this.radians),s=this.displacement-this.size,{xIntercept:n,widthY:o,yIntercept:r,heightX:a}=this.lineFunction;return{0:()=>{const l=t*s,h=e*s;return this.radians>Math.PI/4?l>innerHeight:h+n>innerWidth},1:()=>{const l=Math.abs(t)*s,h=e*s;return this.radians>3*Math.PI/4?h>innerWidth:l+o>innerHeight},2:()=>{const l=Math.abs(t)*s,h=Math.abs(e)*s;return this.radians>5*Math.PI/4?h>innerHeight:l>a},3:()=>{const l=t*s,h=Math.abs(e)*s;return this.radians>7*Math.PI/4?l>innerWidth:h>r}}[this.quadrant]()}draw(t){const e=this.displacement-this.size,s=this.blur?1-this.blur/10:1;t.translate(this.x,this.y),t.rotate(this.radians);const n=t.createLinearGradient(e,0,this.displacement,0);n.addColorStop(0,"transparent"),n.addColorStop(.5,"black"),n.addColorStop(1,"transparent"),t.lineCap="round",t.strokeStyle=n,t.filter=`blur(${this.blur}px) opacity(${s})`,t.beginPath(),t.moveTo(e,0),t.lineTo(this.displacement,0),t.stroke(),t.closePath(),t.setTransform(1,0,0,1,0,0),this.displacement+=15}defineLineFunction(){const t=Math.tan(this.radians),e=Math.floor(Math.random()*10/10*innerWidth),s=Math.floor(Math.random()*10/10*innerHeight),n=Math.floor(s-t*e),o=Math.floor(-n/t),r=Math.floor(t*innerWidth+n),a=Math.floor((innerHeight-n)/t);return{widthY:r,heightX:a,xIntercept:o,yIntercept:n}}defineX(){const{xIntercept:t,heightX:e}=this.lineFunction;return{0:t,1:innerWidth,2:e,3:0}[this.quadrant]}defineY(){const{widthY:t,yIntercept:e}=this.lineFunction;return{0:0,1:t,2:innerHeight,3:e}[this.quadrant]}}class xt extends x{constructor(){super(".main canvas");u(this,"lines");u(this,"unblurredLines",0);u(this,"currentAnimationId",0);this.lines=Array.from({length:10},()=>this.generateLine()),this.drawLines()}generateLine(){const e=new Mt;return this.unblurredLines<3&&(e.blur=0,this.unblurredLines+=1),e}drawLines(){this.ctx.clearRect(0,0,this.width,this.heigth),this.lines.map((e,s)=>{e.draw(this.ctx),e.isOutOfScreen()&&(e.blur===0&&(this.unblurredLines-=1),this.lines[s]=this.generateLine())}),this.animateCanvas()}animateCanvas(){this.currentAnimationId=requestAnimationFrame(()=>{this.drawLines()})}stopAnimation(){cancelAnimationFrame(this.currentAnimationId)}}function U(i){const t=document.querySelectorAll(".nav-link button");t.forEach(e=>{const s=()=>{e.classList.contains("active")?e.classList.remove("active"):(t.forEach(o=>{o.classList.remove("active")}),e.classList.add("active"))};if(i==="remove"){e.removeEventListener("click",s);return}e.addEventListener("click",s)})}class At{constructor(){u(this,"x");u(this,"size");u(this,"velocity",0);u(this,"acceleration");u(this,"hasStopped",!1);this.x=Math.random(),this.acceleration=Math.random()*.01+.01,this.size=Math.round(Math.random()*45+5)}draw(t,e){const s=this.size/2,n=this.x*t.canvas.clientWidth;this.velocity=this.velocity+this.acceleration;const o=this.velocity*this.size;t.fillStyle=e,t.beginPath(),t.moveTo(n-this.size,0),t.bezierCurveTo(n,0,n-s/2,this.size,n-s,this.size+o),t.arc(n,this.size+o,s,210*Math.PI/180,-20*Math.PI/180,!0),t.bezierCurveTo(n+s/2,this.size,n,0,n+this.size,0),t.fill(),t.closePath(),o>t.canvas.clientHeight&&(this.acceleration=0,this.hasStopped=!0)}}class Et extends x{constructor(){super(".portfolio canvas");u(this,"angle",0);u(this,"currentAnimationId",0);u(this,"backgroundColor","hsl(219, 50%, 11%)");u(this,"liquidColor","hsl(219, 50%, 50%)");u(this,"liquidDisplacement",this.heigth);u(this,"drops",[]);this.generateDrops(),this.drawDrops()}generateDrops(){const e=7*Math.random()+3;this.drops=Array.from({length:e},()=>new At)}liquidFilling(){this.ctx.fillStyle=this.liquidColor;const e=this.angle*Math.PI/180,s=this.liquidDisplacement,n=10*Math.sin(e);if(this.ctx.beginPath(),this.ctx.moveTo(0,s),this.ctx.quadraticCurveTo(this.width/4,s+n,this.width/2,s),this.ctx.quadraticCurveTo(3*this.width/4,s-n,this.width,s),this.ctx.lineTo(this.width,this.heigth),this.ctx.lineTo(0,this.heigth),this.ctx.fill(),this.ctx.closePath(),this.angle+=3,this.liquidDisplacement-=.1,this.liquidDisplacement<-50){this.liquidDisplacement=this.heigth;const o=this.backgroundColor;this.backgroundColor=this.liquidColor,this.liquidColor=o,this.generateDrops()}}drawDrops(){this.ctx.clearRect(0,0,this.width,this.heigth),this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.width,this.heigth);for(const e of this.drops)e.draw(this.ctx,this.liquidColor);this.drops.some(e=>e.hasStopped)&&this.liquidFilling(),this.animateCanvas()}animateCanvas(){this.currentAnimationId=requestAnimationFrame(()=>{this.drawDrops()})}stopAnimation(){cancelAnimationFrame(this.currentAnimationId)}}class Lt extends x{constructor(){super(".contact canvas");u(this,"currentAnimationId",0)}animateCanvas(){}stopAnimation(){cancelAnimationFrame(this.currentAnimationId)}}class qt extends x{constructor(){super(".story canvas");u(this,"angle",0);u(this,"currentAnimationId",0)}animateCanvas(){}stopAnimation(){cancelAnimationFrame(this.currentAnimationId)}}const z=new kt({plugins:[new St]}),W={"/":xt,"/about/":Ct,"/portfolio/":Et,"/story/":qt,"/contact/":Lt};let O,N;document.addEventListener("DOMContentLoaded",()=>{U("add");const i=location.pathname;O=new W[i]});z.hooks.on("content:remove",()=>{U("add"),N.stopAnimation()});z.hooks.on("content:insert",i=>{U("remove");const t=i.to.url;N=O,O=new W[t]});z.hooks.on("visit:start",i=>{const t=i.trigger.el;if(t.classList.contains("main-link")){const n=t.querySelector("svg"),{x:o,y:r}=n.getBoundingClientRect(),a=innerWidth>innerHeight?"200vw":"200vh";document.documentElement.style.setProperty("--x-corner",`${o}`),document.documentElement.style.setProperty("--y-corner",`${r}`),document.documentElement.style.setProperty("--square-size",`${a}`);return}const e=t.previousElementSibling;if(window.matchMedia("screen and (min-width: 768px)").matches){const{x:n,y:o}=t.getBoundingClientRect();document.documentElement.style.setProperty("--x-corner",`${n}`),document.documentElement.style.setProperty("--y-corner",`${o}`);return}if(e){const{x:n,y:o}=e.getBoundingClientRect();document.documentElement.style.setProperty("--x-corner",`${n}`),document.documentElement.style.setProperty("--y-corner",`${o}`)}});
