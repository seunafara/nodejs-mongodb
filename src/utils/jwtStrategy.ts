const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
import User from "../models/User"
require("dotenv/config")
const key = process.env.APP_SECRET

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
}

module.exports = (passport: { use: (arg0: any) => void }) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload: { _id: any }, done: (arg0: null, arg1: boolean) => any) => {
			User.findById(jwt_payload._id)
				.then((user: any) => {
					if (user) return done(null, user)
					return done(null, false)
				})
				.catch((err: any) => {
					console.log(err)
				})
		}),
	)
}
