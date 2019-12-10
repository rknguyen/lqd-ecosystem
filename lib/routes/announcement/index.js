"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../../utils/validator"));
const authorize_1 = __importDefault(require("../../middleware/authorize"));
const admin_1 = __importDefault(require("../../middleware/admin"));
const Announcement = express_1.Router();
const get_handler_1 = __importDefault(require("./get.handler"));
const get_schema_1 = __importDefault(require("./get.schema"));
const create_handler_1 = __importDefault(require("./create.handler"));
const create_schema_1 = __importDefault(require("./create.schema"));
const update_handler_1 = __importDefault(require("./update.handler"));
const update_schema_1 = __importDefault(require("./update.schema"));
const delete_handler_1 = __importDefault(require("./delete.handler"));
const delete_schema_1 = __importDefault(require("./delete.schema"));
// setting up document routes here
Announcement.get('/', authorize_1.default, validator_1.default(get_schema_1.default), get_handler_1.default);
Announcement.post('/create', authorize_1.default, admin_1.default, validator_1.default(create_schema_1.default), create_handler_1.default);
Announcement.post('/update', authorize_1.default, admin_1.default, validator_1.default(update_schema_1.default), update_handler_1.default);
Announcement.post('/delete', authorize_1.default, admin_1.default, validator_1.default(delete_schema_1.default), delete_handler_1.default);
exports.default = Announcement;
