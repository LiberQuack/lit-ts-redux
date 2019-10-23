import {Subject, watchable} from "../../core/subject";

class Counter extends Subject {

    @watchable
    count = 100;

    constructor(value?: number) {
        super();
        if (typeof value === "number") {
            this.count = value;
        }
    }

    increment(number = 1) {
        this.count += number;
    }

    decrement(number = 1) {
        this.count -= number;
    }

}

export {Counter};

