import { apiURLs } from "@/lib/apiURLs";
import api from "@/lib/axios";

async function getCandidateById() {
  try {
    const response = await api.get(`${apiURLs.Candidate.getById}`, {
      withCredentials: true,
    });
    return response.data?.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getCandidateApplications() {
  try {
    const response = await api.get(`${apiURLs.Candidate.applications}`, {
      withCredentials: true,
    });
    return response.data?.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

export const candidateAction = { getCandidateById, getCandidateApplications };
