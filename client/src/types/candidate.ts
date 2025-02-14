export interface CandidateProfile {
  id: string;
  userId: string;
  fullName: string;
  phone?: string | null;
  profile?: string | null;
  bio?: string | null;
  skills?: string[] | null;
  location?: string | null;
  education?: EducationEntry[] | null;
  experience?: ExperienceEntry[] | null;
  resumeUrl?: string | null;
  websiteLink?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EducationEntry {
  year: number;
  degree: string;
  institution: string;
}

export interface ExperienceEntry {
  company: string;
  duration: string;
  position: string;
  description: string;
}
