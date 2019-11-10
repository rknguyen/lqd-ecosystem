"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Document_1 = __importDefault(require("../../models/Document"));
const Attachment_1 = __importDefault(require("../../models/Attachment"));
const response_1 = require("../../utils/response");
const fs_1 = __importDefault(require("fs"));
function writeAttachmentPromise(file) {
    return new Promise((resolve, reject) => {
        const attachmentStream = fs_1.default.createReadStream(file.path);
        const options = {
            filename: file.name,
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
    const { name, fields } = req.fields.data;
    try {
        const attachment = await writeAttachmentPromise(req.files.document);
        const document = {
            name,
            fields,
            attachmentID: attachment._id
        };
        await Document_1.default.create(document);
    }
    catch (err) {
        return res.json((new response_1.RKError('Something went wrong!', err)).toJSON());
    }
    return res.json((new response_1.RKSuccess('Create document successfully!')).toJSON());
}
exports.default = Handler;
