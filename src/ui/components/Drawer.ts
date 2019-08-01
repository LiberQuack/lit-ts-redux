import {customElement, html, LitElement} from "lit-element";
import {app} from "../../application/app";

@customElement("drawer-element")
class Drawer extends LitElement {

    render() {
        return html`
            <a class="drawer--item" href="${app.link("counter")}">Standalone Counter</a>
            <hr>
            <a class="drawer--item" href="${app.link("counter")}">Counter</a>
            <a class="drawer--item" href="${app.link("form")}">Form</a>
            <a class="drawer--item" href="${app.link("request")}">Request Example</a>
            <a class="drawer--item" href="${app.link("about")}">About</a>            
        `;
    }


    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }
}
