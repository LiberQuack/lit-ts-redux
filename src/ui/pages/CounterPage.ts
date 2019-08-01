import {customElement, html, LitElement, property} from "lit-element";
import {Counter} from "../../application/models/counter";

@customElement("counter-page")
class CounterPage extends LitElement {

    @property()
    counter: Counter = new Counter();

    resourceMapper = {
        counter: "counter"
    };

    constructor() {
        super();
        this.dispatchEvent(new CustomEvent("connect", {bubbles: true, detail: this.resourceMapper}))
    }

    protected render() {
        const counter = this.counter;

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
