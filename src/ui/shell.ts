import "../ui/components/Toolbar";
import "../ui/components/Drawer";
import {app} from "../application/app";
import {LitElement, html, customElement} from "lit-element";

@customElement("injector-element")
class InjectorElement extends LitElement {

    constructor() {
        super();
        app.subscribeRoutes(async routeContext => {
            switch (routeContext.alias) {
                case "form":
                    return await import("./pages/FormPage");

                case "request":
                    return await import("./pages/RequestPage");

                case "counter":
                    return await import("./pages/CounterPage");
            }
        });

        addEventListener("connect", async (evt: CustomEvent) => {
            const elm = evt.composedPath()[0];
            const mapping = evt.detail;
            const properties = Object.keys(mapping);
            const propResources = {};
            await Promise.all(properties.map(async (prop) => {
                propResources[prop] = await app.get(mapping[prop]);
            }));
            Object.assign(elm, propResources);
        })

    }

    protected createRenderRoot(): Element | ShadowRoot {
        return undefined;
    }
}

