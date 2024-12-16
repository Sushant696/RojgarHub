import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  role: { type: String, require: true },
  location: { type: String, require: true },
  type: { type: String, require: true },
  industry: { type: String, require: true },
  salary: { type: String, require: true },
  workplace_type: {
    type: ["remote", "onsite",
      "hybrid"], require: true
  },
  selectedCandidate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isOpen: { type: Boolean, require: true },
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

export const job = mongoose.model("Job", jobSchema);
