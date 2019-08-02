import {LitElement} from "lit-element";

abstract class PotatoElement extends LitElement {

    constructor() {
        super();
        this.dispatchConnectRequest();
    }

    dispatchConnectRequest() {
        this.dispatchEvent(new CustomEvent("connect", {bubbles: true}));
    }

    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }
}

export { PotatoElement }
