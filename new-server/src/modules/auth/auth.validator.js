import yup, { object, string } from "yup";

const authRegisterSchema = object({
  username: string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .trim(),
  role: yup
    .string()
    .oneOf(["CANDIDATE", "EMPLOYER"])
    .required("Role is required"),
  email: string()
    .required("Email is required")
    .email("Please enter a valid email")
    .lowercase()
    .trim(),

  contact: string()
    .required("Contact number is required")
    .matches(/^\+?[\d\s-]+$/, "Please enter a valid contact number")
    .min(10, "Contact number must be at least 10 digits")
    .max(10, "Contact number must not exceed 10 digits"),

  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .matches(/[0-12]/, "Password must contain at least one number"),
});

export default authRegisterSchema;
