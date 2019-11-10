"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../../utils/validator"));
const create_handler_1 = __importDefault(require("./create.handler"));
const create_schema_1 = __importDefault(require("./create.schema"));
// import DeleteDocumentHandler from './delete.handler'
// import DeleteDocumentValidate from './delete.schema'
const Document = express_1.Router();
// setting up document routes here
Document.post('/create', validator_1.default(create_schema_1.default), create_handler_1.default);
// Document.post('/delete', DeleteDocumentValidate, DeleteDocumentHandler)
exports.default = Document;
