import {LitElement} from "lit-element";
import {Subscribable} from "../core/subscribable";

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

    subscribe(propName: string, resource: Subscribable) {
        this[propName] && (this[propName] as Subscribable).unsubscribe(this);
        this[propName] = resource.subscribe(() => this.requestUpdate());
    }

    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }


}

export { SimpleElement }
