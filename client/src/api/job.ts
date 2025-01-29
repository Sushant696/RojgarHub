import api from "../lib/axios";
import { apiURLs } from "../lib/apiURLs";

async function getAllUsers() {
  const response = await api.post(apiURLs.AUTH.login, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response;
}

async function test() {
  const response = await api.get(apiURLs.Jobs.test, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  console.log(response.statusText);
  if (!response.statusText) {
    throw new Error(response.data.message || "Something went wrong!");
  }
  console.log(response.statusText);
  return response;
}

export { getAllUsers, test };
