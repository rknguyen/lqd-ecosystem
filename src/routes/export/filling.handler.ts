import fs from 'fs'
import path from 'path'

import { RKError } from '../../utils/response'
import isObjectID from '../../utils/objectid'

import Document from '../../models/Document'
import Filling from '../../models/Filling'
import createAttactmentModel from '../../models/Attachment'

const Pizzip = require('pizzip')
const Templater = require('docxtemplater')

function getAttachmentBuffer(attachmentID: string) {
  const Attachment = createAttactmentModel()
  return new Promise((resolve: any, reject: any) => {
    Attachment.findById(attachmentID, (error: any, file: any) => {
      if (error) return reject(error)
      Attachment.read({ _id: file._id }, (error: any, buffer: any) => {
        if (error) reject(error)
        resolve(buffer)
      })
    })
  })
}

async function Handler(req: any, res: any) {
  const { fillingID } = req.all
  if (!isObjectID.test(fillingID)) {
    return res.json(
      (new RKError('fillingID không hợp lệ')).toJSON()
    )
  }

  try {
    const fillingCond = { _id: fillingID }
    const filling: any  = await Filling.findOne(fillingCond)
    
    if (filling === null) {
      return res.json(
        (new RKError('Bản ghi không tồn tại')).toJSON()
      )
    }

    const { documentID, fields } = filling
    const documentCond = { _id: documentID }
    const document: any = await Document.findOne(documentCond)
    
    if (document === null) {
      return res.json(
        (new RKError('Văn bản không tồn tại')).toJSON()
      )
    }

    // make data from fields
    let data: any = {}
    for (const field of fields) {
      data[field.key] = field.value
    }

    const { attachmentID } = document
    const attachmentBuffer: any = await getAttachmentBuffer(attachmentID)
    const attachmentBinary = Buffer.from(attachmentBuffer).toString('binary')
    
    const fillingDocument = (new Templater()).loadZip(new Pizzip(attachmentBinary))
    fillingDocument.setData(data)
    fillingDocument.render()

    const fillingDocumentBuffer = fillingDocument.getZip().generate({ type: 'nodebuffer' })
    const fillingDocumentName = fillingID.toString() + '_' + (new Date()).getTime().toString() + '.docx'
    const fillingDocumentPath = path.resolve(__dirname, './tmp/' + fillingDocumentName)
    fs.writeFileSync(fillingDocumentPath, fillingDocumentBuffer)

    return res.download(fillingDocumentPath, fillingDocumentName);
  }
  catch(err) {
    console.log(err)
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }
}

export default Handler