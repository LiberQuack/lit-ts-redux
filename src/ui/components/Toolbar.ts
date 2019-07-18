import {html, LitElement} from "lit-element";

const menuSvg = require("../../assets/baseline-menu.svg");
const githubIcon = require("../../assets/github-icon.svg");

class Toolbar extends LitElement {

    //language=HTML
    render() {
        return html`
            <div class="toolbar--content">
                ${this.iconElement}
                <div class="toolbar--content--left">
                    Simple Todo App
                </div>
                <div class="toolbar--content--right">
                    <a href="https://github.com/quackmartins/lit-ts-redux" 
                       target="_blank"
                       rel="noopener"
                        aria-label="Github Link">
                        Github Link
                    </a>
                </div>
            </div>
        `;
    }


    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }
}

customElements.define("toolbar-element", Toolbar);

export {Toolbar}
