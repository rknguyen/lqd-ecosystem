import mongoose from "mongoose";

const CheckInSchema = new mongoose.Schema({
  face: String,
  userId: String,
  createdAt: Number
});

mongoose.model("CheckIns", CheckInSchema);

export default mongoose.model("CheckIns");
