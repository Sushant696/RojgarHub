import api from "../lib/axios";
import { apiURLs } from "../lib/apiURLs";

import { JobPostingTypes } from "@/validators/jobValidators";

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

async function getAllJobs() {
  try {
    const response = await api.get(apiURLs.Jobs.get, {
      withCredentials: true,
    });
    return response.data?.data;
  } catch (error: any) {
    console.error("Error posting job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getJobById(jobId: string) {
  console.log(jobId);
  try {
    const response = await api.get(`${apiURLs.Jobs.getById}/${jobId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error posting job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

export const jobAction = { postJob, getAllJobs, getJobById };
