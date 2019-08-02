import "../ui/components/Toolbar";
import "../ui/components/Drawer";
import {app} from "../application/app";
import {customElement, LitElement} from "lit-element";

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
            const elm = evt.composedPath()[0] as HTMLElement;
            const mapping = elm.getAttributeNames().filter(it => /inject-/.test(it)).reduce((mapping, attrName) => {
                const propName = attrName.replace(/^inject-/, "");
                return {...mapping, [propName]: elm.getAttribute(attrName)}
            }, {});
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

