import User from "../models/User"
import argon2 from "argon2"
import generateToken from "../utils/helpers/generateToken"
import "dotenv/config"

module.exports = {
	post: async (req: any, res: any) => {
		const { usernameOrEmail, password: pass } = req.body

		User.findOne(
			usernameOrEmail?.includes("@")
				? { email: usernameOrEmail }
				: { username: usernameOrEmail },
		)
			.select("+password")
			.then(async (user) => {
				if (!user) {
					return res.json({
						success: "false",
						message: "Invalid login",
					})
				}
				const valid = await argon2.verify(user.password, pass)
				if (!valid) {
					return res.json({
						success: "false",
						message: "Invalid login",
					})
				}

				const { password, ...userToObj } = user.toObject()
				return generateToken(user).then((token) => {
					return res.json({
						success: true,
						message: "Welcome!",
						user: {
							token,
							...userToObj,
						},
					})
				})
			})
			.catch(() =>
				res.json({ success: false, message: "Something went wrong" }),
			)
	},
}
