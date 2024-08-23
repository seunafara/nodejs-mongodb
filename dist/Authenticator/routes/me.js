"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "get#": (req, res) => {
        res.send("Hello " + req.user.email);
    },
};
//# sourceMappingURL=me.js.map