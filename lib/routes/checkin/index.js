"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../../utils/validator"));
const create_schema_1 = __importDefault(require("./create.schema"));
const create_handler_1 = __importDefault(require("./create.handler"));
const get_handler_1 = __importDefault(require("./get.handler"));
const CheckIn = express_1.Router();
CheckIn.get("/", get_handler_1.default);
CheckIn.post("/create", validator_1.default(create_schema_1.default), create_handler_1.default);
exports.default = CheckIn;
