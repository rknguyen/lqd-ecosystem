"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const InformationSchema = new mongoose_1.default.Schema({
    userId: String,
    dob: String,
    name: String,
    class: String,
    schoolYear: String
});
mongoose_1.default.model("Informations", InformationSchema);
exports.default = mongoose_1.default.model("Informations");
