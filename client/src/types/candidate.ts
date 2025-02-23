import { Job } from "./job";

type Skill = string;

export type CandidateProfile = {
  id: string;
  jobId: string;
  candidateId: string;
  fullName: string;
  phone: string;
  profilePicture?: string;
  skills?: Skill[];
  location?: string;
  education?: Education[];
  experience?: Experience[];
  resumeUrl?: string | null;
  websiteLink?: string;
  createdAt: string;
  updatedAt: string;
  job?: Job;
};

export type Education = {
  degree: string;
  institution: string;
  year: number;
};

export type Experience = {
  title: string;
  company: string;
  startDate: string;
  position: string;
  endDate: string | null;
  description: string;
};
