import isObjectID from '../../utils/objectid'
import { RKSuccess } from '../../utils/response'

import Flilling from '../../models/Filling'
import Admin from '../../models/Admin'

async function Handler(req: any, res: any) {
  const { documentID } = req.all
  let fillingCond: any = isObjectID.test(documentID) ? { documentID: documentID } : {}

  const adminCond = { userID: req.user._id.toString() }
  const admin = await Admin.findOne(adminCond)

  if (admin === null) {
    fillingCond = { 
      ...fillingCond, 
      ownerID: req.user._id.toString() 
    }
  }

  const filling: any = await Flilling.find(fillingCond)
  return res.json(
    (new RKSuccess('Lấy bản ghi thành công', filling)).toJSON()
  )
}

export default Handler