"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FillingSchema = new mongoose_1.default.Schema({
    ownerID: String,
    documentID: String,
    fields: [{ value: String, key: String }]
});
mongoose_1.default.model('Filling', FillingSchema);
exports.default = mongoose_1.default.model('Filling');
