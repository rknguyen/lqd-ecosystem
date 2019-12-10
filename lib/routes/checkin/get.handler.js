"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckIn_1 = __importDefault(require("../../models/CheckIn"));
const response_1 = require("../../utils/response");
const Information_1 = __importDefault(require("../../models/Information"));
async function Handler(req, res) {
    const CheckIns = await CheckIn_1.default.find();
    const CheckInList = [];
    for (let checkin of CheckIns) {
        checkin = checkin.toObject();
        const { userId } = checkin;
        const information = await Information_1.default.findOne({ userId });
        if (information !== null) {
            checkin.information = information.toObject();
        }
        CheckInList.push(checkin);
    }
    return res.json(new response_1.RKSuccess("Lấy lịch sử điểm danh thành công", CheckInList));
}
exports.default = Handler;
