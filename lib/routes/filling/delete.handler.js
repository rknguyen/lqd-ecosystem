"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectid_1 = __importDefault(require("../../utils/objectid"));
const response_1 = require("../../utils/response");
const Filling_1 = __importDefault(require("../../models/Filling"));
const Admin_1 = __importDefault(require("../../models/Admin"));
async function Handler(req, res) {
    const { fillingID } = req.all;
    if (!objectid_1.default.test(fillingID)) {
        return res.json((new response_1.RKError('ID bản ghi không hợp lệ')).toJSON());
    }
    try {
        const fillingCond = { _id: fillingID };
        const filling = await Filling_1.default.findOne(fillingCond);
        if (filling === null) {
            return res.json((new response_1.RKError('Không tìm ra bản ghi để xoá')).toJSON());
        }
        const { ownerID } = filling;
        const adminCond = { userID: req.user._id };
        const admin = await Admin_1.default.findOne(adminCond);
        // admin can delete any filling
        if (admin === null && ownerID !== req.user._id.toString()) {
            return res.json((new response_1.RKError('Bạn không có quyền xoá bản ghi này')).toJSON());
        }
        await Filling_1.default.deleteOne(fillingCond);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Xoá bản ghi thành công')).toJSON());
}
exports.default = Handler;
