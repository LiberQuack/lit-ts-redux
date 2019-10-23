import {customElement, html, property} from "lit-element";
import {Counter} from "../../application/models/counter";
import {SimpleElement, watch} from "../simple-element";

@customElement("counter-element")
class CounterElement extends SimpleElement {

    @watch
    counter = new Counter();

    protected render() {
        //language=HTML
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
