"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const argon2_1 = __importDefault(require("argon2"));
require("dotenv/config");
const generateToken_1 = __importDefault(require("../utils/helpers/generateToken"));
module.exports = {
    post: async (req, res) => {
        const { email, username, password } = req.body;
        const hashedPassword = await argon2_1.default.hash(password);
        new User_1.default({
            email,
            username,
            password: hashedPassword,
        }).save()
            .then(async (user) => {
            const token = await (0, generateToken_1.default)(user);
            const _a = user.toObject(), { password } = _a, userToObj = __rest(_a, ["password"]);
            return res.json({
                success: true,
                message: "Welcome!",
                user: Object.assign(Object.assign({}, userToObj), { token })
            });
        })
            .catch(() => res.json({ success: false, message: "Something went wrong" }));
    },
};
//# sourceMappingURL=register.js.map