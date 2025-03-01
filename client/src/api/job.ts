import api from "../lib/axios";
import { apiURLs } from "../lib/apiURLs";

import { JobPostingTypes } from "@/validators/jobValidators";
import DisplayErrorToast from "@/utils/displayErrorMessage";
import showNotification from "@/utils/toastify";

async function getAllJobs() {
  try {
    const response = await api.get(apiURLs.Jobs.get, {
      withCredentials: true,
    });
    return response.data?.data;
  } catch (error: any) {
    console.error("Error fetching job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getSearchedJob(searchParams: {
  keywords?: string;
  industry?: string;
  location?: string;
}) {
  try {
    const params = new URLSearchParams();

    // Only append non-empty values
    if (searchParams.keywords?.trim())
      params.append("keywords", searchParams.keywords.trim());
    if (searchParams.industry?.trim())
      params.append("industry", searchParams.industry.trim());
    if (searchParams.location?.trim())
      params.append("location", searchParams.location.trim());

    const response = await api.get(
      `${apiURLs.Jobs.search}?${params.toString()}`,
      { withCredentials: true },
    );

    return response.data?.data?.jobs || [];
  } catch (error: any) {
    console.error(
      "Error searching jobs:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Failed to search jobs!");
  }
}

// private api call actions
async function postJob(formData: JobPostingTypes) {
  try {
    const response = await api.post(apiURLs.Jobs.postJob, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error posting job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function updateJob(formData: any) {
  try {
    const response = await api.patch(
      `${apiURLs.Jobs.editJob}/${formData.id}`,
      formData.values,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getJobById(jobId: string) {
  try {
    const response = await api.get(`${apiURLs.Jobs.getById}/${jobId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    DisplayErrorToast(error);
    showNotification("error", error?.respone?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getJobByIdPublic(jobId: string) {
  try {
    const response = await api.get(`${apiURLs.Jobs.getByIdPublic}/${jobId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    DisplayErrorToast(error);
    showNotification("error", error?.respone?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function toogleJobStatus(jobId: string) {
  try {
    const response = await api.get(`${apiURLs.Jobs.toggleJob}/${jobId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    DisplayErrorToast(error);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function deleteJob(jobId: string) {
  try {
    const response = await api.delete(`${apiURLs.Jobs.deleteJob}/${jobId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    DisplayErrorToast(error);
    showNotification("error", error?.respone?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getJobCandidates() {
  try {
    const response = await api.get(apiURLs.Jobs.candidates, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getJobApplication() {
  try {
    const response = await api.get(`${apiURLs.Jobs.applications}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    DisplayErrorToast(error);
    showNotification("error", error?.respone?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

export const jobAction = {
  postJob,
  getAllJobs,
  updateJob,
  getJobById,
  toogleJobStatus,
  getSearchedJob,
  deleteJob,
  getJobApplication,
  getJobCandidates,
  getJobByIdPublic,
};
