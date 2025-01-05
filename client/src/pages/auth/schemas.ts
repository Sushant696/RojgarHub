import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: Yup.string().required().min(10).max(10),
  password: Yup.string().required(),
});

export const userLoginSchema = Yup.object().shape({
  phoneNo: Yup.string().required("Mobile Number is required").min(10).max(10),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
