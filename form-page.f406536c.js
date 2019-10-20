parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"7CgD":[function(require,module,exports) {
var define;
var i;Object.defineProperty(exports,"__esModule",{value:!0}),exports.Field=exports.Model=exports.Definition=exports.Constraints=exports.DefinitionCssState=void 0;const t={dirty:"isDirty",valid:"isValid",invalid:"isInvalid"};exports.DefinitionCssState=t;class s{constructor(i){this.type=String,this.plainObject=!0,this.required=void 0,this.pattern=void 0,this.extraValidation=void 0,Object.assign(this,i||{})}async validate(i){switch(!0){case!this.required&&(null==i||""===i):break;case this.required&&(null==i||""===i):return"required";case this.pattern&&!this.pattern.test(i):return"pattern";case Boolean(this.extraValidation)&&!(await this.extraValidation(i)):return"extra-validation"}}}exports.Constraints=s;class e{constructor(i){this._definitions={},this._validators=[],this._constraint=i||s}configure(i){return i((i,t)=>{this._definitions[i]=new this._constraint(t)},(i,t)=>{this._validators.push({name:i,validator:t})},i=>{this._plainEnricher=i}),this}model(){return new a(this._definitions,this._validators,this._plainEnricher)}}exports.Definition=e;class a{constructor(i,t,s){this.listeners=[],this._fields=[],this._validatorNames=[],this._valid=void 0,this._invalid=void 0,this._plainEnricher=void 0,this._fields=Object.keys(i).map(t=>{const s=new l(t,i[t]);return s.subscribe(()=>this.runListeners()),s}),this._validatorNames=t,this._plainEnricher=s}plainObj(){const i={};if(this._fields.filter(i=>i.constraints.plainObject).forEach(t=>{const s=t.name.split("."),e=s.pop();s.reduce((i,t)=>(i[t]=void 0===i[t]?{}:i[t],i[t]),i)[e]=t.value}),this._plainEnricher){const t=this._plainEnricher(this);Object.keys(t).forEach(s=>{const e=s.split("."),a=e.pop();e.reduce((i,t)=>(i[t]=void 0===i[t]?{}:i[t],i[t]),i)[a]=t[s]})}return i}prune(){this._fields.forEach(i=>i.prune())}load(i){}clear(){}get valid(){return this._valid}get validatorNames(){return this._validatorNames.map(i=>i.name)}get fields(){return this._fields}get(i){return this._fields.find(t=>t.name===i).value}setValid(i){this._valid=i,this._invalid=!i,this.runListeners()}setInvalid(i){this._valid=!i,this._invalid=i,this.runListeners()}subscribe(i){return this.listeners.push(i),this}async validate(i){if(void 0===i){if((await Promise.all(this._fields.map(async i=>({name:i.name,valid:await i.validate()})))).filter(i=>!i.valid).length>0)return this.setValid(!1),!1}const t=i?this._validatorNames.filter(t=>t.name==i):this._validatorNames,s=(await Promise.all(t.map(async i=>({name:i.name,valid:await i.validator(this)})))).filter(i=>!i.valid);s.forEach(i=>{console.debug(`Not validated by [${i.name}]`)});const e=s.length>0;return this.setInvalid(e),this.valid}runListeners(){this.listeners.forEach(i=>i(this))}}exports.Model=a;const n=[String,Number,Boolean,Symbol].map(i=>i.prototype),r=i=>n.indexOf(i.prototype)>-1;class l{constructor(i,t){this._invalidReason=void 0,this._invalid=void 0,this._valid=void 0,this._dirty=void 0,this._constraint=void 0,this.listeners=[],this._name=i,this._constraint=t}get name(){return this._name}get value(){if(void 0!==this._value)return r(this._constraint.type)?this._constraint.type(this._value):new this._constraint.type(this._value)}get constraints(){return this._constraint}get invalid(){return this._invalid}get invalidReason(){return this._invalidReason}get valid(){return this._valid}get dirty(){return this._dirty}get required(){return Boolean(this._constraint.required)}get cssState(){return`${this._dirty&&t.dirty||""} ${this._invalid&&t.invalid||""} ${this._valid&&t.valid||""}`.trim()}setValue(i){this._value=i,this.setDirty(!0),this.runListeners()}subscribe(i){this.listeners.push(i)}prune(){this._invalid=void 0,this._valid=void 0,this._invalidReason=void 0,this.runListeners()}setDirty(i){this._dirty=i,this.runListeners()}setInvalid(i){this._invalid=i,this._valid=!i,this.runListeners()}setValid(i){this._valid=i,this._invalid=!i,this.runListeners()}async validate(){try{this._invalidReason=await this._constraint.validate(this._value);const t=!Boolean(this._invalidReason);return t||console.debug(`Not valid [${this.name}] reason [${this._invalidReason}]`),this.setValid(t),t}catch(i){return console.warn(`Error when validating field ${(this.name||"").toUpperCase()}\n`,i,this),this._invalidReason="unknown error",this.setInvalid(!0),!1}}runListeners(){this.listeners.forEach(i=>i(this))}}exports.Field=l;
},{}],"5qac":[function(require,module,exports) {
var define;
var e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.Person=void 0;var t=require("../../core/_definition");const n=(new t.Definition).configure((e,t,n)=>{e("name",{type:String,pattern:/\w+ \w+/,required:!0}),e("info.age",{type:Number,pattern:/\d{2}/,extraValidation:async e=>Number(e)>=18}),e("info.birth",{type:Date,extraValidation:async e=>new Date(e).getSeconds()%2==0}),e("bank.number",{type:Number,required:!0,pattern:/^\d{4}$/,plainObject:!1}),e("bank.digit",{type:Number,required:!0,pattern:/^\d{1}$/,plainObject:!1}),e("country",{}),t("default",async()=>!0),t("bank",async e=>e.get("bank.digit")>5),n(e=>({"info.bank":e.get("bank.number")&&e.get("bank.digit")&&`${e.get("bank.number")}${e.get("bank.digit")}`}))});exports.Person=n;
},{"../../core/_definition":"7CgD"}],"txt2":[function(require,module,exports) {
"use strict";var e=require("lit-element"),t=require("../../application/definitions/person"),i=require("../page-element"),r=function(e,t,i,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var d=e.length-1;d>=0;d--)(s=e[d])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let s=class extends i.PageElement{constructor(){super(...arguments),this.person=t.Person.model().subscribe(()=>this.requestUpdate())}render(){const{person:t}=this;return e.html`
            <div class="l-pad-10">
                <div class="l-row">
                    <div>
                        ${t.fields.map(t=>e.html`
                            <div class="field">
                                <div>field: ${t.name}</div>
                                <input class="${t.cssState}" @input=${e=>t.setValue(e.target.value||void 0)} @blur=${e=>t.validate()}>
                                <div>
                                    <div><strong>css</strong>: ${t.cssState}</div>
                                    <div><strong>required</strong>: ${t.required.toString()}</div>
                                    <div><strong>reason</strong>: ${t.invalidReason}</div>
                                    <div><strong>valid</strong>: ${t.valid}</div>
                                    <div><strong>dirty</strong>: ${t.dirty}</div>
                                </div>
                            </div>
                            <br>
                        `)}
                        <button @click=${()=>t.validate()}>Enviar</button>
                    </div>
                    
                    <div style="position: sticky; top: 1px;">
                        <div><strong>Model validators</strong>:<br> ${t.validatorNames.join(", ")}</div><br>
                        <div><strong>Model valid</strong>:<br> ${t.valid}</div><br>
                        <div><strong>Plain Obj:</strong></div>
                        <pre>${JSON.stringify(t.plainObj(),null,2)}</pre>
                    </div>
                    
                </div>
            </div>    
        `}createRenderRoot(){return this}};r([(0,e.property)()],s.prototype,"person",void 0),s=r([(0,e.customElement)("page-form")],s);
},{"lit-element":"+bhx","../../application/definitions/person":"5qac","../page-element":"01Fd"}]},{},[], null)
//# sourceMappingURL=/form-page.f406536c.js.map