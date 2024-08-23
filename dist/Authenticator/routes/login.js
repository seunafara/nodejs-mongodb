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
const model_1 = __importDefault(require("../model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../utils");
require("dotenv/config");
exports.default = {
    post: async (req, res) => {
        const { email, password: pass } = req.body;
        model_1.default.findOne({ email })
            .select("+password")
            .then(async (user) => {
            if (!user) {
                console.log("Invalid user");
                return res.status(422).json({
                    success: 0,
                    errors: ["Invalid login"],
                });
            }
            bcrypt_1.default.compare(pass, user.password).then((isMatch) => {
                if (!isMatch) {
                    console.log("Invalid password");
                    return res.status(422).json({
                        success: 0,
                        errors: ["Invalid login"],
                    });
                }
                const _a = user.toObject(), { password } = _a, userRest = __rest(_a, ["password"]);
                return (0, utils_1.generateToken)(user).then((token) => {
                    return res.status(200).json({
                        success: 1,
                        message: "Welcome!",
                        user: {
                            settings: userRest.settings,
                            _id: userRest._id,
                            email: userRest.email,
                            token
                        }
                    });
                });
            });
        })
            .catch(() => res.json({
            success: false,
            errors: ["Something went wrong. Contact support@predeet.com"],
        }));
    },
};
//# sourceMappingURL=login.js.map