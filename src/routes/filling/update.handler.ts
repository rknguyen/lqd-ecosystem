const SchemaValidator = require('schema-validator')
import { RKError, RKSuccess } from '../../utils/response'

import Filling from '../../models/Filling'

async function Handler(req: any, res: any) {
  const { fillingID, fields } = req.body

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

  // update filling row
  try {
    const fillingCond = { _id: fillingID }
    const filling: any = await Filling.findOne(fillingCond)

    if (filling === null) {
      return res.json(
        (new RKError('Không tìm thấy bản ghi để cập nhật')).toJSON()
      )
    }

    const { ownerID } = filling
    if (ownerID !== req.user._id.toString()) {
      return res.json(
        (new RKError('Bạn không có quyền xoá bản ghi này')).toJSON()
      )
    }

    const updRow = { fields }
    await Filling.updateOne(fillingCond, updRow)
  }
  catch(err) {
    console.log(err)
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }

  return res.json(
    (new RKSuccess('Cập nhật văn bản thành công')).toJSON()
  )
}

export default Handler