"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../../models/Users"));
const Information_1 = __importDefault(require("../../models/Information"));
const response_1 = require("../../utils/response");
async function Handler(req, res) {
    const users = await Users_1.default.find();
    const usersList = [];
    for (let user of users) {
        user = user.toObject();
        const { _id: userId } = user;
        const information = await Information_1.default.findOne({ userId });
        if (information !== null) {
            user.information = information.toObject();
        }
        delete user.services;
        usersList.push(user);
    }
    return res.json(new response_1.RKSuccess("Lấy danh sách người dùng thành công", usersList));
}
exports.default = Handler;
