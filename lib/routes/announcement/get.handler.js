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
    const announcementCond = objectid_1.default.test(announcementID) ? { _id: announcementID } : {};
    const announcement = await Announcement_1.default.find(announcementCond);
    return res.json((new response_1.RKSuccess('Lấy thông báo thành công', announcement)).toJSON());
}
exports.default = Handler;
