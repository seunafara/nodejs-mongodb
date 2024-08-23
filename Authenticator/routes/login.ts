import User from "../model"
import bcrypt from "bcrypt"
import { generateToken } from "../utils"
import "dotenv/config"

export default {
	post: async (req: any, res: any) => {
		const { email, password: pass } = req.body

		User.findOne({ email })
			.select("+password")
			.then(async (user: any) => {
				if (!user) {
					console.log("Invalid user")
					return res.status(422).json({
						success: 0,
						errors: ["Invalid login"],
					})
				}

				bcrypt.compare(pass, user.password).then((isMatch) => {
					if (!isMatch) {
						console.log("Invalid password")
						return res.status(422).json({
							success: 0,
							errors: ["Invalid login"],
						})
					}

					const { password, ...userRest } = user.toObject()
					return generateToken(user).then((token) => {
						return res.status(200).json({
							success: 1,
							message: "Welcome!",
							user: {
								settings: userRest.settings,
								_id: userRest._id,
								email: userRest.email,
                token
							}
						})
					})
				})
			})
			.catch(() =>
				res.json({
					success: false,
					errors: ["Something went wrong. Contact support@predeet.com"],
				}),
			)
	},
}
