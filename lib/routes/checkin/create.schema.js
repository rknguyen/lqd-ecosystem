"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    on: ["body"],
    schema: {
        userId: {
            type: String,
            required: true
        },
        face: {
            type: String,
            required: true
        }
    }
};
