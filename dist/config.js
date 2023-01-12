"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.DB = process.env.MONGODB_URL;
//# sourceMappingURL=config.js.map