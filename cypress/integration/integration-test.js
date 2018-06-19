/// <reference types="cypress" />

describe('Todo App Test', function () {

    let baseUrl = "http://localhost:7000";

    it("Should lazy load pages", () => {
        cy.visit(baseUrl)
            .get("about-page").should("be.empty")
            .get('a[href*="/about"]').click()
            .url().should("contain", "/about")
            .get("about-page").should("not.be.empty");
    });

    it("Should set last todo to as done", () => {
        cy.visit(baseUrl)
            .get("todo-item").last().then(elm => elm[0].shadowRoot.querySelector(".item").click())
            .get("todo-item").last().should("have.prop", "done", true);
    });

    it("Should allow entering new todos", () => {
        const todoContent = "My new Todo";
        cy.visit(baseUrl)
            .get(".todos--input").type(todoContent).type("{enter}")
            .get("todo-item").last().should("have.prop", "innerText", todoContent);
    });

    it("Should delete a todo", () => {
        cy.visit(baseUrl)
            .get("todo-item").should("have.length", "8")
            .get("todo-item").first().then(elm => {
                elm[0].shadowRoot.querySelector(".action").click();
            })
            .get("todo-item").should("have.length", 7)
    });
});