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

    async asyncDecrement(number = 1) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.count -= number;
                resolve();
            }, 1000);
        });
    }

    async asyncIncrement(number = 1) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.count += number;
                resolve();
            }, 1000);
        });
    }

}

export {Counter};
