import {Subscribable} from "../../core/subscribable";

class Counter extends Subscribable {

    count = 100;

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

