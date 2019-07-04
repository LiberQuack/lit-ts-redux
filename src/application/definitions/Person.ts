import {Definition} from "../../core/definition";

const Person = new Definition().configure((define) => {

    define("name", {
        type: String,
        pattern: /\w+ \w+/,
    });

    define("age", {
        type: Number,
        pattern: /\d{2}/,
        required: true,
        extraValidation: async model => true
    });

    define("birth", {
        type: Number
    });

});

export {Person}
