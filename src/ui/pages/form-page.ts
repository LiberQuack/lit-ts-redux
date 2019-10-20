import {customElement, html, property} from "lit-element";
import {Person} from "../../application/definitions/person";
import {PageElement} from "../page-element";

@customElement("page-form")
class FormPage extends PageElement {

    @property()
    person = Person.model().subscribe(() => this.requestUpdate());

    protected render() {
        const {person} = this;

        return html`
            <div class="l-pad-10">
                <div class="l-row">
                    <div>
                        ${person.fields.map(field => html`
                            <div class="field">
                                <div>field: ${field.name}</div>
                                <input class="${field.cssState}" @input=${e => field.setValue(e.target.value || undefined)} @blur=${e => field.validate()}>
                                <div>
                                    <div><strong>css</strong>: ${field.cssState}</div>
                                    <div><strong>required</strong>: ${field.required.toString()}</div>
                                    <div><strong>reason</strong>: ${field.invalidReason}</div>
                                    <div><strong>valid</strong>: ${field.valid}</div>
                                    <div><strong>dirty</strong>: ${field.dirty}</div>
                                </div>
                            </div>
                            <br>
                        `)}
                        <button @click=${() => person.validate()}>Enviar</button>
                    </div>
                    
                    <div style="position: sticky; top: 1px;">
                        <div><strong>Model validators</strong>:<br> ${person.validatorNames.join(", ")}</div><br>
                        <div><strong>Model valid</strong>:<br> ${person.valid}</div><br>
                        <div><strong>Plain Obj:</strong></div>
                        <pre>${
                            JSON.stringify(person.plainObj(), null, 2)
                        }</pre>
                    </div>
                    
                </div>
            </div>    
        `;
    }


    protected createRenderRoot() {
        return this;
    }
}
