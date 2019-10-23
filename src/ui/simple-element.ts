import {LitElement} from "lit-element";
import {watch as libWatch} from "../core/subject";

const watch = libWatch(function() {this.requestUpdate()});

abstract class SimpleElement extends LitElement {

    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

}

export { SimpleElement, watch }
