import {Router} from "./router";
import {RouteContext} from "./common/route-context";
import {RouterInterface, RouterBuilderInterface} from "./_interfaces";
import {ResourceManager} from "./resource-manager";

type Opts = {
    router?: RouterBuilderInterface;
    resourceManager?: ResourceManager;
}

class Application implements RouterInterface {

    static Router = Router;

    private _router: RouterBuilderInterface;
    private _resourceManager: ResourceManager;

    constructor({router, resourceManager = new ResourceManager()}: Opts) {
        this._router = router;
        this._resourceManager = resourceManager;
    }

    get(resourcePath: string): any {
        return this._resourceManager.get(resourcePath)
    }

    set(resourcePath: string, value: any): void {
        this._resourceManager.set(resourcePath, value);
    }

    subscribeResourceChanges(callback): void {
        this._resourceManager.subscribe(callback)
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

    getCurrentRoute(): RouteContext {
        return this._router.getCurrentRoute();
    }

    start(): void {
        (this._router as any)._startRouter(this);
    }

}

export {Application};
