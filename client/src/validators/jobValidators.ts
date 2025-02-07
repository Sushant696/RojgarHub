import * as Yup from "yup";

const jobPostingSchema = Yup.object().shape({
  title: Yup.string().required("Job title is required"),
  jobDescription: Yup.string().required("Job description is required"),
  salaryMin: Yup.number().required("Minimum salary is required"),
  salaryMax: Yup.number().required("Maximum salary is required"),
  location: Yup.string().required("Location is required"),
  type: Yup.string()
    .required("Job type is required")
    .oneOf(
      ["full-time", "part-time", "contract", "internship", "remote"],
      "Invalid job type",
    ),
  requirements: Yup.string().required("Requirements are required"),
});

export const UpdatePostSchema = Yup.object({
  salaryMin: Yup.number().min(0, "Salary cannot be negative"),
  salaryMax: Yup.number()
    .min(0, "Salary cannot be negative")
    .test(
      "is-greater",
      "Maximum salary must be greater than minimum salary",
      function(value) {
        const { salaryMin } = this.parent;
        if (salaryMin && value) {
          return value > salaryMin;
        }
        return true;
      },
    ),
});
export default jobPostingSchema;

export type JobPostingTypes = Yup.InferType<typeof jobPostingSchema>;
