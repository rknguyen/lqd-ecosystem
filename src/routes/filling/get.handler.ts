import isObjectID from '../../utils/objectid'
import { RKSuccess } from '../../utils/response'

import Flilling from '../../models/Filling'

async function Handler(req: any, res: any) {
  const { fillingID } = req.all
  const fillingCond = isObjectID.test(fillingID) ? { _id: fillingID } : {}
  const filling: any = await Flilling.find(fillingCond)
  return res.json(
    (new RKSuccess('Lấy bản ghi thành công', filling)).toJSON()
  )
}

export default Handler