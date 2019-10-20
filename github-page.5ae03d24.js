parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vVSI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.HttpRequest=void 0;var t=require("../../core/subscribable");class e extends t.Subscribable{constructor(t,e){super(),this.url="",this.loading=!1,this.done=!1,this.runCounts=0,this.error=!1,this.url=t,this.opts=s(e)}run(t){if(this.runCounts+=1,this.loading)return void console.warn("Request ongoing, you can use force if you really need");this.loading=!0;fetch(this.url,{method:this.opts.method,headers:{accept:"application/json","content-type":"application/json"}}).then(async t=>{try{const s=t.status>=400||t.status<200;this.status=t.status,this.error=s,this.responseHeaders=t.headers;const o=/json/.test(t.headers.get("content-type")),r=await(o?t.json():t);s?(this.done=!1,this.responseBody=void 0,this.errorBody=r):(this.done=!0,this.responseBody=r,this.errorBody=void 0)}catch(e){console.error(e)}finally{this.loading=!1}})}_registerWatchedProperties(){return["loading","done","error","responseBody","errorBody","status","url"]}}function s(t){return{method:"GET",...t}}exports.HttpRequest=e;
},{"../../core/subscribable":"ttbn"}],"MpmQ":[function(require,module,exports) {
"use strict";var e=require("lit-element"),t=require("../page-element"),r=require("../../application/models/request"),n=function(e,t,r,n){var s,i=arguments.length,o=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(s=e[u])&&(o=(i<3?s(o):i>3?s(t,r,o):s(t,r))||o);return i>3&&o&&Object.defineProperty(t,r,o),o};const s="https://api.github.com/users";let i=class extends t.PageElement{constructor(){super(),this.subscribe("ghUserReq",new r.HttpRequest)}render(){const t=this.ghUserReq;return e.html`
            <section class="l-pad-10 l-inline-center">
                <div class="card">
                    <p>Enter your github user name</p>
                    <input type="text" @blur="${e=>t.url=`${s}/${e.target.value}`}">
                    <div ?hidden="${!t.url}">
                        <p>
                            <strong>Your github url is:</strong>
                            <br>${t.url}
                        </p>
                        <button class="form--button" @click="${()=>t.run()}">GET USER INFO</button> 
                    </div>
                </div>
                
                <br>
                
                <div class="card" ?hidden="${0===t.runCounts}">
                    <div ?hidden="${!t.loading}">Loading...</div>
                    ${t.responseBody&&e.html`
                        <div>Member since: ${new Date(t.responseBody.created_at).getFullYear()}</div>                    
                        <div>Projects Count: ${t.responseBody.public_repos}</div>                    
                    `}
                </div>
            </section>
        `}};i=n([(0,e.customElement)("page-github")],i);
},{"lit-element":"+bhx","../page-element":"01Fd","../../application/models/request":"vVSI"}]},{},[], null)
//# sourceMappingURL=/github-page.5ae03d24.js.map