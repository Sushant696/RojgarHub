import { apiURLs } from "../lib/apiURLs";
import api from "../lib/axios";

interface FormDataTypes {
  phoneNo: string;
  password: string;
}
interface RegisterFormtypes {
  username?: string;
  email: string;
  contact: string;
  password: string;
  companyName?: string;
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

  if (!response.statusText) {
    throw new Error(response.data.message || "Something went wrong!");
  }
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
async function Logout() {
  const response = await api.get(apiURLs.AUTH.logout, {
    withCredentials: true,
  });

  return response;
}

async function refresh() {
  const response = await api.get(apiURLs.AUTH.refresh, {
    withCredentials: true,
  });
  return response;
}

async function verify() {
  const response = await api.get(apiURLs.AUTH.verify, {
    withCredentials: true,
  });
  return response;
}

async function updateUser(userId: string, updateData: any) {
  try {
    const response = await api.patch(
      `${apiURLs.AUTH.update}/${userId}`,
      updateData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating employer:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

export const authApi = { Login, Register, Logout, refresh, verify, updateUser };
