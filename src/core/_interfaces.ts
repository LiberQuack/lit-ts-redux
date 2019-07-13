import {RouteContext} from "./common/route-context";

export interface RouterInterface {
    goTo(path: string): void;

    start(): void;

    subscribeRoutes(onchange: (info: RouteContext) => void): void;

    route()

    /**
     * Build a link given a route alias
     *
     * @param alias
     * @param params
     */
    link(alias: string, params?: { [x: string]: any }): string;
}

export interface RouterBuilderInterface extends RouterInterface {
    route(alias: string, path: string, ...middleware: ((routeContext: RouteContext, next?: () => any) => void)[]): void;
}
