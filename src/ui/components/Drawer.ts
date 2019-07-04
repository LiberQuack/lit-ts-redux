import {customElement, html, LitElement} from "lit-element";
import {RootState} from "../../core/state/store";
import {app} from "../../application/app";

@customElement("drawer-element")
class Drawer extends LitElement {

    render() {
        return html`
            <a class="drawer--item" href="${app.link("home")}">Todos</a>
            <a class="drawer--item" href="${app.link("form")}">Form</a>
            <a class="drawer--item" href="${app.link("about")}">About</a>            
        `;
    }


    protected createRenderRoot(): Element | ShadowRoot {
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
