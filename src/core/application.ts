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
        this._router = router;
    }

    async get(resourcePath: string): Promise<any> {

    }

    set(resourcePath: string, value: any): void {

    }

    subscribeResourceChanges(pattern: RegExp, onchange: (path: string, resource: any) => {}): void {

    }

    goTo(path: string): void {
        this._router.goTo(path);
    }

    subscribeRoutes(onchange: (routeContext: RouteContext) => void): void {
        this._router.subscribeRoutes(onchange);
    }

    link(alias: string, params?: { [p: string]: any }): string {
        return this._router.link(alias, params);
    }

    startRouter(): void {
        (this._router as any)._startRouter(this);
    }

}

export {Application};
