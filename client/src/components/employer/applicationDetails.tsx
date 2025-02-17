import { useGetApplicationById } from "@/hooks/application";
import { useParams } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  GraduationCap,
  LinkIcon,
  FileText,
  Phone,
  FileUser,
  Calendar,
  Building,
  ExternalLink,
} from "lucide-react";
import Loading from "../isLoading";
import InterviewScheduler from "./interviewScheduler";
import { Briefcase, Edit } from "iconsax-react";
import { useState } from "react";
import StatusToggle from "./statusToggle";

function ApplicationDetails() {
  const { applicationId } = useParams({
    from: "/employer/application-management/$applicationId",
  });
  const { data, isLoading } = useGetApplicationById(applicationId);
  const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false);

  if (isLoading) {
    return <Loading />;
  }

  const { application } = data;

  const getStatusStyles = () => {
    switch (application.status) {
      case "REJECTED":
        return {
          badge: "bg-red-50 text-red-600 border-red-200",
          icon: "bg-red-50 text-red-600",
        };
      case "ACCEPTED":
        return {
          badge: "bg-green-50 text-green-600 border-green-200",
          icon: "bg-green-50 text-green-600",
        };
      case "REVIEWING":
        return {
          badge: "bg-yellow-50 text-yellow-600 border-yellow-200",
          icon: "bg-yellow-50 text-yellow-600",
        };
      default:
        return {
          badge: "bg-blue-50 text-blue-600 border-blue-200",
          icon: "bg-blue-50 text-blue-600",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="mx-auto py-8 px-4 ">
      {/* Profile Card */}
      <Card className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Profile Picture Section */}
            <div className="flex-shrink-0">
              <div
                className={`w-28 h-28 lg:w-36 lg:h-32 rounded-sm overflow-hidden flex items-center justify-center ${styles.icon}`}
              >
                {application.profilePicture ? (
                  <img
                    src={application.profilePicture}
                    alt={application.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileUser className="w-10 h-10 lg:w-12 lg:h-12" />
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 w-full">
              {/* Header Row */}
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                {/* Name and Title */}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
                    {application.fullName}
                  </h1>
                  <p className="text-gray-500 text-lg mt-1">
                    {application.job?.title}
                  </p>
                </div>

                {!showStatusOptions ? (
                  <div className="flex">
                    <Badge
                      variant="secondary"
                      className={`${styles.badge} px-4 py-1.5 text-sm lg:text-base`}
                    >
                      {application.status}
                    </Badge>

                    <Edit
                      className={`${styles.badge} relative right-2 bottom-1`}
                      onClick={() => setShowStatusOptions(!showStatusOptions)}
                      size={14}
                    />
                  </div>
                ) : (
                  <StatusToggle
                    setShowStatusOptions={setShowStatusOptions}
                    showStatusOptions={showStatusOptions}
                    dataObj={{
                      applicationId,
                      candidateId: application.candidate.id,
                      jobId: application.job.id,
                    }}
                    currentStatus={application.status}
                  />
                )}
              </div>
              {/* Info Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.icon}`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm lg:text-base">
                    {application.location}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.icon}`}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm lg:text-base">
                    {application.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.icon}`}
                  >
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-sm lg:text-base">
                    Applied{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Section */}
          {application.skills && application.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800 font-semibold">
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {application.skills.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-100 small-text text-blue-700 hover:bg-blue-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Experience Section */}
          {application.experience && (
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800 font-semibold flex items-center">
                  <Briefcase size={24} className=" mr-2 text-blue-600" />
                  <h1 className="regular-text">Experience</h1>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800 font-semibold flex items-center">
                <GraduationCap size={24} className=" mr-2 text-blue-600" />
                <h1 className="regular-text">Education</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.education.map((edu, index) => (
                <div
                  key={index}
                  className="border-l-2 border-gray-200 pl-3 sm:pl-4 hover:border-gray-400 transition-colors"
                >
                  <div className="font-medium text-gray-800 text-sm sm:text-base">
                    {edu.degree}
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">
                    {edu.institution}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {edu.year}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800 font-semibold">
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">
                  {application.job.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {application.job.type} • {application.job.location}
                </p>
                <p className="text-gray-600 mt-2">
                  ${application.job.salaryMin} - ${application.job.salaryMax}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Links Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800 font-semibold">
                Documents & Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {application.resumeUrl && (
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </a>
              )}
              {application.websiteLink && (
                <a
                  href={application.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Portfolio</span>
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </a>
              )}
            </CardContent>
          </Card>

          {/* Interview Scheduler */}

          <InterviewScheduler
            applicationId={applicationId}
            applicationStatus={application.status}
          />
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
