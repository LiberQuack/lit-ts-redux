import {LitElement} from "@polymer/lit-element";

declare module "@polymer/lit-element" {
    export interface LitElement extends HTMLElement {
        [x: string]:any
    }
}