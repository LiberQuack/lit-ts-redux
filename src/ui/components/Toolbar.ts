import {html, LitElement} from "@polymer/lit-element";

const githubIcon = require("../../assets/github-icon.svg");

class Toolbar extends LitElement {

    static get properties() {
        return {
            foo: String
        }
    }

    _render(props) {
        //language=HTML
        return html`
            <div class="toolbar--content">
                <span class="toolbar--content--left">Simple Todo App</span>
                <div class="toolbar--content--right">
                    <a href="https://github.com/quackmartins/lit-ts-redux" 
                       target="_blank"
                       rel="noopener"
                        aria-label="Github Link">${
                            //TODO: Change it to unsafeStatic in the future
                            html([githubIcon] as any)
                    }</a>
                </div>
            </div>
        `;
    }


    protected _createRoot(): Element | DocumentFragment {
        return this;
    }
}

customElements.define("toolbar-element", Toolbar);

export {Toolbar}