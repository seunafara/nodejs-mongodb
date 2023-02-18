import passport from "passport"

export default (app: any) => {
	// Use passport middleware
	app.use(passport.initialize())
}
