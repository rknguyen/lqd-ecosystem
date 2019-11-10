import { RKError, RKSuccess } from '../../utils/response'
import isObjectID from '../../utils/objectid'

import Users from '../../models/Users'

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

    if (user._id.toString() === req.user._id.toString()) {
      return res.json(
        (new RKError('Không thể xoá chính bạn')).toJSON()
      )
    }
    
    // delete user
    await Users.deleteOne(userCond)
  }
  catch(err) {
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }

  return res.json(
    (new RKSuccess('Xoá người dùng thành công')).toJSON()
  )
}

export default Handler