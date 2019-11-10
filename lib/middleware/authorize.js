"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
exports.default = (req, res, next) => {
    if (!req.user) {
        return res.json((new response_1.RKError('Not authorized')).toJSON());
    }
    next();
};
