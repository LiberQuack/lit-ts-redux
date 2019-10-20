import {customElement, html} from "lit-element";
import {PageElement} from "../page-element";
import {HttpRequest} from "../../application/models/request";

@customElement("page-404")
class NotFoundPage extends PageElement {

    //language=HTML
    protected render() {
        return html`
            <div class="l-inline-center l-pad-15">
                <div>¯\\_(ツ)_/¯</div>
                <div>404</div>
            </div>
        `;
    }
}
