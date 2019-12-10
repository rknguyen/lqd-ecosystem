import { Router } from "express";
import Validator from "../../utils/validator";

import MustLogined from "../../middleware/authorize";
import MustBeAdmin from "../../middleware/admin";

import DeleteUserHandler from "./delete.handler";
import DeleteUserSchema from "./delete.schema";

import SetAdminHandler from "./setAdmin.handler";
import SetAdminSchema from "./setAdmin.schema";

import RemoveAdminHandler from "./removeAdmin.handler";
import RemoveAdminSchema from "./removeAdmin.schema";

import UpdateUserInformationHandler from "./update.handler";
import UpdateUserInformationSchema from "./update.schema";

import GetUserHandler from "./get.handler";

const Users = Router();

// setting up document routes here
Users.get("/", GetUserHandler);
Users.post(
  "/update",
  MustLogined,
  Validator(UpdateUserInformationSchema),
  UpdateUserInformationHandler
);
Users.post(
  "/delete",
  MustLogined,
  MustBeAdmin,
  Validator(DeleteUserSchema),
  DeleteUserHandler
);
Users.post(
  "/setAdmin",
  MustLogined,
  Validator(SetAdminSchema),
  SetAdminHandler
);
Users.post(
  "/removeAdmin",
  MustLogined,
  MustBeAdmin,
  Validator(RemoveAdminSchema),
  RemoveAdminHandler
);

export default Users;
