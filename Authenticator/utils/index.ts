import { promisify } from "util"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const genSalt = promisify(bcrypt.genSalt)
export const bcryptHash = promisify(bcrypt.hash)



export const generateToken = async (user: { _id: any; email: any;}) => {
	// User's password is correct and we need to send the JSON Token for user
	const payload = {
		_id: user._id,
		email: user.email,
	}

	return new Promise((resolve) => {
		jwt.sign(
			payload,
			process.env.APP_SECRET as string,
			{ expiresIn: "10d" },
			(err: any, token: any) => {
				if (err) throw err
				resolve(token)
			},
		)
	})
}
