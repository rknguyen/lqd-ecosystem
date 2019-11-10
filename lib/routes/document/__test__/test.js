"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const create_service_1 = require("../create.service");
try {
    create_service_1.Make(path_1.default.resolve(__dirname, 'intro.docx'), { name: 'RK Nguyen', age: 17 }, path_1.default.resolve(__dirname, 'rendered-intro.docx'));
    console.log('Created successfully');
}
catch (e) {
    console.error(e);
}
