import {customElement, html, property} from "lit-element";
import {PageElement} from "../page-element";
import {JsonRequest} from "../../application/models/request";

@customElement("request-page")
class RequestPage extends PageElement {

    @property()
    set githubreq(req: JsonRequest<any>) {
        this.subscribe("_gitReq", req);
    }

    //language=HTML
    protected render() {
        const req = this._gitReq as JsonRequest<any>;

        return html`
            <section class="l-pad-10 l-inline-center">
                <div>
                    <p>Enter your github user name</p>
                    <input type="text" @blur="${() => req.start()}">
                </div>
                
                <div>
                    <div><br>Loading icon</div>
                    
<pre>Member since:
Projects:
Bigger Project:
Last commit:
</pre>
                </div>
                
<div><br>Case any error happen</div>
            </section>
        `;
    }
}
