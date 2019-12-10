import CheckIn from "../../models/CheckIn";
import isObjectId from "../../utils/objectid";
import { RKError, RKSuccess } from "../../utils/response";

async function Handler(req: any, res: any) {
  const { userId } = req.all;
  if (!isObjectId.test(userId)) {
    return res.json(new RKError("userId không hợp lệ").toJSON());
  }

  const { face } = req.all;
  const now = new Date().getTime();
  await CheckIn.create({ face, userId, createdAt: now });
  return res.json(new RKSuccess("Điểm danh thành công").toJSON());
}

export default Handler;
