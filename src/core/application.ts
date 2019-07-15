import {Router} from "./_router";
import {RouteContext} from "./common/route-context";
import {RouterInterface, RouterBuilderInterface} from "./_interfaces";

type Opts = {
    router?: RouterBuilderInterface;
}

class Application implements RouterInterface {

    static Router = Router;

    private _resources = {} as {[x:string]:any};
    private _router: RouterBuilderInterface;

    constructor({router}: Opts) {
        this._router = router || new Router();
    }

    async get(path: string): Promise<any> {

    }

    set(path: string, value: any): void {

    }

    removeResource(path: string): any {

    }

    interceptSetResrouce(pattern: RegExp, ...middlewares) {

    }

    subscribeResourceChanges(pattern: RegExp, onchange: (path: string, resource: any) => {}): void {

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
