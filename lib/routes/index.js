"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = __importDefault(require("./document"));
const filling_1 = __importDefault(require("./filling"));
const users_1 = __importDefault(require("./users"));
const export_1 = __importDefault(require("./export"));
const checkin_1 = __importDefault(require("./checkin"));
function Setup(app) {
    app.use("/document", document_1.default);
    app.use("/filling", filling_1.default);
    app.use("/users", users_1.default);
    app.use("/export", export_1.default);
    app.use("/checkin", checkin_1.default);
}
exports.default = Setup;
