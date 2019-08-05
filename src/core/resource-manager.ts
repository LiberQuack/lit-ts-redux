import {Subscribable} from "./subscribable";

class ResourceManager extends Subscribable {

    private _resources = {} as {[x:string]:any};

    registerWatchedProperties(): string[] {
        return ["_resources"];
    }

    get(resourcePath: string): any {
        return this._resources[resourcePath];
    }

    set(resourcePath: string, value: any): void {
        this._resources = {...this._resources, [resourcePath]: value};
    }

    remove(resourcePath: string): any {
        const {[resourcePath]: removedResource, ...resources} = this._resources;
        this._resources = resources;
        return removedResource;
    }

}

export {ResourceManager};
