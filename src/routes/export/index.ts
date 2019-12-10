import { Router } from "express";
import Validator from "../../utils/validator";

const Export = Router();

import ExportFillingHandler from "./filling.handler";
import ExportFillingSchema from "./filling.schema";

// setting up document routes here
Export.get("/filling", Validator(ExportFillingSchema), ExportFillingHandler);

export default Export;
