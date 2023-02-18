"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
exports.default = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    };
    return new Promise((resolve) => {
        jsonwebtoken_1.default.sign(payload, process.env.APP_SECRET, { expiresIn: "90d" }, (err, token) => {
            if (err)
                throw err;
            resolve(token);
        });
    });
};
//# sourceMappingURL=generateToken.js.map