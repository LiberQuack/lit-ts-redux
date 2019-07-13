import {Router} from "./_router";
import {RouteContext} from "./common/route-context";
import {RouterInterface, RouterBuilderInterface} from "./_interfaces";

type Opts = {
    router?: RouterBuilderInterface;
}

class Application implements RouterInterface {

    static Router = Router;

    private state = {};
    private _router: RouterBuilderInterface;

    constructor({router}: Opts) {
        this._router = router || new Router();
    }

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
        this._router.goTo(path);
    }

    start(): void {
        this._router.start();
    }

    subscribeRoutes(onchange: (routeContext: RouteContext) => void): void {
        this._router.subscribeRoutes(onchange);
    }

    link(alias: string, params?: { [p: string]: any }): string {
        return this._router.link(alias, params);
    }

}

export {Application};
