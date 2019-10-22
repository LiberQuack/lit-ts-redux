import {RouteContext} from "./common/route-context";
import {Application} from "./application";

export interface RouterInterface {
    goTo(path: string): void;

    subscribeRoutes(onchange: (info: RouteContext) => void): void;

    getCurrentRoute(): RouteContext;

    /**
     * Build a link given a route alias
     *
     * @param alias
     * @param params
     */
    link(alias: string, params?: { [x: string]: any }): string;
}

export interface RouteMiddlewareCallback {
    routeContext: RouteContext
    app: Application,
};

export interface RouterBuilderInterface extends RouterInterface {


    route(alias: string, path: string, ...middleware: (({routeContext, app}: RouteMiddlewareCallback, next?: () => any) => void)[]): void;
}
