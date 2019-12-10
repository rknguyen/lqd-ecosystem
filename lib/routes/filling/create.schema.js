"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    on: ['body'],
    schema: {
        documentID: {
            type: String,
            required: true
        },
        fields: {
            type: Array,
            required: true
        }
    }
};
