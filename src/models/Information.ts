import mongoose from "mongoose";

const InformationSchema = new mongoose.Schema({
  userId: String,
  dob: String,
  name: String,
  class: String,
  schoolYear: String
});

mongoose.model("Informations", InformationSchema);

export default mongoose.model("Informations");
