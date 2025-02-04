import api from "../lib/axios";
import { apiURLs } from "../lib/apiURLs";

import { JobPostingTypes } from "@/validators/jobValidators";

async function postJob(formData: JobPostingTypes) {
  try {
    console.log(formData);
    const response = await api.post(apiURLs.Jobs.postJob, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    console.log(response.data, " response from the post job");
    return response.data;
  } catch (error: any) {
    console.error("Error posting job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getAllJobs() {
  try {
    const response = await api.get(apiURLs.Jobs.get);
    console.log(response.data, " response from the get job");
    return response.data;
  } catch (error: any) {
    console.error("Error posting job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getJobById(jobId: string) {
  try {
    const response = await api.get(`${apiURLs.Jobs.getById}/${jobId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error posting job:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

export const jobAction = { postJob, getAllJobs, getJobById };
