import {html, LitElement} from "@polymer/lit-element";
import {settings} from "../../core/environment/settings";
import {ReduxLitElement} from "../util/ReduxLitElement";
import {RootState} from "../../core/state/store";
import {app} from "../../application/app";

class Drawer extends ReduxLitElement {

    _render(props) {
        //language=HTML
        return html`
            <a href$="${app.link("home")}" class="drawer--item">Todos</a>
            <a href$="${app.link("about")}" class="drawer--item">About</a>
            
            ${settings.environmentName === "gh" ? 
                html`<a href$="${settings.app.routes.bundle}" class="drawer--item" target="_blank" rel="noopener">Bundle Analyzes</a>` : ""
            }
        `;
    }

    protected _createRoot(): Element | DocumentFragment {
        return this;
    }

    stateReceiver(state: RootState): void {
        if (state.app.ui.drawer_open) {
            this.classList.add("isVisible");
        } else {
            this.classList.remove("isVisible");
        }
    }
}

customElements.define("drawer-element", Drawer);

export {Drawer}
