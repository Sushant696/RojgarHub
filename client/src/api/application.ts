import { apiURLs } from "@/lib/apiURLs";
import api from "@/lib/axios";
import { ApplicationStatus } from "@/types/job";
import DisplayErrorToast from "@/utils/displayErrorMessage";

async function createApplication(
  candidateId: string,
  jobId: string,
  applicationData: any,
) {
  try {
    const response = await api.post(
      `${apiURLs.Application.createApplication}/${jobId}`,
      { candidateId, ...applicationData },
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

interface InterviewSchedulerProps {
  applicationId: string;
  interviewObj: {
    scheduledAt: string;
    time: string;
    location: string;
    notes?: string;
  };
}

async function scheduleInterview({
  applicationId,
  interviewObj,
}: InterviewSchedulerProps) {
  try {
    const response = await api.post(
      `${apiURLs.Application.interviewSchedule}/${applicationId}`,
      { interviewObj },
      { withCredentials: true },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching application:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function updateInterview({ id, data }: { id: string; data: any }) {
  try {
    const response = await api.patch(
      `${apiURLs.Application.updateInterview}/${id}`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating interview:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

async function deleteInterview(id: string) {
  try {
    const response = await api.delete(
      `${apiURLs.Application.deleteInterview}/${id}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting interview:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

export const applicationActions = {
  applicationStatus,
  getApplicationById,
  scheduleInterview,
  deleteInterview,
  updateInterview,
  createApplication,
};
