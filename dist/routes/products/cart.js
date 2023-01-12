module.exports = {
    post: (_, res) => {
        return res.json({
            success: true,
        });
    },
    get: (_, res) => {
        return res.send("Hello from cart endpoint");
    },
};
//# sourceMappingURL=cart.js.map