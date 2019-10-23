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

function watch(callback: Function) {
    return function (target, propertyKey) {

        const originalDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

        if (originalDescriptor && originalDescriptor.set) {
            const originalSet = originalDescriptor.set;
            Object.defineProperty(target, propertyKey, {
                ...originalDescriptor,
                set(v: Subject) {
                    if (!(v instanceof Subject)) {
                        console.warn("Cannot listen to not subscribable instances");
                        originalSet.apply(this, v);
                    } else {
                        const oldVal = this[propertyKey];
                        if (oldVal instanceof Subject) v.unsubscribe(this);
                        originalSet.apply(this, [v]);
                        v.subscribe(callback.bind(this));
                    }
                }
            })
        } else {
            const privKey = `__${propertyKey}`;
            Object.defineProperty(target, propertyKey, {
                get() {
                    return this[privKey];
                },
                set(v: any): void {
                    if (!(v instanceof Subject)) {
                        console.warn("Cannot listen to not subscribable instances");
                        this[privKey] = v;
                    } else {
                        const oldVal = this[propertyKey];
                        if (oldVal instanceof Subject) v.unsubscribe(this);
                        this[privKey] = v.subscribe(callback.bind(this));
                    }
                }

            })

        }
    }
}

export {Subject, watchable, watch};
