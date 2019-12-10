import CheckIn from "../../models/CheckIn";
import { RKSuccess } from "../../utils/response";

async function Handler(req: any, res: any) {
  const CheckIns = await CheckIn.find();
  return res.json(new RKSuccess("Lấy lịch sử điểm danh thành công", CheckIns));
}

export default Handler;
