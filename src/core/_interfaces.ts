import {RouteContext} from "./common/route-context";

export interface RouterInterface {
    goTo(path: string): void;

    start(): void;

    route(alias: string, path: string, ...middleware: ((routeContext: RouteContext, next?: () => any) => void)[]): void;

    subscribeRoutes(onchange: (info: RouteContext) => void): void;

    /**
     * Build a link given a route alias
     *
     * @param alias
     * @param params
     */
    link(alias: string, params?: { [x: string]: any }): string;
}
