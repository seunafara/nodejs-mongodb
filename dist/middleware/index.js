"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFileNamesPaths_1 = __importDefault(require("../utils/getFileNamesPaths"));
exports.default = (app) => {
    const MIDDLEWARE_DIR = process.cwd() + "/src/middleware";
    (0, getFileNamesPaths_1.default)(MIDDLEWARE_DIR).forEach((file) => {
        const isThis = file.path.split("middleware")[1].includes("index");
        if (!isThis) {
            const myCustomMiddleware = require(file.path);
            myCustomMiddleware.default(app);
        }
    });
};
//# sourceMappingURL=index.js.map