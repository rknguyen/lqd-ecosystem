import CheckIn from "../../models/CheckIn";
import { RKSuccess } from "../../utils/response";

import Informations from "../../models/Information";

async function Handler(req: any, res: any) {
  const CheckIns: any = await CheckIn.find();
  const CheckInList = [];
  for (let checkin of CheckIns) {
    checkin = checkin.toObject();

    const { userId } = checkin;
    const information = await Informations.findOne({ userId });
    if (information !== null) {
      checkin.information = information.toObject();
    }

    CheckInList.push(checkin);
  }
  return res.json(
    new RKSuccess("Lấy lịch sử điểm danh thành công", CheckInList)
  );
}

export default Handler;
