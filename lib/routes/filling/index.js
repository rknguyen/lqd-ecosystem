"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../../utils/validator"));
const authorize_1 = __importDefault(require("../../middleware/authorize"));
const create_handler_1 = __importDefault(require("./create.handler"));
const create_schema_1 = __importDefault(require("./create.schema"));
const delete_handler_1 = __importDefault(require("./delete.handler"));
const delete_schema_1 = __importDefault(require("./delete.schema"));
const update_handler_1 = __importDefault(require("./update.handler"));
const update_schema_1 = __importDefault(require("./update.schema"));
const get_handler_1 = __importDefault(require("./get.handler"));
const get_schema_1 = __importDefault(require("./get.schema"));
const getByDocumentID_handler_1 = __importDefault(require("./getByDocumentID.handler"));
const getByDocumentID_schema_1 = __importDefault(require("./getByDocumentID.schema"));
const Filling = express_1.Router();
// setting up document routes here
Filling.get('/', authorize_1.default, validator_1.default(get_schema_1.default), get_handler_1.default);
Filling.get('/getByDocumentID', authorize_1.default, validator_1.default(getByDocumentID_schema_1.default), getByDocumentID_handler_1.default);
Filling.post('/create', authorize_1.default, validator_1.default(create_schema_1.default), create_handler_1.default);
Filling.post('/update', authorize_1.default, validator_1.default(update_schema_1.default), update_handler_1.default);
Filling.post('/delete', authorize_1.default, validator_1.default(delete_schema_1.default), delete_handler_1.default);
exports.default = Filling;
