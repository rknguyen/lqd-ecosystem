"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createModel } = require('mongoose-gridfs');
function createAttactmentModel() {
    return createModel({
        modelName: 'Attachment'
    });
}
exports.default = createAttactmentModel;
