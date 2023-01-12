"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const getFileNamesPaths_1 = __importDefault(require("../../utils/getFileNamesPaths"));
exports.default = (app) => {
    const ROUTES_DIR = process.cwd() + "/src/routes";
    (0, getFileNamesPaths_1.default)(ROUTES_DIR).forEach((file) => {
        const endpoint = require(file.path);
        if ((0, ramda_1.isEmpty)(endpoint)) {
            console.log("No endpoints found in route at: " + file.path);
        }
        else {
            const endpointUrl = file.path
                .split("routes")[1]
                .replace(/\.(ts|js)$/, "")
                .replace("/index", "");
            Object.keys(endpoint).forEach((method) => {
                app[method](endpointUrl, endpoint[method]);
            });
        }
    });
};
//# sourceMappingURL=routes.js.map