import fs from 'fs'
const SchemaValidator = require('schema-validator')
import { RKError, RKSuccess } from '../../utils/response'

import Document from '../../models/Document'
import createAttactmentModel from '../../models/Attachment'

const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

function writeAttachmentPromise(file: any) {
  return new Promise((resolve, reject) => {
    const attachmentStream = fs.createReadStream(file.path)
    const options = { 
      filename: file.name,
      contentType: DOCX_TYPE
    }
    const Attachment = createAttactmentModel()
    Attachment.write(options, attachmentStream, (error: any, file: any) => {
      if (error) return reject(error)
      resolve(file)
    })
  }) 
}

async function Handler(req: any, res: any) {
  const { name, fields, attachment } = req.all

  if (attachment.type !== DOCX_TYPE) {
    return res.json(
      (new RKError('Tệp văn bản bắt buộc phải là docx')).toJSON()
    )
  }

  // check field is valid or not
  const fieldSchema = {
    name: { 
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

  try {
    const _attachment : any = await writeAttachmentPromise(attachment)
    const document = {
      name,
      fields,
      attachmentID: _attachment._id
    }
    await Document.create(document)
  }
  catch(err) {
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }
  
  return res.json(
    (new RKSuccess('Tạo văn bản thành công')).toJSON()
  )
}

export default Handler