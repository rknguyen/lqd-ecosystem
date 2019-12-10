import { Router } from "express";
import Validator from "../../utils/validator";

import CreateCheckInSchema from "./create.schema";
import CreateCheckInHandler from "./create.handler";

import GetCheckInHandler from "./get.handler";

const CheckIn = Router();
CheckIn.get("/", GetCheckInHandler);
CheckIn.post("/create", Validator(CreateCheckInSchema), CreateCheckInHandler);

export default CheckIn;
