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
    let fillingCond = objectid_1.default.test(fillingID) ? { _id: fillingID } : {};
    const adminCond = { userID: req.user._id.toString() };
    const admin = await Admin_1.default.findOne(adminCond);
    if (admin === null) {
        fillingCond = Object.assign(Object.assign({}, fillingCond), { ownerID: req.user._id.toString() });
    }
    const filling = await Filling_1.default.find(fillingCond);
    return res.json((new response_1.RKSuccess('Lấy bản ghi thành công', filling)).toJSON());
}
exports.default = Handler;
