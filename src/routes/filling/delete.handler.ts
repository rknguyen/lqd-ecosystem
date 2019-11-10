import isObjectID from '../../utils/objectid'
import { RKError, RKSuccess } from '../../utils/response'

import Filling from '../../models/Filling'
import Admin from '../../models/Admin'

async function Handler(req: any, res: any) {
  const { fillingID } = req.all

  if (!isObjectID.test(fillingID)) {
    return res.json(
      (new RKError('ID bản ghi không hợp lệ')).toJSON()
    )
  }

  try {
    const fillingCond = { _id: fillingID }
    const filling: any = await Filling.findOne(fillingCond)

    if (filling === null) {
      return res.json(
        (new RKError('Không tìm ra bản ghi để xoá')).toJSON()
      ) 
    }

    const { ownerID } = filling
    const adminCond = { userID: req.user._id }
    const admin = await Admin.findOne(adminCond)

    // admin can delete any filling
    if (admin === null && ownerID !== req.user._id.toString()) {
      return res.json(
        (new RKError('Bạn không có quyền xoá bản ghi này')).toJSON()
      )
    }

    await Filling.deleteOne(fillingCond)
  }
  catch(err) {
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }

  return res.json(
    (new RKSuccess('Xoá bản ghi thành công')).toJSON()
  )
}

export default Handler