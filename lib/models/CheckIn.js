"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CheckInSchema = new mongoose_1.default.Schema({
    face: String,
    userId: String,
    createdAt: Number
});
mongoose_1.default.model("CheckIns", CheckInSchema);
exports.default = mongoose_1.default.model("CheckIns");
