import {customElement, html, LitElement} from "lit-element";
import {app} from "../../application/app";
import {openAppikInspector} from "../../core/ui/appik-inspector";

@customElement("drawer-element")
class Drawer extends LitElement {

    render() {
        return html`
            <a class="drawer--item" href="${app.link("counter")}">Counter</a>
            <a class="drawer--item" href="${app.link("form")}">Form</a>
            <a class="drawer--item" href="${app.link("github")}">Github Stats</a>
            <span class="drawer--item" @click="${() => openAppikInspector(app)}">Open Inspector</span>            
        `;
    }


    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }
}
