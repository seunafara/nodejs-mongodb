"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
require("dotenv/config");
const key = process.env.APP_SECRET;
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
};
exports.default = (passport) => {
    console.log('Running');
    console.log(passport.use);
    passport.use(new passport_jwt_1.Strategy(opts, (payload) => {
        console.log("jwt_payload", payload);
    }));
};
//# sourceMappingURL=passport.js.map