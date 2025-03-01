import { CandidateProfile, Education, Experience } from "./candidate";
import { Interview } from "./interview";

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
  candidate: CandidateProfile;
  job?: Job;
  interviews?: Interview;
}

export type Job = {
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
  status: string;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
};

type Skill = string;

export interface JobResponse {
  success: boolean;
  data: {
    job: Job;
  };
  statusCode: number;
  message: string;
}
