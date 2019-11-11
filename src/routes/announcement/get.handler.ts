import isObjectID from '../../utils/objectid'
import { RKSuccess } from '../../utils/response'

import Announcement from '../../models/Announcement'

async function Handler(req: any, res: any) {
  const { announcementID } = req.all
  const announcementCond = isObjectID.test(announcementID) ? { _id: announcementID } : {}
  const announcement: any = await Announcement.find(announcementCond)
  return res.json(
    (new RKSuccess('Lấy thông báo thành công', announcement)).toJSON()
  )
}

export default Handler