"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    on: ['body'],
    schema: {
        announcementID: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
};
