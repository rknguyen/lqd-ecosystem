"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DocumentSchema = new mongoose_1.default.Schema({
    name: String,
    fields: [{ name: String, key: String }],
    attachmentID: String
});
mongoose_1.default.model('Document', DocumentSchema);
exports.default = mongoose_1.default.model('Document');
