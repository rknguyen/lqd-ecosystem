import { RKError } from '../utils/response'
import Admin from '../models/Admin'

export default async (req: any, res: any, next: any) => {
  const adminCond = { userID: req.user._id }
  const admin = await Admin.findOne(adminCond)
  if (admin === null) {
    return res.json(
      (new RKError('Bạn không có quyền truy cập vào trang này')).toJSON()
    )
  }
  next()
}