import {customElement, html, property} from "lit-element";
import {PageElement} from "../page-element";
import {Counter} from "../../application/models/counter";

import "../components/counter-element";

@customElement("page-counter")
class CounterPage extends PageElement {

    @property()
    counters = [new Counter(100), new Counter(100)];

    protected render() {
        //language=HTML
        return html`
            <div class="l-pad-10">
                ${this.counters.map(it => html`
                    <counter-element .counter="${it}"></counter-element>
                `)}
                <hr>
                <button @click="${this.addCounter}">Add Counter</button>
            </div>
        `;
    }

    addCounter() {
        this.counters = [...this.counters, new Counter(100)];
    }
}
