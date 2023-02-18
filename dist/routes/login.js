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
const generateToken_1 = __importDefault(require("../utils/helpers/generateToken"));
require("dotenv/config");
module.exports = {
    post: async (req, res) => {
        const { usernameOrEmail, password: pass } = req.body;
        User_1.default.findOne((usernameOrEmail === null || usernameOrEmail === void 0 ? void 0 : usernameOrEmail.includes("@"))
            ? { email: usernameOrEmail }
            : { username: usernameOrEmail })
            .select("+password")
            .then(async (user) => {
            if (!user) {
                return res.json({
                    success: "false",
                    message: "Invalid login",
                });
            }
            const valid = await argon2_1.default.verify(user.password, pass);
            if (!valid) {
                return res.json({
                    success: "false",
                    message: "Invalid login",
                });
            }
            const _a = user.toObject(), { password } = _a, userToObj = __rest(_a, ["password"]);
            return (0, generateToken_1.default)(user).then((token) => {
                return res.json({
                    success: true,
                    message: "Welcome!",
                    user: Object.assign({ token }, userToObj),
                });
            });
        })
            .catch(() => res.json({ success: false, message: "Something went wrong" }));
    },
};
//# sourceMappingURL=login.js.map