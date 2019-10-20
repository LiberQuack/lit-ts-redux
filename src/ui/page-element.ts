import {SimpleElement} from "./simple-element";
import {app} from "../application/app";

abstract class PageElement extends SimpleElement {

    constructor() {
        super();
        app.subscribeRoutes((routeContext) => {
            const matchRoute = routeContext.alias === this.getRouteName();
            this.style.display = matchRoute ? '' : 'none';
        })
    }

    getRouteName() {
        return this.tagName.toLocaleLowerCase().replace(/^page-/, "");
    }

}

export {PageElement};
