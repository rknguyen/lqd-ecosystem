import _ from "lodash";

import { RKError, RKSuccess } from "../../utils/response";
import isObjectID from "../../utils/objectid";

import UserInformation from "../../models/Information";

async function Handler(req: any, res: any) {
  const { _id: userId } = req.user;
  if (!isObjectID.test(userId)) {
    return res.json(new RKError("userId không hợp lệ").toJSON());
  }

  const userInformation = req.all;
  const uinfo = await UserInformation.findOne({ userId });
  if (uinfo === null) {
    await UserInformation.create({ ...userInformation, userId });
  } else {
    await UserInformation.updateOne({ userId }, userInformation);
  }

  return res.json(new RKSuccess("Cập nhật thông tin thành công").toJSON());
}

export default Handler;
