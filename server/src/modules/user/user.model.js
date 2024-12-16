import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String },
  email: { type: String, require: true },
  contact: { type: String, require: true },
  appliedJob: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }
})

export const User = mongoose.model("User", userSchema);
