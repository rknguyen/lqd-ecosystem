import isObjectID from '../../utils/objectid'
import { RKSuccess } from '../../utils/response'

import Document from '../../models/Document'

async function Handler(req: any, res: any) {
  const { documentID } = req.all
  const documentCond = isObjectID.test(documentID) ? { _id: documentID } : {}
  const document: any = await Document.find(documentCond)
  return res.json(
    (new RKSuccess('Lấy văn bản thành công', document)).toJSON()
  )
}

export default Handler