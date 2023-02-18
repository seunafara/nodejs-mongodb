import User from "../models/User"
import argon2 from "argon2"
import "dotenv/config"
import generateToken from "../utils/helpers/generateToken"

module.exports = {
	post: async (req: any, res: any) => {
		const { email, username, password } = req.body
		const hashedPassword = await argon2.hash(password)
		new User({
			email,
			username,
			password: hashedPassword,
		}).save()
			.then(async (user) => {
				const token = await generateToken(user)
                const { password, ...userToObj } = user.toObject()
                return res.json({
                    success: true,
                    message: "Welcome!",
                    user: {
                        ...userToObj,
                        token
                    }
                })
			})
			.catch(() =>
				res.json({ success: false, message: "Something went wrong" }),
			)
	},
}
