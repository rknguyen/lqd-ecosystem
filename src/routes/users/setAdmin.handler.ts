import { RKError, RKSuccess } from '../../utils/response'
import isObjectID from '../../utils/objectid'

import Users from '../../models/Users'
import Admin from '../../models/Admin'

async function Handler(req: any, res: any) {
  const { userID } = req.all
  if (!isObjectID.test(userID)) {
    return res.json(
      (new RKError('userID không hợp lệ')).toJSON()
    )
  }

  try {
    const userCond = { _id: userID }
    const user = await Users.findOne(userCond)

    if (user === null) {
      return res.json(
        (new RKError('Người dùng này không tồn tại')).toJSON()
      )
    }

    const adminCond = { userID }
    const admin = await Admin.findOne(adminCond)
    if (admin !== null) {
      return res.json(
        (new RKError('Người dùng này đang là quản trị viên')).toJSON()
      )
    }

    await Admin.create(adminCond)
  }
  catch(err) {
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }

  return res.json(
    (new RKSuccess('Nâng quyền quản trị thành công')).toJSON()
  )
}

export default Handler