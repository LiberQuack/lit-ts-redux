import {RouteContext} from "./common/route-context";
import {_router} from "./_router";
import {RouterInterface} from "./_interfaces";

class Application implements RouterInterface {

    private state = {};
    private router = new _router();

    getState(path: string) {

    }

    setState(path: string, obj: any) {

    }

    removeState(path: string): any {

    }

    interceptSetState(pattern: RegExp, middleware) {

    }

    subscribeState(path: string, onchange: (state) => {}): void {

    }

    goTo(path: string): void {
        this.router.goTo(path);
    }

    route(alias: string, path: string, ...middleware: ((routeContext: RouteContext, next?: () => any) => void)[]): void {
        this.router.route(alias, path, ...middleware);
    }

    start(): void {
        this.router.start();
    }

    subscribeRoutes(onchange: (routeContext: RouteContext) => void): void {
        this.router.subscribeRoutes(onchange);
    }

    link(alias: string, params?: { [p: string]: any }): string {
        return this.router.link(alias, params);
    }

}

export {Application};
