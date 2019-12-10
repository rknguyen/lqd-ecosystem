"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectid_1 = __importDefault(require("../../utils/objectid"));
const response_1 = require("../../utils/response");
const Document_1 = __importDefault(require("../../models/Document"));
async function Handler(req, res) {
    const { documentID } = req.all;
    const documentCond = objectid_1.default.test(documentID) ? { _id: documentID } : {};
    const document = await Document_1.default.find(documentCond);
    return res.json((new response_1.RKSuccess('Lấy văn bản thành công', document)).toJSON());
}
exports.default = Handler;
