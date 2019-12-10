import Users from "../../models/Users";
import Informations from "../../models/Information";
import { RKSuccess } from "../../utils/response";

async function Handler(req: any, res: any) {
  const users: any = await Users.find();
  const usersList = [];
  for (let user of users) {
    user = user.toObject();

    const { _id: userId } = user;
    const information = await Informations.findOne({ userId });
    if (information !== null) {
      user.information = information.toObject();
    } else {
      user.information = {
        dob: null,
        name: null,
        class: null,
        schoolYear: null
      };
    }

    delete user.services;
    usersList.push(user);
  }
  return res.json(
    new RKSuccess("Lấy danh sách người dùng thành công", usersList)
  );
}

export default Handler;
