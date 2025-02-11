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

async function getEmployerById(employerId: string) {
  try {
    const response = await api.get(`${apiURLs.Employer.jobs}${employerId}`, {
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
    console.log(response);
    return response.data?.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

export const employerApi = {
  getAllJobs,
  getEmployerById,
  getCandidateByEmployer,
};
