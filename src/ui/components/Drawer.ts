import {html, LitElement} from "@polymer/lit-element";

class Drawer extends LitElement {

    _render(props) {
        //language=HTML
        return html`
            <a href="/" class="drawer--item">Todos</a>
            <a href="/about" class="drawer--item">About</a>
        `;
    }

    protected _createRoot(): Element | DocumentFragment {
        return this;
    }
}

customElements.define("drawer-element", Drawer);

export {Drawer}