import api from "../lib/axios";
import { apiURLs } from "../lib/apiURLs";

async function getAllJobs() {
  try {
    const response = await api.get(`${apiURLs.Employer.jobs}/`, {
      withCredentials: true,
    });
    return response.data?.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getEmployerById() {
  try {
    const response = await api.get(`${apiURLs.Employer.getById}`, {
      withCredentials: true,
    });
    return response.data?.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getCandidateByEmployer() {
  try {
    const response = await api.get(apiURLs.Employer.candidates, {
      withCredentials: true,
    });
    return response.data?.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getEmployerApplication() {
  try {
    const response = await api.get(apiURLs.Employer.applications, {
      withCredentials: true,
    });
    return response.data?.data?.applications;
  } catch (error: any) {
    console.error(
      "Error fetching application:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function updateEmployer(employerId: string, updateData: any) {
  try {
    const response = await api.patch(
      `${apiURLs.Employer.update}/${employerId}`,
      updateData,
      {
        headers: { "Content-Type": "multipart/form-data" },
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

export const employerApi = {
  getAllJobs,
  getEmployerById,
  updateEmployer,
  getEmployerApplication,
  getCandidateByEmployer,
};
