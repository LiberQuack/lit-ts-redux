import {Subscribable} from "../../core/subscribable";

class Counter extends Subscribable {

    count = 100;

    constructor(value?: number) {
        super();
        if (typeof value === "number") this.count = 500;
    }

    registerWatchedProperties(): string[] {
        return ["count"];
    }

    increment(number = 1) {
        this.count += number;
    }

    decrement(number = 1) {
        this.count -= number;
    }

}

export {Counter};

