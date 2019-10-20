import {html, LitElement, property} from "lit-element";
import {Application} from "../application";

import "./appik-console";


class AppikInspector extends LitElement {

    private _app: Application;

    @property()
    set app(app: Application) {
        app.subscribeResourceChanges(() => this.requestUpdate());
        app.subscribeRoutes(() => this.requestUpdate());
        this._app = app;
    }

    render() {
        //language=HTML
        const {_router} = this._app;
        const resources = this.getResources();

        const routeAliases = Object.keys(_router._routes);
        const resourceAliases = Object.keys(resources);

        return html`

            <style>
                * {
                    box-sizing: border-box;
                }
                
                button {
                    cursor: pointer;
                    padding: 10px;
                    border: none;
                    background: #aaa;
                    border-radius: 2px;
                    box-shadow: 0 2px 2px rgba(0,0,0,.45);
                    outline: none;
                    transition: .2s
                }
                
                button:focus, button:hover {
                    background: #fff;
                }
            
                :host {
                    font-family: Roboto, arial, sans-serif;
                    color: #444;
                    display: block;
                    background: #555;
                    box-shadow: 0 5px 25px -5px rgba(0,0,0,.5);
                    z-index: 15000;
                    height: 100%;
                }
            </style>
            
            <div style="display: flex; height: 100%">
                
                <div style="flex-grow: 1; flex-shrink: 0;color: #bbb">
                    <div style="padding: 10px">
                        <strong>Routes:</strong> 
                        <div>
                            ${routeAliases.map(it => html`
                                <button @click="${() => this._app.goTo(_router._routes[it])}" style="font-weight: ${it == this._app._router._currentRouteContext.alias ? 'bold' : 'normal'}">${it}</button>
                            `)}
                        </div>
                    </div>
                    <div style="padding: 10px">
                        <strong>
                            Resources:
                        </strong> 
                        <div>
                            ${resourceAliases.map(it => html`
                                <button @click="${() => this.inputResourceCode(it)}">${it}</button>
                            `)}
                        </div>
                    </div>
                </div>
                
                <appik-console .app="${this._app}"/>
            </div>
            
        `;
    }

    inputResourceCode(resourceName) {
        this.renderRoot.querySelector(`appik-console`).resource = resourceName;
    }

    private getResources() {
        return this._app._resourceManager._resources;
    }
}

const openAppikInspector = (() => {
    let popup = undefined as Window;

    return function (app: Application): void {
        if (!customElements.get("appik-inspector")) {
            customElements.define("appik-inspector", AppikInspector);
        }

        const inspectorElm = document.createElement("appik-inspector") as AppikInspector;
        inspectorElm.app = app;

        if (popup) {
            popup.close();
        }

        popup = window.open(window.location.origin, 'popUpWindow', 'height=500,width=1080,left=750,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=no');
        popup.addEventListener("DOMContentLoaded", () => {
            popup.document.head.innerHTML = "";
            popup.document.body.innerHTML = "";
            popup.document.body.style.margin = "0";
            popup.document.body.parentElement.style.height = "100%";
            popup.document.body.style.height = "100%";
            popup.document.title = "Application Inspector";
            popup.document.body.appendChild(inspectorElm);
        });
    }
})();

export {openAppikInspector, AppikInspector}
