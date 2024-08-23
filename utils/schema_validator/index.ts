import { isEmpty, isNil } from "ramda"

export default (schema: any, data: object): boolean | Array<string> => {
	if (isEmpty(data) || isNil(data)) {
		return ["Invalid data"]
	}

	const options = {
		errors: {
			wrap: {
				label: "",
			},
		},
		allowUnknown: false,
	}
	const { error } = schema.validate(data, options)
	const valid = error == null

	if (valid) {
		return false
	} else {
		const { details } = error
		const message = details.map((i: { message: any }) => i.message).join(",")
		const errors: any[] = []

		if (message) errors.push(message)

		return errors
	}
}
