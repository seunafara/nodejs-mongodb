import Joi from "joi"

export default Joi.object({
	email: Joi.string()
		.required()
		.trim()
		.email()
		.messages({ "string.empty": "Email address cannot be empty" })
		.messages({ "string.required": "Email Address is required" })
		.messages({ "any.invalid": "Email address is invalid" }),
	password: Joi.string()
		.required()
		.messages({ "string.empty": "Password cannot be empty" })
		.messages({ "string.required": "Password is required" })
		.messages({ "any.invalid": "Enter a strong password" }),
	firstName: Joi.string()
		.min(1)
		.max(30)
		.trim()
		.regex(/^[a-zA-Z]+$/)
		.message("First Name can only include letters"),
	lastName: Joi.string()
		.min(1)
		.max(30)
		.trim()
		.regex(/^[a-zA-Z]+$/)
		.message("Last Name can only include letters"),
})
