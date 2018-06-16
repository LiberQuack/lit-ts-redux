import {html, LitElement} from "@polymer/lit-element";
import {settings} from "../../scripts/environment/settings";

class Drawer extends LitElement {

    _render(props) {
        //language=HTML
        return html`
            <a href$="${settings.app.routes.root}" class="drawer--item">Todos</a>
            <a href$="${settings.app.routes.about}" class="drawer--item">About</a>
            
            ${settings.environmentName === "gh" ? 
                html`<a href$="${settings.app.routes.bundle}" class="drawer--item">Bundle Analyzes</a>` : ""
            }
        `;
    }

    protected _createRoot(): Element | DocumentFragment {
        return this;
    }
}

customElements.define("drawer-element", Drawer);

export {Drawer}