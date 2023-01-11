module.exports = {
    post: (_: any, res: any) => {
        return res.json({
            success: true
        })
    },
    get: (_: any, res: any) => {
        return res.send('Hello from register page')
    },
}
