import "./components/toolbar";
import "./components/drawer";
import {customElement, LitElement} from "lit-element";

@customElement("app-manager")
class AppManager extends LitElement {

    constructor() {
        super();
    }

    protected createRenderRoot(): Element | ShadowRoot {
        return undefined;
    }
}
