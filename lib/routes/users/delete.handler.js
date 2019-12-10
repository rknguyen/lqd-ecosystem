"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../../utils/response");
const objectid_1 = __importDefault(require("../../utils/objectid"));
const Users_1 = __importDefault(require("../../models/Users"));
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
        if (user._id.toString() === req.user._id.toString()) {
            return res.json((new response_1.RKError('Không thể xoá chính bạn')).toJSON());
        }
        // delete user
        await Users_1.default.deleteOne(userCond);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Xoá người dùng thành công')).toJSON());
}
exports.default = Handler;
