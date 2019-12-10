import express from "express";

import DocumentRoute from "./document";
import FillingRoute from "./filling";
import UsersRoute from "./users";
import ExportRoute from "./export";
import CheckInRoute from "./checkin";

function Setup(app: express.Application) {
  app.use("/document", DocumentRoute);
  app.use("/filling", FillingRoute);
  app.use("/users", UsersRoute);
  app.use("/export", ExportRoute);
  app.use("/checkin", CheckInRoute);
}

export default Setup;
