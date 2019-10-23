import {customElement, html} from "lit-element";
import {PageElement} from "../page-element";
import {HttpRequest} from "../../application/models/request";

const USER_URL_PART = "https://api.github.com/users";

@customElement("page-github")
class RequestPage extends PageElement {

    //language=HTML
    protected render() {
        const ghUserReq = this.ghUserReq as HttpRequest;

        return html`
            <section class="l-pad-10 l-inline-center">
                <div class="card">
                    <p>Enter your github user name</p>
                    <input type="text" @blur="${e => ghUserReq.url = `${USER_URL_PART}/${e.target.value}`}">
                    <div ?hidden="${!ghUserReq.url}">
                        <p>
                            <strong>Your github url is:</strong>
                            <br>${ghUserReq.url}
                        </p>
                        <button class="form--button" @click="${() => ghUserReq.run()}">GET USER INFO</button> 
                    </div>
                </div>
                
                <br>
                
                <div class="card" ?hidden="${ghUserReq.runCounts === 0}">
                    <div ?hidden="${!ghUserReq.loading}">Loading...</div>
                    ${ghUserReq.responseBody && html`
                        <div>Member since: ${new Date(ghUserReq.responseBody.created_at).getFullYear()}</div>                    
                        <div>Projects Count: ${ghUserReq.responseBody.public_repos}</div>                    
                    `}
                </div>
            </section>
        `;
    }
}
