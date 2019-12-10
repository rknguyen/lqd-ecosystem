"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const response_1 = require("../../utils/response");
const objectid_1 = __importDefault(require("../../utils/objectid"));
const Information_1 = __importDefault(require("../../models/Information"));
async function Handler(req, res) {
    const { userId } = req.all;
    if (!objectid_1.default.test(userId)) {
        return res.json(new response_1.RKError("userId không hợp lệ").toJSON());
    }
    const userInformation = lodash_1.default.omit(req.all, "userId");
    const uinfo = await Information_1.default.findOne({ userId });
    if (uinfo === null) {
        await Information_1.default.create(Object.assign(Object.assign({}, userInformation), { userId }));
    }
    else {
        await Information_1.default.updateOne({ userId }, userInformation);
    }
    return res.json(new response_1.RKSuccess("Cập nhật thông tin thành công").toJSON());
}
exports.default = Handler;
