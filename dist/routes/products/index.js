module.exports = {
    post: (_, res) => {
        return res.json({
            success: true,
        });
    },
    get: (_, res) => {
        return res.send("Hello from products page");
    },
};
//# sourceMappingURL=index.js.map