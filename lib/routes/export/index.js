"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../../utils/validator"));
const Export = express_1.Router();
const filling_handler_1 = __importDefault(require("./filling.handler"));
const filling_schema_1 = __importDefault(require("./filling.schema"));
// setting up document routes here
Export.get("/filling", validator_1.default(filling_schema_1.default), filling_handler_1.default);
exports.default = Export;
