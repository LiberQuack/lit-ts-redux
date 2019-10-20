import {html, LitElement, property, TemplateResult} from "lit-element";
import {Application} from "../application";

const JSONTreeView = require("./json-tree-view/JSONView");


class AppikConsole extends LitElement {

    _app: Application;
    walkIndex = -1;

    @property()
    private _inputHistory = [];

    @property()
    private evaluations = [] as any[];

    @property()
    set resource(resourceName) {
        const input = this.getCodeInput();
        input.value = `application.get("${resourceName}")`;
        input.focus();
        this.evaluate()
    }

    @property()
    set app(val) {
        this._app = val
    }

    constructor() {
        super();
        this.addEventListener("click", () => {
            this.renderRoot.querySelector("input").focus();
        });
    }

    buildSandBox(vars) {
        return function (code): any {
            try {
                return eval(`( 
                function () {
                    ${Object.keys(vars).map(varName => `
                        const ${varName} = vars["${varName}"]
                    `).join(";")}
                    
                    return ${code};
                }
            )()`);
            } catch (e) {
                console.error(e);
                return e;
            }
        };
    }


    evaluate(e: KeyboardEvent) {
        if (!(e.code == "Enter" || e.code == "NumpadEnter")) {
            return
        }

        const help = () => {
            return html`
            <code>
                <strong>
                    Welcome to the App console <br>
                    debug your app by using the variables: <br>
                </strong>
                <div>--</div>
                <div>application</div>
                <div>help()</div>
                <div>clear()</div>
            </code>
        `
        };

        const clear = () => {
            this.evaluations = [];
        };


        const sandbox = this.buildSandBox({application: this._app, help, clear});
        const input = this.getCodeInput();
        const evalResult = sandbox(input.value);

        if (evalResult instanceof TemplateResult) {
            this.evaluations = [...this.evaluations, evalResult];
        } else {
            const view = new JSONTreeView("", evalResult, undefined, undefined, /^[^_]/);
            view.readonly = true;
            this.evaluations = [...this.evaluations, view.dom];
        }

        if (input.value != this._inputHistory[this._inputHistory.length - 1]) {
            this._inputHistory = [input.value, ...this._inputHistory];
        }
        input.value = "";
        this.walkIndex = -1;
    }

    private getCodeInput() {
        return this.renderRoot.querySelector(`input`);
    }

    private walkHistory(e: KeyboardEvent) {
        let arrowed = false;

        switch (e.code) {
            case "ArrowUp":
                this.walkIndex += 1;
                arrowed = true;
                break;
            case "ArrowDown":
                this.walkIndex -= 1;
                arrowed = true;
                break;
        }

        if (arrowed) {
            this.walkIndex = Math.max(-1, Math.min(this._inputHistory.length, this.walkIndex));
            const pastValue = this._inputHistory[this.walkIndex];
            const input = this.getCodeInput();
            input.value = pastValue === undefined ? "" : pastValue;
            requestAnimationFrame(() => {
                input.selectionEnd = input.value.length;
                input.selectionStart = input.value.length;
            });
        }
    }

    render() {
        //language=HTML
        return html`
            <style>
                * {
                    box-sizing: border-box;
                }
            
                :host {
                    display: block;
                    font-size: 14px;
                    font-family: monospace;
                    background: #454545;
                    color: #bbb;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 0;
                    overflow: auto;     
                }
            
                .jsonView {
                    margin-left: 20px;
                    padding: 2px;
                    cursor: default;
                    color: rgb(156, 156, 156);
                    white-space: nowrap;
                    -webkit-user-select: none;
                }

                .jsonView > div {
                    display: inline-block;
                }

                .jsonView.hidden {
                    display: none;
                }

                .jsonView > .children, .jsonView.insert {
                    display: block;
                }

                .jsonView > .name {
                    color: rgb(172,101,180);
                }

                .jsonView > .separator:before {
                    content: ":";
                }

                .jsonView > .separator {
                    padding-right: 5px;
                }

                .jsonView > .spacing {
                    display: inline-block;
                    width: 15px;
                }

                .jsonView > .spacing::before {
                    content: '1';
                    visibility: hidden;
                }

                .jsonView > .value.null, .jsonView > .value.undefined {
                    color: rgb(128, 128, 128);
                }

                .jsonView > .value.boolean, .jsonView > .value.number {
                    color: rgb(50,133,207);
                }

                .jsonView > .value.string:not(.edit):before, .jsonView > .value.string:not(.edit):after {
                    content: "\\" ";
                }

                .jsonView > .value.string {
                    color: rgb(196, 26, 22);
                }

                .jsonView > .name:hover, .jsonView > .value:hover {
                    background-color: rgba(56, 121, 217, 0.1);
                }

                .jsonView > .expand, .jsonView > .collapse {
                    min-width: 20px;
                    margin-left: -20px;
                    cursor: pointer;
                }

                .jsonView > .expand:before {
                    content: '\\25B6';
                }

                .jsonView > .collapse:before {
                    content: '\\25BC';
                }

                .jsonView > .edit {
                    padding: 0px 5px 0px 5px;
                    white-space: nowrap;
                    overflow: hidden;
                    background-color: transparent;
                }

                .jsonView > .edit br {
                    display: none;
                }

                .jsonView > .edit * {
                    display: inline;
                    white-space: nowrap;
                }

                .jsonView > .value.edit {
                    color: rgb(0, 0, 0);
                }

                .jsonView > .delete:before {
                    content: '+';
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    display: inline-block;
                }

                .jsonView > .delete {
                    opacity: 0;
                    display: inline;
                    padding: 3px;
                    cursor: pointer;
                    color: rgb(150, 150, 150);
                }

                .jsonView > .item:hover ~ .delete {
                    opacity: 1;
                    color: rgb(150, 150, 150);
                }

                .jsonView > .delete:hover {
                    opacity: 1;
                    color: rgb(0, 0, 0);
                    background: rgb(220, 220, 220);
                }

                .jsonView.readonly > .insert, .jsonView.readonly > .delete {
                    display: none !important;
                }

                .jsonView > .insert:before {
                    content: '+';
                }

                .jsonView > .insert {
                    display: none;
                    color: rgb(150, 150, 150);
                    cursor: pointer;
                }

                .jsonView.expanded > .insert, .jsonView.expanded > .insert {
                    display: inline-block;
                    margin-left: 20px;
                    padding: 3px;
                }

                .jsonView > .insert:hover {
                    color: rgb(0, 0, 0);
                    background: rgb(220, 220, 220);
                }
            </style>
            
            <div style="font-size: 14px; font-family: monospace; background: #454545; color: #bbb; display: flex; flex-direction: column; flex-grow: 0">
                <div style="flex-shrink: 1" .hidden="${!this.evaluations.length}">
                    ${this.evaluations.map(it => html`
                        <div style="border-bottom: 1px solid rgba(0,0,0,.15); padding-left: 2ch">${it}</div>
                    `)}
                </div>
                <div style="flex-grow: 1; width: 400px" @click="${() => this.renderRoot.querySelector("input").focus()}">
                    <input @keypress="${this.evaluate}" @keydown="${this.walkHistory}" placeholder="help()" style="width: 100%; padding: 10px 5px; padding-left: 2ch; font-size: inherit; flex-shrink: 0; outline: none; background: inherit; border: none; color: #bbb"/>
                </div>
            </div>
        `
    }

}

customElements.define("appik-console", AppikConsole);
