"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../../utils/response");
const Announcement_1 = __importDefault(require("../../models/Announcement"));
const objectid_1 = __importDefault(require("../../utils/objectid"));
async function Handler(req, res) {
    const { announcementID, title, content } = req.all;
    if (!objectid_1.default.test(announcementID)) {
        return res.json((new response_1.RKError('announcementID không hợp lệ')).toJSON());
    }
    try {
        const announcementCond = { _id: announcementID };
        const announcement = await Announcement_1.default.findOne(announcementCond);
        if (announcement === null) {
            return res.json((new response_1.RKError('Không tìm thấy thông báo để cập nhật')).toJSON());
        }
        const newAnnouncement = { title, content };
        await Announcement_1.default.updateOne(announcementCond, newAnnouncement);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Tạo thông báo thành công')).toJSON());
}
exports.default = Handler;
