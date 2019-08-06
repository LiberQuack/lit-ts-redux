import {customElement, html, property} from "lit-element";
import {Counter} from "../../application/models/counter";
import {SimpleElement} from "../simple-element";

@customElement("counter-element")
class CounterElement extends SimpleElement {

    constructor() {
        super();
        this.counter = new Counter();
    }

    @property()
    set counter(counter: Counter) {
        this.subscribe("_counter", counter);
    }

    protected render() {
        const counter = this._counter as Counter;

        //language=HTML
        return html`
            <div class="l-pad-10">
                <div>
                    <div>Counter Element</div>
                    <button @click=${() => counter.decrement()}>-</button>
                    <span>${counter.count}</span>
                    <button @click=${() => counter.increment()}>+</button>
                </div>
            </div>
        `;
    }
}

export {CounterElement}
