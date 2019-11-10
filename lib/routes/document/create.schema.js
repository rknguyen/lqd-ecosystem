"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: {
        type: String,
        length: {
            min: 3
        },
        required: true
    },
    fields: {
        type: Array,
        required: true
    },
    document: {
        required: true
    }
};
