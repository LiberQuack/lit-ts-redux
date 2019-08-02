import {customElement, html} from "lit-element";
import {Counter} from "../../application/models/counter";
import {PotatoElement} from "../potato-element";

@customElement("counter-page")
class CounterPage extends PotatoElement {

    constructor() {
        super();
        this.counter = new Counter();
    }

    set counter(counter: Counter) {
        //TODO _counter.unsubscribe();
        this["_counter"] = counter.subscribe(() => this.requestUpdate());
    }

    protected render() {
        const counter = this._counter as Counter;

        //language=HTML
        return html`
            <div class="l-pad-10">
                <div>
                    <div>Sync counter</div>
                    <button @click=${() => counter.decrement()}>-</button>
                    <span>${counter.count}</span>
                    <button @click=${() => counter.increment()}>+</button>
                </div>
            </div>
        `;
    }
}
