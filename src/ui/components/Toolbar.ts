import {html, LitElement} from "@polymer/lit-element";
import {unsafeHTML} from "lit-html/lib/unsafe-html";

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
            <style>
                :host {
                    font-size: 19px;
                    padding: 0 15px;
                }
                
                .content {
                    display: flex;
                    align-items: center;
                    height: 100%;
                }
                
                .content--left {
                    flex-grow: 1;
                    flex-shrink: 1;
                }
                
                .content--right {
                    flex-grow: 0;
                    flex-shrink: 0;
                }
                
                svg {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }
            </style>
            
            <div class="content">
                <span class="content--left">Simple Todo App</span>
                <div class="content--right">
                    <a href="https://github.com/quackmartins/lit-ts-redux" target="_blank">
                        ${unsafeHTML(githubIcon)}
                    </a>
                </div>
            </div>
        `;
    }

}

customElements.define("toolbar-element", Toolbar);

export {Toolbar}