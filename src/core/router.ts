import page from "page";
import {RouteContext} from "./common/route-context";
import {RouteMiddlewareCallback, RouterBuilderInterface} from "./_interfaces";
import {Application} from "./application";
import Context = PageJS.Context;

class Router implements RouterBuilderInterface {

    private _started = false;
    private _app = null as Application;
    private _routes = {} as {[alias: string]: string};
    private _routeSubscriptions = [] as ((routeContext: RouteContext) => void)[];
    private _currentRouteContext = null as RouteContext;

    constructor() {
        const queryObjectMiddeware = (req: Context, next: () => any) => {
            req.query = req.querystring.split("&").reduce((resultSoFar, part) => {
                const match = /(.+?\b)=?(.*)/.exec(part);
                if (match) resultSoFar[match[1]] = match[2];
                return resultSoFar;
            }, {});
            return next();
        };

        page(queryObjectMiddeware);
    }

    goTo(path: string): void {
        page(path);
    }

    protected _startRouter(app: Application): void {
        this._started = true;
        this._app = app;
        page.start({});
    }

    route(alias: string, path: string, ...middleware: (({routeContext, app}: RouteMiddlewareCallback, next?: () => any) => void)[]): void {
        this._routes[alias] = path;
        page(path, ...middleware.map(mid => {
            return (pagejsRouteContext: Context, next) => {
                let routeContext = new RouteContext(alias, pagejsRouteContext);
                mid({app: this._app, routeContext}, next);
                this._currentRouteContext = routeContext;
                this.runSubscriptions(routeContext);
            }
        }))
    }

    subscribe(onchange: (info: RouteContext) => void): void {
        this._routeSubscriptions.push(onchange);
        if (this._started) {
            onchange(this._currentRouteContext);
        }
    }

    link(alias: string, params?: { [x: string]: any }): string {
        let link = this._routes[alias] || "";
        return link.replace(/:(\w+)\b/g, (substring, key) => params[key]);
    }

    runSubscriptions(routeContext: RouteContext) {
        this._routeSubscriptions.forEach(callback => callback(routeContext));
    }

    getCurrentContext(): RouteContext {
        return this._currentRouteContext;
    }

}

export {Router};
