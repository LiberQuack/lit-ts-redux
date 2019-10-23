import {Router} from "./router";
import {RouteContext} from "./common/route-context";
import {RouterInterface, RouterBuilderInterface} from "./_interfaces";
import {ResourceManager} from "./resource-manager";

class Application {

    static Router = Router;

    public readonly router: RouterBuilderInterface;
    public readonly resources: ResourceManager;

    constructor({router, resourceManager = new ResourceManager()}: Opts) {
        this.router = router;
        this.resources = resourceManager;
    }

    start(): void {
        (this.router as any)._startRouter(this);
    }

}

type Opts = {
    router: RouterBuilderInterface;
    resourceManager?: ResourceManager;
}

export {Application};
