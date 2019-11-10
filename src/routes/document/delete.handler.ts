import isObjectID from '../../utils/objectid'
import { RKError, RKSuccess } from '../../utils/response'

import Document from '../../models/Document'

async function Handler(req: any, res: any) {
  const { documentID } = req.all

  if (!isObjectID.test(documentID)) {
    return res.json(
      (new RKError('ID văn bản không hợp lệ')).toJSON()
    )
  }

  try {
    const documentCond = { _id: documentID }
    const document: any = await Document.findOne(documentCond)

    if (document === null) {
      return res.json(
        (new RKError('Không tìm ra văn bản để xoá')).toJSON()
      ) 
    }

    await Document.deleteOne(documentCond)
  }
  catch(err) {
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }

  return res.json(
    (new RKSuccess('Xoá văn bản thành công')).toJSON()
  )
}

export default Handler