"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const { db_name } = process.env;
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.connect(`mongodb://localhost:27017/${db_name}`, opts);
exports.default = mongoose_1.default;
