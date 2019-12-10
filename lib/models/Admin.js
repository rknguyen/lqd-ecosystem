"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminsSchema = new mongoose_1.default.Schema({
    userID: String
});
mongoose_1.default.model('Admins', AdminsSchema);
exports.default = mongoose_1.default.model('Admins');
