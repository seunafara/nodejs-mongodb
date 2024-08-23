import passport from "passport"
import { JWT_PATH } from "../config"

export const middleware = async (app: any) => {
	// Use passport middleware
	app.use(passport.initialize())
	const { jwtStrategy } = await import(process.cwd() + JWT_PATH)
	jwtStrategy(passport)
}
