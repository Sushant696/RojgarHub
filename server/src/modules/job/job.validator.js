import Yup, { object, string } from "yup";

const postJobSchema = Yup.object().shape({
  title: Yup.string().required("Job title is required"),
  jobDescription: Yup.string().required("Job description is required"),
  salaryMin: Yup.number().required("Minimum salary is required"),
  salaryMax: Yup.number()
    .required("Maximum salary is required")
    .moreThan(
      Yup.ref("salaryMin"),
      "Max salary must be greater than min salary",
    ),
  location: Yup.string().required("Location is required"),
  type: Yup.string()
    .required("Job type is required")
    .oneOf(
      ["full-time", "part-time", "contract", "internship", "remote"],
      "Invalid job type",
    ),
  requirements: Yup.string().required("Requirements are required"),
});

export const JobValidatorSchema = { postJobSchema };
