import { isEmpty } from 'ramda'
import schema_validator from '../../utils/schema_validator'
import registerSchema from '../../utils/schema_validator/schemas/register.schema'
import User from "../model"
import { bcryptHash, generateToken, genSalt } from '../utils'
import { __isProd__ } from '../../config'

export default {
	post: async (req: any, res: any) => {
		const errors = schema_validator(registerSchema, req.body)

		if (errors && !isEmpty(errors)) {
			return res.status(422).json({
				success: 0,
				errors,
			})
		}
    
		const { email, password } = req.body
		const emailLowerCase = email.toLowerCase()

		const user = await User.findOne({ email: emailLowerCase })

		if (user)
			return res
				.status(422)
				.json({ success: 0, errors: ["User already exists"] })

		const salt = await genSalt()
		if (typeof salt !== "string" && typeof salt !== "number") {
			throw new Error("Invalid salt")
		}

		const hash = await bcryptHash(password, salt)

		new User({
			email: emailLowerCase,
			password: hash,
		})
			.save()
			.then(async (newUser: any) => {
				const token = await generateToken(newUser)

				// TODO: Send Welcome email

				return res.json({
					success: 1,
					user: {
						username: newUser.username,
						email: newUser.email,
						token,
					},
				})
			})
			.catch((err: any) => {
				return res.status(422).json({
					success: 0,
					errors: [__isProd__ ? "Error registering user" : err],
				})
			})
	},
}
