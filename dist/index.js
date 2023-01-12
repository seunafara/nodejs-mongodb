"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./__init__/server"));
const config_1 = require("./config");
const server = new server_1.default(config_1.PORT);
server.create().connectDB(config_1.DB).register(["routes", "middleware"]);
server.start();
//# sourceMappingURL=index.js.map