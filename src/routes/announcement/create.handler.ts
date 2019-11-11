import { RKError, RKSuccess } from '../../utils/response'
import Announcement from '../../models/Announcement'

async function Handler(req: any, res: any) {
  const { title, content } = req.all
  const announcement = {
    title,
    content
  }
  try {
    await Announcement.create(announcement)
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