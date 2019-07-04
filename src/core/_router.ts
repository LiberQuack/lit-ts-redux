import page from "page";
import {RouteContext} from "./common/route-context";
import {RouterInterface} from "./_interfaces";
import Context = PageJS.Context;

class _router implements RouterInterface {

    private started = false;
    private routes = [] as {[alias: string]: string}[];
    private routeSubscriptions = [] as ((routeContext: RouteContext) => void)[];
    private currentRouteContext = null as RouteContext;

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

    start(): void {
        this.started = true;
        page.start({})
    }

    route(alias: string, path: string, ...middleware: ((routeContext: RouteContext, next?: () => any) => void)[]): void {
        this.routes[alias] = path;
        page(path, ...middleware.map(mid => {
            return (pagejsRouteContext: Context, next) => {
                let routeContext = new RouteContext(alias, pagejsRouteContext);
                mid(routeContext, next);
                this.currentRouteContext = routeContext;
                this.runSubscriptions(routeContext);
            }
        }))
    }

    subscribeRoutes(onchange: (info: RouteContext) => void): void {
        this.routeSubscriptions.push(onchange);
        if (this.started) {
            onchange(this.currentRouteContext);
        }
    }

    link(alias: string, params?: { [x: string]: any }): string {
        let link = this.routes[alias] || "";
        return link.replace(/:(\w+)\b/g, (substring, key) => params[key]);
    }

    runSubscriptions(routeContext: RouteContext) {
        this.routeSubscriptions.forEach(callback => callback(routeContext));
    }
}

export {_router};
