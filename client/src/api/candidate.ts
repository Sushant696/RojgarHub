import { apiURLs } from "@/lib/apiURLs";
import api from "@/lib/axios";
import DisplayErrorToast from "@/utils/displayErrorMessage";

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

async function getCandidateDashboardData(candidateId: string) {
  try {
    const response = await api.get(
      `${apiURLs.Candidate.dashboardData}/${candidateId}`,
      {
        withCredentials: true,
      },
    );
    return response.data?.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function editCandidateProfile(candidateData: any) {
  try {
    const response = await api.patch(
      `${apiURLs.Candidate.update}`,
      { ...candidateData },
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error);
    DisplayErrorToast(error);
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

export const candidateAction = {
  getCandidateById,
  editCandidateProfile,
  getCandidateApplications,
  getCandidateDashboardData,
};
