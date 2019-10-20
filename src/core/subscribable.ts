abstract class Subscribable {

    private _subscribers = [];

    constructor() {
        const properties = this._registerWatchedProperties();
        properties.forEach(propertyName => {
            const privatePropertyName = `__${propertyName}`;
            Object.defineProperty(this, propertyName, {
                get() {
                    return this[privatePropertyName];
                },
                set(v: any): void {
                    this[privatePropertyName] = v;
                    this.runSubscribers();
                },
            });
        });
    }

    subscribe(callback: () => void): this {
        // TODO: Save who subscribe
        this._subscribers.push(callback);
        callback();
        return this;
    }

    unsubscribe(who: any) {
        // TODO
    }

    protected runSubscribers() {
        this._subscribers.forEach(callback => callback());
    }

    protected abstract _registerWatchedProperties(): string[];

}

export {Subscribable};
