"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
exports.default = (schema, data) => {
    if ((0, ramda_1.isEmpty)(data) || (0, ramda_1.isNil)(data)) {
        return ["Invalid data"];
    }
    const options = {
        errors: {
            wrap: {
                label: "",
            },
        },
        allowUnknown: false,
    };
    const { error } = schema.validate(data, options);
    const valid = error == null;
    if (valid) {
        return false;
    }
    else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        const errors = [];
        if (message)
            errors.push(message);
        return errors;
    }
};
//# sourceMappingURL=index.js.map