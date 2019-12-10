"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UsersSchema = new mongoose_1.default.Schema({
    username: String,
    services: {
        password: {
            bcrypt: String
        }
    }
});
mongoose_1.default.model('Users', UsersSchema);
exports.default = mongoose_1.default.model('Users');
