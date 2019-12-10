"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const response_1 = require("../../utils/response");
const objectid_1 = __importDefault(require("../../utils/objectid"));
const Document_1 = __importDefault(require("../../models/Document"));
const Filling_1 = __importDefault(require("../../models/Filling"));
const Attachment_1 = __importDefault(require("../../models/Attachment"));
const Pizzip = require('pizzip');
const Templater = require('docxtemplater');
function getAttachmentBuffer(attachmentID) {
    const Attachment = Attachment_1.default();
    return new Promise((resolve, reject) => {
        Attachment.findById(attachmentID, (error, file) => {
            if (error)
                return reject(error);
            Attachment.read({ _id: file._id }, (error, buffer) => {
                if (error)
                    reject(error);
                resolve(buffer);
            });
        });
    });
}
async function Handler(req, res) {
    const { fillingID } = req.all;
    if (!objectid_1.default.test(fillingID)) {
        return res.json((new response_1.RKError('fillingID không hợp lệ')).toJSON());
    }
    try {
        const fillingCond = { _id: fillingID };
        const filling = await Filling_1.default.findOne(fillingCond);
        if (filling === null) {
            return res.json((new response_1.RKError('Bản ghi không tồn tại')).toJSON());
        }
        const { documentID, fields } = filling;
        const documentCond = { _id: documentID };
        const document = await Document_1.default.findOne(documentCond);
        if (document === null) {
            return res.json((new response_1.RKError('Văn bản không tồn tại')).toJSON());
        }
        // make data from fields
        let data = {};
        for (const field of fields) {
            data[field.key] = field.value;
        }
        const { attachmentID } = document;
        const attachmentBuffer = await getAttachmentBuffer(attachmentID);
        const attachmentBinary = Buffer.from(attachmentBuffer).toString('binary');
        const fillingDocument = (new Templater()).loadZip(new Pizzip(attachmentBinary));
        fillingDocument.setData(data);
        fillingDocument.render();
        const fillingDocumentBuffer = fillingDocument.getZip().generate({ type: 'nodebuffer' });
        const fillingDocumentName = fillingID.toString() + '_' + (new Date()).getTime().toString() + '.docx';
        const fillingDocumentPath = path_1.default.resolve(__dirname, './tmp/' + fillingDocumentName);
        fs_1.default.writeFileSync(fillingDocumentPath, fillingDocumentBuffer);
        return res.download(fillingDocumentPath, fillingDocumentName);
    }
    catch (err) {
        console.log(err);
        return res.json((new response_1.RKError('Đã có lỗi xảy ra', err)).toJSON());
    }
}
exports.default = Handler;
