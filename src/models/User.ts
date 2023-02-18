import { Schema as _Schema, model } from "mongoose"
const Schema = _Schema

// Create a user schema
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
}, {
    timestamps: true
})

export default model("users", UserSchema)
