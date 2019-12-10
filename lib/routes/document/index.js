"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formidable = require('express-formidable');
const validator_1 = __importDefault(require("../../utils/validator"));
const authorize_1 = __importDefault(require("../../middleware/authorize"));
const admin_1 = __importDefault(require("../../middleware/admin"));
const create_handler_1 = __importDefault(require("./create.handler"));
const create_schema_1 = __importDefault(require("./create.schema"));
const delete_handler_1 = __importDefault(require("./delete.handler"));
const delete_schema_1 = __importDefault(require("./delete.schema"));
const get_handler_1 = __importDefault(require("./get.handler"));
const get_schema_1 = __importDefault(require("./get.schema"));
const Document = express_1.Router();
// setting up document routes here
Document.get('/', authorize_1.default, validator_1.default(get_schema_1.default), get_handler_1.default);
Document.post('/create', authorize_1.default, admin_1.default, formidable(), validator_1.default(create_schema_1.default), create_handler_1.default);
Document.post('/delete', authorize_1.default, admin_1.default, validator_1.default(delete_schema_1.default), delete_handler_1.default);
exports.default = Document;
