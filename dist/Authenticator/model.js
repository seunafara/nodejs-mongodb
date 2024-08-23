"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    guard: {
        resetCode: {
            type: String,
        },
    },
    settings: {
        notifications: {
            email: {
                type: Boolean,
                default: true,
            },
        },
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("users", UserSchema);
//# sourceMappingURL=model.js.map