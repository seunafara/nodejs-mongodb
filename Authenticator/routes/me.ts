export default {
	"get#": (req: { user: any }, res: any) => {
		res.send("Hello " + req.user.email)
	},
}
