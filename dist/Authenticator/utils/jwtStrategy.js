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
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const model_1 = __importDefault(require("../model"));
Promise.resolve().then(() => __importStar(require("dotenv/config")));
const key = process.env.APP_SECRET;
const opts = {
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key,
};
const jwtStrategy = (passport) => {
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
        model_1.default.findById(jwt_payload._id)
            .then((user) => {
            if (user)
                return done(null, user);
            return done(null, false);
        })
            .catch((err) => {
            console.log(err);
        });
    }));
};
exports.jwtStrategy = jwtStrategy;
//# sourceMappingURL=jwtStrategy.js.map