import { RKError, RKSuccess } from '../../utils/response'
import Announcement from '../../models/Announcement' 
import isObjectID from '../../utils/objectid'

async function Handler(req: any, res: any) {
  const { announcementID, title, content } = req.all
  
  if (!isObjectID.test(announcementID)) {
    return res.json(
      (new RKError('announcementID không hợp lệ')).toJSON()
    )
  }

  try {
    const announcementCond = { _id: announcementID }
    const announcement = await Announcement.findOne(announcementCond)
    if (announcement === null) {
      return res.json(
        (new RKError('Không tìm thấy thông báo để cập nhật')).toJSON()
      )
    }

    const newAnnouncement = { title, content }
    await Announcement.updateOne(announcementCond, newAnnouncement)
  }
  catch(err) {
    return res.json(
      (new RKError('Đã có lỗi xảy ra', err)).toJSON()
    )
  }

  return res.json(
    (new RKSuccess('Tạo thông báo thành công')).toJSON()
  )
}

export default Handler