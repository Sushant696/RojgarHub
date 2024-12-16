import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  contactNo: { type: String, require: true },
  jobListed: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
})

export const employer = mongoose.model("Employer", employerSchema);
