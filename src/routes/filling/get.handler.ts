import isObjectID from "../../utils/objectid";
import { RKSuccess } from "../../utils/response";

import Flilling from "../../models/Filling";
import Admin from "../../models/Admin";
import Information from "../../models/Information";
import Document from "../../models/Document";

async function Handler(req: any, res: any) {
  const { fillingID } = req.all;
  let fillingCond: any = isObjectID.test(fillingID) ? { _id: fillingID } : {};

  const adminCond = { userID: req.user._id.toString() };
  const admin = await Admin.findOne(adminCond);

  if (admin === null) {
    fillingCond = {
      ...fillingCond,
      ownerID: req.user._id.toString()
    };
  }

  const filling: any = await Flilling.find(fillingCond);

  let fillingList = [];
  for (let fill of filling) {
    fill = fill.toObject();
    const { ownerID, documentID } = fill;
    const user: any = await Information.findOne({ userId: ownerID });
    const docs: any = await Document.findOne({ _id: documentID });
    fill.ownerName = user ? user.name : null;
    fill.docName = docs.name;
    fillingList.push(fill);
  }
  return res.json(
    new RKSuccess("Lấy bản ghi thành công", fillingList).toJSON()
  );
}

export default Handler;
