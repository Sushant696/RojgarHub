import * as Yup from "yup";

export const registerSchema = Yup.object({
  username: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers allowed")
    .min(10, "Must be at least 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const userLoginSchema = Yup.object().shape({
  phoneNo: Yup.string().required("Mobile Number is required").min(10).max(10),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
