import { apiURLs } from "@/lib/apiURLs";
import api from "@/lib/axios";
import { ApplicationStatus } from "@/types/job";
import DisplayErrorToast from "@/utils/displayErrorMessage";

async function applicationStatus(
  applicationId: string,
  candidateId: string,
  status: ApplicationStatus,
  jobId: string,
) {
  try {
    const response = await api.patch(
      `${apiURLs.Application.applicationStatus}/${applicationId}`,
      { status, candidateId, jobId },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error);
    DisplayErrorToast(error);
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function getApplicationById(applicationId: string) {
  try {
    const response = await api.get(
      `${apiURLs.Application.applicationById}/${applicationId}`,
      {
        withCredentials: true,
      },
    );
    return response.data?.data;
  } catch (error: any) {
    console.error(
      "Error fetching application:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}
export const applicationActions = { applicationStatus, getApplicationById };
