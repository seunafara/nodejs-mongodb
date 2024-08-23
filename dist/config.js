"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RUN_CRON = exports.DB = exports.PORT = exports.PRODUCTION_URLS = exports.LOCALHOST_URLS = exports.USE_CORS = exports.JWT_PATH = exports.MIDDLEWARE_DIR = exports.ROUTES_DIR = exports.__isProd__ = void 0;
require("dotenv/config");
exports.__isProd__ = process.env.NODE_ENV === "production";
exports.ROUTES_DIR = exports.__isProd__
    ? "/dist/routes"
    : "/routes";
exports.MIDDLEWARE_DIR = exports.__isProd__
    ? "/dist/middleware"
    : "/middleware";
exports.JWT_PATH = exports.__isProd__
    ? "/dist/src/utils/jwtStrategy.js"
    : "/Authenticator/utils/jwtStrategy";
exports.USE_CORS = exports.__isProd__
    ? true
    : Boolean(Number(process.env.USE_CORS));
exports.LOCALHOST_URLS = ["http://localhost:3000"];
exports.PRODUCTION_URLS = [];
exports.PORT = !exports.__isProd__
    ? Number(process.argv[2] || 7777)
    : Number(process.env.PORT);
exports.DB = process.env.MONGODB_URL;
exports.RUN_CRON = Boolean(Number(process.env.RUN_CRON));
//# sourceMappingURL=config.js.map