"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ramda_1 = require("ramda");
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./registers/routes"));
const middleware_1 = __importDefault(require("./registers/middleware"));
class Server {
    constructor(PORT) {
        this.port = PORT;
    }
    create() {
        this.app = (0, express_1.default)();
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
        if (options.includes("middleware"))
            (0, middleware_1.default)(this.app);
        if (options.includes("cron"))
            console.log("We have cron jobs to register");
        if (options.includes("routes"))
            (0, routes_1.default)(this.app);
        return this;
    }
    start() {
        this.app.listen(this.port, () => console.log(`Express is working on port ${this.port}`));
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map