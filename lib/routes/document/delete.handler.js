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
    if (!objectid_1.default.test(documentID)) {
        return res.json((new response_1.RKError('ID văn bản không hợp lệ')).toJSON());
    }
    try {
        const documentCond = { _id: documentID };
        const document = await Document_1.default.findOne(documentCond);
        if (document === null) {
            return res.json((new response_1.RKError('Không tìm ra văn bản để xoá')).toJSON());
        }
        await Document_1.default.deleteOne(documentCond);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Xoá văn bản thành công')).toJSON());
}
exports.default = Handler;
