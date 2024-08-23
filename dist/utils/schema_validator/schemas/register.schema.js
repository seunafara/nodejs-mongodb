"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.object({
    email: joi_1.default.string()
        .required()
        .trim()
        .email()
        .messages({ "string.empty": "Email address cannot be empty" })
        .messages({ "string.required": "Email Address is required" })
        .messages({ "any.invalid": "Email address is invalid" }),
    password: joi_1.default.string()
        .required()
        .messages({ "string.empty": "Password cannot be empty" })
        .messages({ "string.required": "Password is required" })
        .messages({ "any.invalid": "Enter a strong password" }),
    firstName: joi_1.default.string()
        .min(1)
        .max(30)
        .trim()
        .regex(/^[a-zA-Z]+$/)
        .message("First Name can only include letters"),
    lastName: joi_1.default.string()
        .min(1)
        .max(30)
        .trim()
        .regex(/^[a-zA-Z]+$/)
        .message("Last Name can only include letters"),
});
//# sourceMappingURL=register.schema.js.map