"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../../middleware/index"));
exports.default = (app) => {
    app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
    app.use(body_parser_1.default.json({ limit: "50mb" }));
    app.use((0, cors_1.default)());
    (0, index_1.default)(app);
};
//# sourceMappingURL=middleware.js.map