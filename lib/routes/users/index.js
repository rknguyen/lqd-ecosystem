"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../../utils/validator"));
const authorize_1 = __importDefault(require("../../middleware/authorize"));
const admin_1 = __importDefault(require("../../middleware/admin"));
const delete_handler_1 = __importDefault(require("./delete.handler"));
const delete_schema_1 = __importDefault(require("./delete.schema"));
const setAdmin_handler_1 = __importDefault(require("./setAdmin.handler"));
const setAdmin_schema_1 = __importDefault(require("./setAdmin.schema"));
const removeAdmin_handler_1 = __importDefault(require("./removeAdmin.handler"));
const removeAdmin_schema_1 = __importDefault(require("./removeAdmin.schema"));
const update_handler_1 = __importDefault(require("./update.handler"));
const update_schema_1 = __importDefault(require("./update.schema"));
const get_handler_1 = __importDefault(require("./get.handler"));
const Users = express_1.Router();
// setting up document routes here
Users.get("/", get_handler_1.default);
Users.post("/update", authorize_1.default, validator_1.default(update_schema_1.default), update_handler_1.default);
Users.post("/delete", authorize_1.default, admin_1.default, validator_1.default(delete_schema_1.default), delete_handler_1.default);
Users.post("/setAdmin", authorize_1.default, validator_1.default(setAdmin_schema_1.default), setAdmin_handler_1.default);
Users.post("/removeAdmin", authorize_1.default, admin_1.default, validator_1.default(removeAdmin_schema_1.default), removeAdmin_handler_1.default);
exports.default = Users;
