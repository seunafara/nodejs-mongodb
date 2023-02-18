"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User_1 = __importDefault(require("../models/User"));
require("dotenv/config");
const key = process.env.APP_SECRET;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
};
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User_1.default.findById(jwt_payload._id)
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
//# sourceMappingURL=jwtStrategy.js.map