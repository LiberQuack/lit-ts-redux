import {Application} from "./application";

type ResourceMiddleware = ((
    {value, next, app, operation}:{value: any, next: (value:any) => void, app: Application, operation: "get"|"set"|"remove"}) => void);

class ResourceManager {

    private _app = null as Application;
    private _resources = {} as {[x:string]:any};
    private _middlewares: {name:string, matcher: RegExp, middlewares: []};

    async get(resourcePath: string): Promise<any> {

    }

    async set(resourcePath: string, value: any): Promise<void> {

    }

    async remove(resourcePath: string, value?: any): Promise<any> {

    }

    addMiddleware(name:string, pattern: RegExp, ...middlewares: ResourceMiddleware[]) {

    }

    subscribeResourceChanges(pattern: RegExp, onchange: (path: string, resource: any) => {}): void {

    }
}

export {ResourceManager};
