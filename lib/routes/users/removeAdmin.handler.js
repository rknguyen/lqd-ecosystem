"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../../utils/response");
const objectid_1 = __importDefault(require("../../utils/objectid"));
const Users_1 = __importDefault(require("../../models/Users"));
const Admin_1 = __importDefault(require("../../models/Admin"));
async function Handler(req, res) {
    const { userID } = req.all;
    if (!objectid_1.default.test(userID)) {
        return res.json((new response_1.RKError('userID không hợp lệ')).toJSON());
    }
    try {
        const userCond = { _id: userID };
        const user = await Users_1.default.findOne(userCond);
        if (user === null) {
            return res.json((new response_1.RKError('Người dùng này không tồn tại')).toJSON());
        }
        const adminCond = { userID };
        const admin = await Admin_1.default.findOne(adminCond);
        if (admin === null) {
            return res.json((new response_1.RKError('Người dùng này không phải là quản trị viên')).toJSON());
        }
        await Admin_1.default.deleteOne(adminCond);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Xoá quyền quản trị thành công')).toJSON());
}
exports.default = Handler;
