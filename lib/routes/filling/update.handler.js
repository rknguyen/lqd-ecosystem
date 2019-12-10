"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaValidator = require('schema-validator');
const response_1 = require("../../utils/response");
const Filling_1 = __importDefault(require("../../models/Filling"));
async function Handler(req, res) {
    const { fillingID, fields } = req.body;
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
                schema: fieldSchema,
            };
            return res.json((new response_1.RKError('Trường nhập vào không hợp lệ', debug)).toJSON());
        }
    }
    // update filling row
    try {
        const fillingCond = { _id: fillingID };
        const filling = await Filling_1.default.findOne(fillingCond);
        if (filling === null) {
            return res.json((new response_1.RKError('Không tìm thấy bản ghi để cập nhật')).toJSON());
        }
        const { ownerID } = filling;
        if (ownerID !== req.user._id.toString()) {
            return res.json((new response_1.RKError('Bạn không có quyền xoá bản ghi này')).toJSON());
        }
        const updRow = { fields };
        await Filling_1.default.updateOne(fillingCond, updRow);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Cập nhật văn bản thành công')).toJSON());
}
exports.default = Handler;
