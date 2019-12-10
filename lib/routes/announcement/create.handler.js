"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../../utils/response");
const Announcement_1 = __importDefault(require("../../models/Announcement"));
async function Handler(req, res) {
    const { title, content } = req.all;
    const announcement = {
        title,
        content
    };
    try {
        await Announcement_1.default.create(announcement);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Tạo thông báo thành công')).toJSON());
}
exports.default = Handler;
