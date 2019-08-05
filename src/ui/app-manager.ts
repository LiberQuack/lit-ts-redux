import "./components/toolbar";
import "./components/drawer";
import {app} from "../application/app";
import {customElement, LitElement} from "lit-element";

@customElement("app-manager")
class AppManager extends LitElement {

    constructor() {
        super();
        app.subscribeRoutes(async routeContext => {
            switch (routeContext.alias) {
                case "form":
                    return await import("./pages/form-page");

                case "request":
                    return await import("./pages/github-page");

                case "counter":
                    return await import("./pages/counter-page");
            }
        });

        this.addEventListener("inject", async (e: CustomEvent) => {

            const elm = e.detail.element;
            const mapping = elm.getAttributeNames().filter(it => /inject-/.test(it)).reduce((mapping, attrName) => {
                const propName = attrName.replace(/^inject-/, "");
                return {...mapping, [propName]: elm.getAttribute(attrName)}
            }, {});
            const properties = Object.keys(mapping);


            app.subscribeResourceChanges(() => {
                //TODO: Improve... prevent injection if they keep the same of the last time
                const injection = properties.reduce((propResources, propName) => {
                    const resourceName = mapping[propName];
                    propResources[propName] = app.get(resourceName);
                    return propResources;
                }, {});

                Object.assign(elm, injection);
            });

            // TODO: on elm disconnectedCallback we need to unsubscribe
        })

    }

    protected createRenderRoot(): Element | ShadowRoot {
        return undefined;
    }
}
