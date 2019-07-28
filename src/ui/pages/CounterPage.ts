import {customElement, html, LitElement} from "lit-element";
import {Counter} from "../../application/controls/counter";

@customElement("counter-page")
class CounterPage extends LitElement {

    counter1 = new Counter().subscribe(() => this.requestUpdate());
    counter2 = new Counter().subscribe(() => this.requestUpdate());

    protected render() {
        const counter1 = this.counter1;
        const counter2 = this.counter2;

        //language=HTML
        return html`
            <div class="l-pad-10">
                <div>
                    <div>Sync counter</div>
                    <button @click=${() => counter1.decrement()}>-</button>
                    <span>${counter1.count}</span>
                    <button @click=${() => counter1.increment()}>+</button>
                </div>
                <br>
                <div>
                    <div>Aync counter (each action takes 1s)</div>
                    <button @click=${() => counter2.asyncDecrement()}>-</button>
                    <span>${counter2.count}</span>
                    <button @click=${() => counter2.asyncIncrement()}>+</button>
                </div>
            </div>
        `;
    }
}
