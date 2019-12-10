"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectid_1 = __importDefault(require("../../utils/objectid"));
const response_1 = require("../../utils/response");
const Announcement_1 = __importDefault(require("../../models/Announcement"));
async function Handler(req, res) {
    const { announcementID } = req.all;
    if (!objectid_1.default.test(announcementID)) {
        return res.json((new response_1.RKError('ID thông báo không hợp lệ')).toJSON());
    }
    try {
        const announcementCond = { _id: announcementID };
        const announcement = await Announcement_1.default.findOne(announcementCond);
        if (announcement === null) {
            return res.json((new response_1.RKError('Không tìm ra thông báo để xoá')).toJSON());
        }
        await Announcement_1.default.deleteOne(announcementCond);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Xoá thông báo thành công')).toJSON());
}
exports.default = Handler;
