import { Router } from "express";
import Validator from "../../utils/validator";

import MustLogined from "../../middleware/authorize";

import CreateCheckInSchema from "./create.schema";
import CreateCheckInHandler from "./create.handler";

import GetCheckInHandler from "./get.handler";

const CheckIn = Router();
CheckIn.get("/", GetCheckInHandler);
CheckIn.post("/create", Validator(CreateCheckInSchema), CreateCheckInHandler);

export default CheckIn;
