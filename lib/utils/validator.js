"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
const SchemaValidator = require('schema-validator');
function Validate(schema) {
    return function (req, res, next) {
        const Validator = new SchemaValidator(schema.schema);
        let body = {};
        if (schema.on.includes('query') && req.query) {
            body = Object.assign(Object.assign({}, body), req.query);
        }
        if (schema.on.includes('body') && req.body) {
            body = Object.assign(Object.assign({}, body), req.body);
        }
        if (schema.on.includes('fields') && req.fields && req.fields.data) {
            body = Object.assign(Object.assign({}, body), JSON.parse(req.fields.data));
        }
        if (schema.on.includes('files') && req.files) {
            body = Object.assign(Object.assign({}, body), req.files);
        }
        req.all = body;
        const ret = Object.assign({}, Validator.check(body));
        if (ret._error) {
            delete ret._error;
            return res.json((new response_1.RKError('Dữ liệu vào không chính xác', ret)));
        }
        next();
    };
}
exports.default = Validate;
