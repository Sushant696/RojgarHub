import * as yup from "yup";

const applicationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number")
    .nullable(),
  skills: yup.array().of(yup.string()).nullable(),
  location: yup.string().nullable(),
  education: yup
    .array()
    .of(
      yup.object().shape({
        degree: yup.string().required("Degree is required"),
        institution: yup.string().required("Institution is required"),
        year: yup
          .number()
          .integer("Year must be an integer")
          .min(1900, "Year must be valid")
          .max(new Date().getFullYear(), "Year cannot be in the future"),
      }),
    )
    .nullable(),
  experience: yup
    .array()
    .of(
      yup.object().shape({
        company: yup.string().required("Company name is required"),
        position: yup.string().required("Position is required"),
        startDate: yup.date().required("Start date is required"),
        endDate: yup.string().when("currentJob", {
          is: true,
          then: (schema) =>
            schema
              .transform((value) => (value === "" ? null : value))
              .nullable(),
          otherwise: (schema) =>
            schema
              .required("End date is required")
              .test("is-date", "Invalid date format", (value) => {
                if (!value) return false;
                return !isNaN(new Date(value).getTime());
              }),
        }),
        currentJob: yup.boolean().default(false),
        description: yup.string().nullable(),
      }),
    )
    .nullable(),
  websiteLink: yup
    .string()
    .url("Please Enter a valid website Link.")
    .nullable(),
});

export default applicationSchema;
