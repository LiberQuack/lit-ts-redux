abstract class Subject {

    private _observers = [];

    subscribe(callback: () => void): this {
        // TODO: Save who subscribe
        this._observers.push(callback);
        callback();
        return this;
    }

    unsubscribe(who: any) {
        // TODO
    }

    protected runSubscribers() {
        this._observers.forEach(callback => callback());
    }

}

function watchable(target, propertyKey) {

    const privatePropertyName = `__${propertyKey as string}`;

    Object.defineProperty(target, propertyKey, {
        get() {
            return this[privatePropertyName];
        },
        set(v: any): void {
            this[privatePropertyName] = v;
            this.runSubscribers();
        },
    });

}

const litMethods = [
    "_updateState",
    "_instanceProperties",
    "_updatePromise",
    "_hasConnectedResolver",
    "_changedProperties",
    "_reflectingProperties",
    "renderRoot"
];

function watching(callback) {

    return function <T extends { new(...constructorArgs: any[]) }>(constructorFunction: T) {

        return class extends constructorFunction {

            constructor(...args) {
                super(...args);

                const target = this;
                const descriptors = Object.getOwnPropertyDescriptors(this);

                Object.keys(descriptors).filter(propName => litMethods.indexOf(propName) === -1).forEach((propName) => {

                    const originalDescriptor = descriptors[propName];

                    if (originalDescriptor && originalDescriptor.set) {
                        const originalSet = originalDescriptor.set;
                        Object.defineProperty(target, propName, {
                            ...originalDescriptor,
                            set(v: Subject) {
                                if (!(v instanceof Subject)) {
                                    originalSet.apply(this, v);
                                } else {
                                    const oldVal = this[propName];
                                    if (oldVal instanceof Subject) v.unsubscribe(this);
                                    originalSet.apply(this, [v]);
                                    v.subscribe(callback.bind(this));
                                }
                            }
                        })
                    } else {
                        const privKey = `__${propName}`;
                        Object.defineProperty(target, propName, {
                            get() {
                                return this[privKey];
                            },
                            set(v: any): void {
                                if (!(v instanceof Subject)) {
                                    this[privKey] = v;
                                } else {
                                    const oldVal = this[propName];
                                    if (oldVal instanceof Subject) v.unsubscribe(this);
                                    this[privKey] = v.subscribe(callback.bind(this));
                                }
                            }
                        })
                    }
                })
            }
        }
    }
}

export {Subject, watchable, watching};
