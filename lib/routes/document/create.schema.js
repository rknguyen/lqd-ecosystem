"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    on: ['fields', 'files'],
    schema: {
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
        attachment: {
            required: true
        }
    }
};
