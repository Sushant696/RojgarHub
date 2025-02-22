import React from "react";
import { LucideIcon } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowLeft,
  FileText,
  Globe,
  Phone,
  BookOpen,
  Layers,
} from "lucide-react";

import useRouter from "@/lib/router";
import Loading from "@/components/isLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetApplicationById } from "@/hooks/application";
import { ApplicationStatusValues } from "@/types/job"; // Import status values

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

interface Interview {
  scheduledAt: string;
  time: string;
  location: string;
  notes?: string;
  status?: string;
}

interface Job {
  title: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  type: string;
}

interface Candidate {
  fullName: string;
  profile?: string;
  phone: string;
  websiteLink?: string;
  location: string;
  resumeUrl?: string;
  education?: Education[];
  experience?: Experience[];
}

interface Application {
  job: Job;
  candidate: Candidate;
  interviews?: Interview[];
  status: string; // Add status to the Application interface
}

interface ApplicationResponse {
  application: Application;
}

interface ProfileImageProps {
  src?: string;
  alt: string;
}

interface InfoItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
  href?: string;
}

interface EducationItemProps extends Education { }

interface ExperienceItemProps extends Experience { }

interface InterviewItemProps extends Interview { }

const ProfileImage = ({ src, alt }: ProfileImageProps) => (
  <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center">
    {src ? (
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    ) : (
      <User className="h-8 w-8 text-blue-500" />
    )}
  </div>
);

const InfoItem = ({ icon: Icon, children, href }: InfoItemProps) => {
  const content = (
    <div className="flex items-center gap-4 group">
      <Icon className="h-5 w-5 text-blue-500 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
      <div
        className={`text-gray-700 ${href ? "group-hover:text-blue-600" : ""}`}
      >
        {children}
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-blue-500 hover:text-blue-600 transition-colors"
    >
      {content}
    </a>
  ) : (
    content
  );
};

const EducationItem = ({ degree, institution, year }: EducationItemProps) => (
  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow">
    <InfoItem icon={BookOpen}>
      <div>
        <p className="font-medium">{degree}</p>
        <p className="text-sm text-gray-500">
          {institution} • {year}
        </p>
      </div>
    </InfoItem>
  </div>
);

const ExperienceItem = ({
  position,
  company,
  duration,
  description,
}: ExperienceItemProps) => (
  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow">
    <InfoItem icon={Layers}>
      <div>
        <p className="font-medium">{position}</p>
        <p className="text-sm text-gray-500">
          {company} • {duration}
        </p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </InfoItem>
  </div>
);

const InterviewItem = ({
  scheduledAt,
  time,
  location,
  notes,
}: InterviewItemProps) => (
  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <InfoItem icon={Calendar}>
          {new Date(scheduledAt).toLocaleDateString()} at {time}
        </InfoItem>
      </div>
      <InfoItem icon={MapPin}>{location}</InfoItem>
      {notes && <InfoItem icon={FileText}>{notes}</InfoItem>}
    </div>
  </div>
);

const getStatusStyles = (status: string | undefined) => {
  switch (status) {
    case ApplicationStatusValues.REJECTED:
      return {
        card: "border-red-100 hover:border-red-200",
        badge: "bg-red-50 text-red-600 border-red-200",
        icon: "bg-red-50 text-red-600",
        gradient: "from-red-50 to-red-100",
      };
    case ApplicationStatusValues.ACCEPTED:
      return {
        card: "border-green-100 hover:border-green-200",
        badge: "bg-green-50 text-green-600 border-green-200",
        icon: "bg-green-50 text-green-600",
        gradient: "from-green-50 to-green-100",
      };
    case ApplicationStatusValues.REVIEWING:
      return {
        card: "border-yellow-100 hover:border-yellow-200",
        badge: "bg-yellow-50 text-yellow-600 border-yellow-200",
        icon: "bg-yellow-50 text-yellow-600",
        gradient: "from-yellow-50 to-yellow-100",
      };
    case ApplicationStatusValues.PENDING:
      return {
        card: "border-blue-100 hover:border-blue-200",
        badge: "bg-blue-50 text-blue-600 border-blue-200",
        icon: "bg-blue-50 text-blue-600",
        gradient: "from-blue-50 to-blue-100",
      };
    default:
      return {
        card: "border-gray-100 hover:border-gray-200",
        badge: "bg-gray-50 text-gray-600 border-gray-200",
        icon: "bg-gray-50 text-gray-600",
        gradient: "from-gray-50 to-gray-100",
      };
  }
};

const ApplicationDetails = () => {
  const { applicationId } = useParams({
    from: "/candidate/application/$applicationId",
  });
  const router = useRouter();
  const { data, isLoading, isError } = useGetApplicationById(applicationId);

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-red-600 text-lg">Application Not Found</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const { application: { job, candidate, interviews, status } = {} } =
    (data as ApplicationResponse) || {};

  const statusStyles = getStatusStyles(status);

  return (
    <div className="">
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="mb-6 flex items-center bg-blue-500 text-white gap-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>
        <Badge
          variant="secondary"
          className={`mb-6 flex items-center gap-2 ${statusStyles.badge}`}
        >
          {status}
        </Badge>
      </div>

      {/* Application Header */}
      <div
        className={`bg-gradient-to-br ${statusStyles.gradient} p-6 rounded-lg mb-8`}
      >
        <div className="flex items-center gap-4">
          <ProfileImage
            src={candidate?.profile}
            alt={candidate?.fullName || ""}
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {candidate?.fullName}
            </h2>
            <p className="text-sm text-gray-500">{job?.title}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Candidate Details */}
        <div className="lg:col-span-2 space-y-8">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${statusStyles.card}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Candidate Profile
            </h3>
            <div className="space-y-4">
              <InfoItem icon={User}>{candidate?.fullName}</InfoItem>
              <InfoItem icon={Phone}>{candidate?.phone}</InfoItem>
              {candidate?.websiteLink && (
                <InfoItem icon={Globe} href={candidate.websiteLink}>
                  {candidate.websiteLink}
                </InfoItem>
              )}
              <InfoItem icon={MapPin}>{candidate?.location}</InfoItem>
              {candidate?.resumeUrl && (
                <InfoItem icon={FileText} href={candidate.resumeUrl}>
                  View Resume
                </InfoItem>
              )}
            </div>
          </div>

          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${statusStyles.card}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {candidate?.education?.map((edu, index) => (
                <EducationItem key={index} {...edu} />
              ))}
            </div>
          </div>

          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${statusStyles.card}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Experience
            </h3>
            <div className="space-y-4">
              {candidate?.experience?.map((exp, index) => (
                <ExperienceItem key={index} {...exp} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Job and Interview Details */}
        <div className="space-y-8">
          {/* Job Details Section */}
          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${statusStyles.card}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Job Details
            </h3>
            <div className="space-y-4">
              <InfoItem icon={Briefcase}>{job?.title}</InfoItem>
              <InfoItem icon={MapPin}>{job?.location}</InfoItem>
              <InfoItem icon={Clock}>
                NPR {job?.salaryMin?.toLocaleString()} -{" "}
                {job?.salaryMax?.toLocaleString()}
              </InfoItem>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-sm">
                  {job?.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Interview Details Section */}
          {interviews && interviews.length > 0 && (
            <div
              className={`bg-white p-6 rounded-lg shadow-lg ${statusStyles.card}`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Interview Details
              </h3>
              <div className="space-y-4">
                {interviews.map((interview, index) => (
                  <InterviewItem key={index} {...interview} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
