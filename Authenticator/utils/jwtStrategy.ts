import { Strategy as JwtStrategy } from "passport-jwt"
import { ExtractJwt } from "passport-jwt"
import User from "../model"

import("dotenv/config")
const key = process.env.APP_SECRET

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: key,
}

export const jwtStrategy = (passport: { use: (arg0: JwtStrategy) => void }) => {
	passport.use(
		new JwtStrategy(
			opts,
			(jwt_payload: { _id: any }, done: (arg0: null, arg1: boolean) => any) => {
				User.findById(jwt_payload._id)
					.then((user: any) => {
						if (user) return done(null, user)
						return done(null, false)
					})
					.catch((err: any) => {
						console.log(err)
					})
			},
		),
	)
}
