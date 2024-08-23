"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const passport_1 = __importDefault(require("passport"));
const index_1 = require("./utils/index");
const config_1 = require("../config");
exports.default = (app) => {
    const routes = (0, index_1.getFileNamesAndPaths)(process.cwd() + config_1.ROUTES_DIR);
    routes.forEach(async (file) => {
        var _a;
        const endpoint = await (_a = file.path, Promise.resolve().then(() => __importStar(require(_a))));
        if ((0, ramda_1.isEmpty)(endpoint)) {
            console.log("No endpoints found in route at: " + file.path);
        }
        else {
            const endpointUrl = file.path
                .split("routes")[1]
                .replace(/\.(ts|js)$/, "")
                .replace("/index", "");
            for (let method of Object.keys(endpoint.routes)) {
                const requiresAuth = method.slice(-1) === "#";
                const formattedMethodName = requiresAuth
                    ? method.replace("#", "")
                    : method;
                if (!["get", "post", "put", "delete"].includes(formattedMethodName))
                    continue;
                if (requiresAuth) {
                    app[formattedMethodName](endpointUrl, passport_1.default.authenticate("jwt", { session: false }), endpoint.routes[method]);
                }
                else {
                    app[formattedMethodName](endpointUrl, endpoint.routes[method]);
                }
            }
        }
    });
};
//# sourceMappingURL=routes.js.map