import express from "express";
import cors from "cors";

import * as bodyParser from "body-parser";

import { AccountsPassword } from "@accounts/password";
import { AccountsServer } from "@accounts/server";
import accountsExpress, { userLoader } from "@accounts/rest-express";

import db from "./db";
import MongoDBInterface from "@accounts/mongo";

import SetupRoute from "./routes";

import Admin from "./models/Admin";
import Informations from "./models/Information";

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const accountsPassword = new AccountsPassword({
  validateNewUser: user => {
    return user;
  }
});

const accountsServer = new AccountsServer(
  {
    db: new MongoDBInterface(db.connection),
    tokenSecret: "rknguyen"
  },
  {
    password: accountsPassword
  }
);

app.post(
  "/accounts/user",
  userLoader(accountsServer),
  async (req: any, res: any) => {
    if (!req.user) return res.json({ success: true });

    const adminCond = { userID: (req as any).user._id };
    const admin = await Admin.findOne(adminCond);
    const information = await Informations.findOne({
      userId: (req as any).user._id
    });

    res.json({
      ...(req as any).user,
      isAdmin: admin !== null,
      information
    });
  }
);

app.use(accountsExpress(accountsServer));
app.use(userLoader(accountsServer));

// setting up routes
SetupRoute(app);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
