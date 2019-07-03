import {html, LitElement} from "@polymer/lit-element";
import {appState} from "../../core/state/store";
import {AppActions} from "../../core/state/app/actions";

const menuSvg = require("../../assets/baseline-menu.svg");
const githubIcon = require("../../assets/github-icon.svg");

class Toolbar extends LitElement {

    constructor() {
        super();
        const drawerIconTemplate = html([menuSvg] as any );
        // this.iconElement = drawerIconTemplate.getTemplateElement().content.querySelector('svg');
        // this.iconElement.addEventListener('click', () => {
        //     appState.dispatch(AppActions.toggleDrawer());
        // })
    }

    _render(props) {
        //language=HTML

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
