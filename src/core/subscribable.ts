abstract class Subscribable {

    private _subscribers = [];

    constructor() {
        const properties = this.registerWatchedProperties();
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
        this._subscribers.push(callback);
        return this;
    }

    protected runSubscribers() {
        this._subscribers.forEach(callback => callback());
    }

    abstract registerWatchedProperties(): string[];

}

export {Subscribable};
