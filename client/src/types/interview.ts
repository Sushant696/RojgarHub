export enum InterviewStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Interview {
  id: string;
  jobApplicationId: string;
  location: string;
  scheduledAt: Date;
  notes?: string;
  status: InterviewStatus;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

