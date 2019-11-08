import {LitElement} from "lit-element";
import {watching as libWatching} from "../core/subject";

const watching = libWatching(function () {
    this.requestUpdate()
});

abstract class SimpleElement extends LitElement {

    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

}

export { SimpleElement, watching }
