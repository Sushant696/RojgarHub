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
  // const response = await fetch(`${process.env.API_URL}/api/auth`, {
  const response = await fetch(`http://localhost:5500/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: formData.phoneNo,
      password: formData.password,
    }),
  });

  const data = await response.json();
  if (!data?.success) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
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
  console.log(response);

  if (!response.status) {
    console.log(response);
    throw new Error(response.data?.message || "Something went wrong");
  }
}

async function Verify() {
  const response = await axios.get("hello");
  return response;
}

async function Logout() {
  const response = await axios.get("hello");
  return response;
}

export const authApi = { Login, Register, Verify, Logout };
