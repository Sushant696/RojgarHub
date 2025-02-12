// types/job.ts

export type JobStatus = "OPEN" | "CLOSED";
export type ApplicationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REVIEWING"
  | "REJECTED";

export const ApplicationStatusValues: Record<
  ApplicationStatus,
  ApplicationStatus
> = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REVIEWING: "REVIEWING",
  REJECTED: "REJECTED",
};

export interface Education {
  year: number;
  degree: string;
  institution: string;
}

export interface Experience {
  company: string;
  duration: string;
  position: string;
  description: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  fullName: string;
  phone: string | null;
  bio: string | null;
  skills: string[] | null;
  location: string | null;
  education: Education[] | null;
  experience: Experience[] | null;
  cv: string | null;
  resumeUrl: string | null;
  websiteLink: string | null;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  candidate: Candidate;
}

export interface Candidate {
  id: string;
  userId: string;
  fullName: string;
  phone: string | null;
  bio: string | null;
  skills: string[] | null;
  location: string | null;
  education: Education[] | null;
  experience: Experience[] | null;
  resumeUrl: string | null;
  websiteLink: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  employerId: string;
  title: string;
  image: string;
  jobDescription: string;
  requirements: string;
  type: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  applications: Application[];
}

export interface JobResponse {
  success: boolean;
  data: {
    job: Job;
  };
  statusCode: number;
  message: string;
}
