import {customElement, html, LitElement} from "lit-element";
import {app} from "../../application/app";
import {until} from "lit-html/directives/until";

@customElement("counter-page")
class CounterPage extends LitElement {

    connectedCallback(): void {
        super.connectedCallback();
        app.subscribeResourceChanges("count", (path1, resource) => {

        })
    }

    async step(direction: boolean) {
        const count = await app.get("count");
        app.set("count", count + (direction ? 1 : -1));
    }

    protected render() {
        let count = app.get("count");

        //language=HTML
        return html`
            <div class="l-pad-10">
                <button @click=${() => this.step(false)}>-</button>
                <span>${until(count)}</span>
                <button @click=${() => this.step(true)}>+</button>
            </div>
        `;
    }
}
