import {Definition} from "../../core/definition";

const Person = new Definition().configure((define, validate) => {

    define("name", {
        type: String,
        pattern: /\w+ \w+/,
        required: true,
    });

    define("age", {
        type: Number,
        pattern: /\d{2}/,
        extraValidation: async (value: Number) => value >= 18
    });

    define("birth", {
        type: Date,
        extraValidation: async (value:any) => value.getSeconds() % 2 === 0
    });

    define("phone", {
        type: Number,
        required: true
    });

    define("zipCode", {
        pattern: /\d{5}-\d{3}/
    });

    validate("default", async (model): Promise<boolean> => {
        console.log(model);
        return true
    })

});

export {Person}
