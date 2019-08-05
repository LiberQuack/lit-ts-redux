import {SimpleElement} from "./simple-element";
import {app} from "../application/app";

abstract class PageElement extends SimpleElement {

    constructor() {
        super();
        app.subscribeRoutes((routeContext) => {
            const matchRoute = routeContext.alias === this.getAttribute("route");
            this.style.display = matchRoute ? '' : 'none';
        })
    }

    connectedCallback(): void {
        super.connectedCallback();
        if (!this.getAttributeNames().find(it => it === "route")) {
            console.warn("Page elements must have attribute 'route'", this);
        }
    }

}

export {PageElement};
