"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const SchemaValidator = require('schema-validator');
const response_1 = require("../../utils/response");
const Document_1 = __importDefault(require("../../models/Document"));
const Attachment_1 = __importDefault(require("../../models/Attachment"));
const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
function writeAttachmentPromise(file) {
    return new Promise((resolve, reject) => {
        const attachmentStream = fs_1.default.createReadStream(file.path);
        const options = {
            filename: file.name,
            contentType: DOCX_TYPE
        };
        const Attachment = Attachment_1.default();
        Attachment.write(options, attachmentStream, (error, file) => {
            if (error)
                return reject(error);
            resolve(file);
        });
    });
}
async function Handler(req, res) {
    const { name, fields, attachment } = req.all;
    if (attachment.type !== DOCX_TYPE) {
        return res.json((new response_1.RKError('Tệp văn bản bắt buộc phải là docx')).toJSON());
    }
    // check field is valid or not
    const fieldSchema = {
        name: {
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
    try {
        const _attachment = await writeAttachmentPromise(attachment);
        const document = {
            name,
            fields,
            attachmentID: _attachment._id
        };
        await Document_1.default.create(document);
    }
    catch (err) {
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Tạo văn bản thành công')).toJSON());
}
exports.default = Handler;
