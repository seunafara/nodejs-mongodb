"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const schema_validator_1 = __importDefault(require("../../utils/schema_validator"));
const register_schema_1 = __importDefault(require("../../utils/schema_validator/schemas/register.schema"));
const model_1 = __importDefault(require("../model"));
const utils_1 = require("../utils");
const config_1 = require("../../config");
exports.default = {
    post: async (req, res) => {
        const errors = (0, schema_validator_1.default)(register_schema_1.default, req.body);
        if (errors && !(0, ramda_1.isEmpty)(errors)) {
            return res.status(422).json({
                success: 0,
                errors,
            });
        }
        const { email, password } = req.body;
        const emailLowerCase = email.toLowerCase();
        const user = await model_1.default.findOne({ email: emailLowerCase });
        if (user)
            return res
                .status(422)
                .json({ success: 0, errors: ["User already exists"] });
        const salt = await (0, utils_1.genSalt)();
        if (typeof salt !== "string" && typeof salt !== "number") {
            throw new Error("Invalid salt");
        }
        const hash = await (0, utils_1.bcryptHash)(password, salt);
        new model_1.default({
            email: emailLowerCase,
            password: hash,
        })
            .save()
            .then(async (newUser) => {
            const token = await (0, utils_1.generateToken)(newUser);
            return res.json({
                success: 1,
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    token,
                },
            });
        })
            .catch((err) => {
            return res.status(422).json({
                success: 0,
                errors: [config_1.__isProd__ ? "Error registering user" : err],
            });
        });
    },
};
//# sourceMappingURL=register.js.map