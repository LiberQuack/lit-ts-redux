import page from "page";
import {queryObjectMiddeware} from "./common/query-object-middleware";
import {RouteContext} from "./common/route-context";
import Context = PageJS.Context;

class Application {

    private state = {};
    private routes = [] as {[alias: string]: string}[];
    private routeSubscriptions = [] as ((routeContext: RouteContext) => void)[];

    constructor() {
        page(queryObjectMiddeware);
    }

    getState(path: string) {

    }

    setState(path: string, obj: any) {

    }

    subscribeState(path: string, onchange: (state) => {}): void {

    }

    goTo(path: string): void {
        page(path);
    }

    start(): void {
        page.start({})
    }

    route(alias:string, path:string, ...middleware: ((routeContext: RouteContext, next?: () => any) => void)[]): void {
        this.routes[alias] = path;
        page(path, ...middleware.map(mid => {
            return (pagejsRouteContext: Context, next) => {
                let routeContext = new RouteContext(alias, pagejsRouteContext);
                mid(routeContext, next);
                this.runSubscriptions(routeContext);
            }
        }))
    }

    subscribeRoutes(onchange: (info: RouteContext) => void): void {
        this.routeSubscriptions.push(onchange);
    }

    /**
     * Build a link given a route alias
     *
     * @param alias
     * @param params
     */
    link(alias: string, params?: {[x:string]: any}): string {
        return this.routes[alias];
    }

    private runSubscriptions(routeContext: RouteContext) {
        this.routeSubscriptions.forEach(callback => callback(routeContext));
    }
}

export {Application};
