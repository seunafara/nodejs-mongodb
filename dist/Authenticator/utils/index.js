"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.bcryptHash = exports.genSalt = void 0;
const util_1 = require("util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.genSalt = (0, util_1.promisify)(bcrypt_1.default.genSalt);
exports.bcryptHash = (0, util_1.promisify)(bcrypt_1.default.hash);
const generateToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    };
    return new Promise((resolve) => {
        jsonwebtoken_1.default.sign(payload, process.env.APP_SECRET, { expiresIn: "10d" }, (err, token) => {
            if (err)
                throw err;
            resolve(token);
        });
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=index.js.map