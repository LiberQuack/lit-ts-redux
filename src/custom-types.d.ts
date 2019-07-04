import {LitElement} from "lit-element";

declare module "lit-element" {
    export interface LitElement extends HTMLElement {
        [x: string]:any
    }
}
