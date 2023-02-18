"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("users", UserSchema);
//# sourceMappingURL=User.js.map