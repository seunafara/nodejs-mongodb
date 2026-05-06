export default {
	"get#": (req: { user: any }, res: any) => {
    return res.json({
      success: true,
      user: req.user,
    })
	},
}
