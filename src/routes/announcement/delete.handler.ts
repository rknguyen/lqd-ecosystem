import isObjectID from '../../utils/objectid'
import { RKError, RKSuccess } from '../../utils/response'

import Announcement from '../../models/Announcement'

async function Handler(req: any, res: any) {
  const { announcementID } = req.all

  if (!isObjectID.test(announcementID)) {
    return res.json(
      (new RKError('ID thông báo không hợp lệ')).toJSON()
    )
  }

  try {
    const announcementCond = { _id: announcementID }
    const announcement: any = await Announcement.findOne(announcementCond)

    if (announcement === null) {
      return res.json(
        (new RKError('Không tìm ra thông báo để xoá')).toJSON()
      ) 
    }

    await Announcement.deleteOne(announcementCond)
  }
  catch(err) {
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }

  return res.json(
    (new RKSuccess('Xoá thông báo thành công')).toJSON()
  )
}

export default Handler