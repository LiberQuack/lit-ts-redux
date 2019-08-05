import {customElement, html} from "lit-element";
import {PageElement} from "../page-element";

@customElement("request-page")
class RequestPage extends PageElement {

    //language=HTML
    protected render() {
        return html`
            <div class="l-pad-10">
                <span>potao</span>
            </div>
        `;
    }
}
