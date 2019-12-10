"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckIn_1 = __importDefault(require("../../models/CheckIn"));
const objectid_1 = __importDefault(require("../../utils/objectid"));
const response_1 = require("../../utils/response");
async function Handler(req, res) {
    const { userId } = req.all;
    if (!objectid_1.default.test(userId)) {
        return res.json(new response_1.RKError("userId không hợp lệ").toJSON());
    }
    const { face } = req.all;
    const now = new Date().getTime();
    await CheckIn_1.default.create({ face, userId, createdAt: now });
    return res.json(new response_1.RKSuccess("Điểm danh thành công").toJSON());
}
exports.default = Handler;
