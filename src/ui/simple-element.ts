import {LitElement} from "lit-element";

abstract class SimpleElement extends LitElement {

    constructor() {
        super();
    }

    connectedCallback(): void {
        super.connectedCallback();
        if (this.getAttributeNames().filter(it => /^inject-/.test(it)).length > 0) {
            this.dispatchInjectRequest();
        }
    }

    dispatchInjectRequest() {
        this.dispatchEvent(new CustomEvent("inject", {bubbles: true, detail: {element: this}}));
    }

    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }
}

export { SimpleElement }
