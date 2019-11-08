import {customElement, html} from "lit-element";
import {Counter} from "../../application/models/counter";
import {SimpleElement, watching} from "../simple-element";

@customElement("counter-element")
@watching
class CounterElement extends SimpleElement {

    counter: Counter = undefined;

    protected render() {
        if (!this.counter) {
            return html`<div>No model attached</div>`
        }

        return html`
            <div>
                <div>
                    <div>Counter Element</div>
                    <button @click=${() => this.counter.decrement()}>-</button>
                    <span>${this.counter.count}</span>
                    <button @click=${() => this.counter.increment()}>+</button>
                </div>
            </div>
        `;
    }
}

export {CounterElement}
