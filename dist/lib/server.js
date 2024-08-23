"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("../config");
const ramda_1 = require("ramda");
const middleware_1 = __importDefault(require("./middleware"));
class Server {
    constructor(PORT) {
        this.port = PORT;
        this.whitelist = [...config_1.PRODUCTION_URLS];
        if (!config_1.__isProd__) {
            this.whitelist.push(...config_1.LOCALHOST_URLS);
        }
    }
    create() {
        this.app = (0, express_1.default)();
        const whitelist = this.whitelist;
        const corsOptions = {
            origin: function (origin, callback) {
                if (config_1.USE_CORS) {
                    if (whitelist.indexOf(origin) !== -1) {
                        callback(null, true);
                    }
                    else {
                        callback(new Error("Origin: " + origin + " is Not allowed by CORS"), false);
                    }
                }
                else
                    callback(null, true);
            },
        };
        this.app.use((0, cors_1.default)(corsOptions));
        return this;
    }
    connectDB(URL, options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) {
        if ((0, ramda_1.isEmpty)(options))
            throw new Error("DB options cannot be empty");
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default
            .connect(URL, options)
            .then(() => console.log(`Database connected successfully`))
            .catch((err) => console.log(err));
        return this;
    }
    register(options) {
        options.forEach((option) => {
            switch (option) {
                case "middleware":
                    (0, middleware_1.default)(this.app);
                    break;
                case "routes":
                    (0, routes_1.default)(this.app);
                    break;
                default:
                    break;
            }
        });
        return this;
    }
    start() {
        this.app.listen(this.port, () => console.log(`Express is working on port ${this.port}`));
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map