import { Schema as _Schema, model, LeanDocument, Types } from "mongoose"
const Schema = _Schema

// Create a user schema
const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		guard: {
			resetCode: {
				type: String,
			},
		},
		settings: {
			notifications: {
				email: {
					type: Boolean,
					default: true,
				},
			},
		},
	},
	{
		timestamps: true,
	},
)

export type UserType = LeanDocument<
	{ createdAt: NativeDate; updatedAt: NativeDate } & {
		email: string
		lastname?: string
		firstname?: string
		password: string
		guard?: { resetCode?: string | undefined } | undefined
		settings?:
			| {
					notifications?: { email: boolean } | undefined
			  }
			| undefined
	} & { _id: Types.ObjectId }
>[]

export default model("users", UserSchema)
