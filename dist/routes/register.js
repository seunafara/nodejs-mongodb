module.exports = {
    post: (_, res) => {
        return res.json({
            success: true
        });
    },
    get: (_, res) => {
        return res.send('Hello from register page');
    },
};
//# sourceMappingURL=register.js.map