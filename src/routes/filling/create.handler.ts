const SchemaValidator = require('schema-validator')
import { RKError, RKSuccess } from '../../utils/response'

import Document from '../../models/Document'
import Filling from '../../models/Filling'

async function Handler(req: any, res: any) {
  const { documentID, fields } = req.all

  // check document is exists
  const documentCond = { _id: documentID }
  const document = await Document.findOne(documentCond)
  if (document === null) {
    return res.json(
      (new RKError('Không tìm thấy văn bản', { documentID })).toJSON()
    )
  }

  // check field is valid or not
  const fieldSchema = {
    value: { 
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    }
  }
  const fieldValidator = new SchemaValidator(fieldSchema)
  for (let field of fields) {
    const ret = fieldValidator.check(field)
    if (ret._error) {
      const debug = {
        error: {
          at: field,
          message: ret
        },
        schema: fieldSchema,
      }
      return res.json(
        (new RKError('Trường nhập vào không hợp lệ', debug)).toJSON()
      )
    }
  }

  // create filling row
  try {
    const row = {
      ownerID: req.user._id,
      fields,
      documentID
    }
    await Filling.create(row)
  }
  catch(err) {
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }

  return res.json(
    (new RKSuccess('Điền văn bản thành công')).toJSON()
  )
}

export default Handler