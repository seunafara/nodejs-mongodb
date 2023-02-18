import jwt from "jsonwebtoken"
import "dotenv/config"

export default async (user: { _id: any; email: any; username: any }) => {
	// User's password is correct and we need to send the JSON Token for user
	const payload = {
		_id: user._id,
		email: user.email,
		username: user.username,
	}

	return new Promise((resolve) => {
		jwt.sign(
			payload,
			process.env.APP_SECRET as string,
			{ expiresIn: "90d" },
			(err: any, token: any) => {
				if (err) throw err
				resolve(token)
			},
		)
	})
}
