import { Job } from "./job";

type Skill = string;

export type CandidateProfile = {
  id: string;
  jobId: string;
  candidateId: string;
  bio?: string;
  fullName: string;
  phone: string;
  profile?: string;
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
  duration: Date;
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
