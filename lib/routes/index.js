"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = __importDefault(require("./document"));
function Setup(app) {
    app.use('/document', document_1.default);
}
exports.default = Setup;
