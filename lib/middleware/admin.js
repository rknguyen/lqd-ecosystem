"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const Admin_1 = __importDefault(require("../models/Admin"));
exports.default = async (req, res, next) => {
    const adminCond = { userID: req.user._id };
    const admin = await Admin_1.default.findOne(adminCond);
    if (admin === null) {
        return res.json((new response_1.RKError('Bạn không có quyền truy cập vào trang này')).toJSON());
    }
    next();
};
