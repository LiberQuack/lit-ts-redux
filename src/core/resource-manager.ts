import {Subject} from "./subject";

class ResourceManager extends Subject {

    private _resources = {} as Resources;

    _registerWatchedProperties(): string[] {
        return ["_resources"];
    }

    get(resourcePath?: string): any|Resources {
        if (!resourcePath) {
            return {...this._resources}
        }

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

type Resources = { [x: string]: any };

export {ResourceManager, Resources};
