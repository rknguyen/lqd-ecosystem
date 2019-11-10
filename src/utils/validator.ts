import { RKError } from './response'
const SchemaValidator = require('schema-validator')

function Validate(schema: any) {
  return function(req: any, res: any, next: any) {
    const Validator = new SchemaValidator(schema.schema)
    let body = {}

    if (schema.on.includes('query') && req.query) {
      body = { ...body, ...req.query }
    }

    if (schema.on.includes('body') && req.body) {
      body = { ...body, ...req.body }
    }

    if (schema.on.includes('fields') && req.fields && req.fields.data) {
      body = { ...body, ...JSON.parse(req.fields.data) }
    }

    if (schema.on.includes('files') && req.files) {
      body = { ...body, ...req.files }
    }

    req.all = body

    const ret: any = { ...Validator.check(body) }
    if (ret._error) {
      delete ret._error
      return res.json(
        (new RKError('Dữ liệu vào không chính xác', ret))
      )
    }
    next()
  }
}

export default Validate