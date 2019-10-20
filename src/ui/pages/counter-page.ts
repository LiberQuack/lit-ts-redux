import {customElement, html} from "lit-element";
import {PageElement} from "../page-element";

import "../components/counter-element";

@customElement("page-counter")
class CounterPage extends PageElement {

    protected render() {

        //language=HTML
        return html`
            <div class="l-pad-10">
                <counter-element></counter-element>
                <counter-element inject-counter="counter"></counter-element>
            </div>
        `;
    }
}
