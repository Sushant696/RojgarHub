import axios from "axios";
import api from "../lib/axios";
import { apiURLs } from "../lib/apiURLs";

interface FormDataTypes {
  phoneNo: string;
  password: string;
}
interface RegisterFormtypes {
  username: string;
  email: string;
  contact: string;
  password: string;
}

async function Login(formData: FormDataTypes) {
  const response = await api.post(
    apiURLs.AUTH.login,
    {
      contact: formData.phoneNo,
      password: formData.password,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );

  console.log(response.statusText);
  if (!response.statusText) {
    throw new Error(response.data.message || "Something went wrong!");
  }
  console.log(response.statusText);
  return response;
}

async function Register(formData: RegisterFormtypes, currentUser: string) {
  const response = await api.post(
    apiURLs.AUTH.register,
    {
      username: formData.username,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
      role: currentUser.toUpperCase(),
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!response.status) {
    throw new Error(response.data?.message || "Something went wrong");
  }
}

async function Verify() {
  const response = await axios.get("hello");
  return response;
}

async function Logout() {
  const response = await api.get(apiURLs.AUTH.logout, {
    withCredentials: true,
  });

  return response;
}

export const authApi = { Login, Register, Verify, Logout };
