"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Pizzip = require('pizzip');
const Templater = require('docxtemplater');
function Make(filePath, data, outputPath) {
    const content = fs_1.default.readFileSync(filePath, 'binary');
    const document = (new Templater()).loadZip(new Pizzip(content));
    document.setData(data);
    try {
        document.render();
        const outputBuffer = document.getZip().generate({ type: 'nodebuffer' });
        fs_1.default.writeFileSync(outputPath, outputBuffer);
    }
    catch (error) {
        return error;
    }
}
exports.Make = Make;
