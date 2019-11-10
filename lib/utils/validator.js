"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
const SchemaValidator = require('schema-validator');
function Validate(schema) {
    const Validator = new SchemaValidator(schema);
    return function (req, res, next) {
        const body = Object.assign(Object.assign(Object.assign({}, req.body), req.query), req.fields.data);
        const ret = Object.assign({}, Validator.check(body));
        if (ret._error) {
            delete ret._error;
            return res.json((new response_1.RKError('Wrong input', ret)));
        }
        next();
    };
}
exports.default = Validate;
