"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaValidator = require("schema-validator");
const response_1 = require("../../utils/response");
const Document_1 = __importDefault(require("../../models/Document"));
const Filling_1 = __importDefault(require("../../models/Filling"));
async function Handler(req, res) {
    const { documentID, fields } = req.all;
    // check document is exists
    const documentCond = { _id: documentID };
    const document = await Document_1.default.findOne(documentCond);
    if (document === null) {
        return res.json(new response_1.RKError("Không tìm thấy văn bản", { documentID }).toJSON());
    }
    // only accept filling once
    const fillingCond = {
        ownerID: req.user._id,
        documentID: documentID
    };
    const tmpFilling = await Filling_1.default.findOne(fillingCond);
    if (tmpFilling !== null) {
        return res.json(new response_1.RKError("Bạn đã điền rồi, hãy cập nhật thay vì điền lại").toJSON());
    }
    // check field is valid or not
    const fieldSchema = {
        value: {
            type: String,
            required: true
        },
        key: {
            type: String,
            required: true
        }
    };
    const fieldValidator = new SchemaValidator(fieldSchema);
    for (let field of fields) {
        const ret = fieldValidator.check(field);
        if (ret._error) {
            const debug = {
                error: {
                    at: field,
                    message: ret
                },
                schema: fieldSchema
            };
            return res.json(new response_1.RKError("Trường nhập vào không hợp lệ", debug).toJSON());
        }
    }
    // create filling row
    try {
        const row = {
            ownerID: req.user._id,
            fields,
            documentID
        };
        await Filling_1.default.create(row);
    }
    catch (err) {
        return res.json(new response_1.RKError("Đã có lỗi xảy ra", err).toJSON());
    }
    return res.json(new response_1.RKSuccess("Điền văn bản thành công").toJSON());
}
exports.default = Handler;
