import { useState } from "react";
import {
  FileUser,
  Grid,
  AlignJustify,
  MapPin,
  Link as LinkIcon,
  Calendar,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Application,
  ApplicationStatus,
  ApplicationStatusValues,
} from "@/types/job";

import ApplicationDetailsModal from "./applicationDetailsModal";
import { useUpdateApplicationStatus } from "@/hooks/application";

export const ApplicationCard = ({
  application,
}: {
  application: Application;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const { mutate } = useUpdateApplicationStatus();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  function handleBeingReviewedStatus(
    applicationId: string,
    candidateId: string,
    status: ApplicationStatus,
    jobId: string,
  ) {
    mutate({ applicationId, candidateId, status, jobId });
  }

  const getStatusStyles = () => {
    switch (application.status) {
      case ApplicationStatusValues.REJECTED:
        return {
          card: "border-red-100 hover:border-red-200",
          badge: "bg-red-50 text-red-600 border-red-200",
          icon: "bg-red-50 text-red-600",
        };
      case ApplicationStatusValues.ACCEPTED:
        return {
          card: "border-green-100 hover:border-green-200",
          badge: "bg-green-50 text-green-600 border-green-200",
          icon: "bg-green-50 text-green-600",
        };
      case ApplicationStatusValues.REVIEWING:
        return {
          card: "border-yellow-100 hover:border-yellow-200",
          badge: "bg-yellow-50 text-yellow-600 border-yellow-200",
          icon: "bg-yellow-50 text-yellow-600",
        };
      case ApplicationStatusValues.PENDING:
        return {
          card: "border-blue-100 hover:border-blue-200",
          badge: "bg-blue-50 text-blue-600 border-blue-200",
          icon: "bg-blue-50 text-blue-600",
        };
      default:
        return {
          card: "border-gray-100 hover:border-gray-200",
          badge: "bg-gray-50 text-gray-600 border-gray-200",
          icon: "bg-gray-50 text-gray-600",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-200 ${styles.card}`}
    >
      {isModalOpen && selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedApplication(null);
          }}
        />
      )}
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${styles.icon} hidden sm:flex`}
          >
            <FileUser className="w-6 h-6" />
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.icon} sm:hidden`}
                  >
                    <FileUser className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {application.fullName}
                  </h3>
                </div>
                {application.experience && application.experience[0] && (
                  <p className="text-sm text-gray-500 mt-1">
                    {application.experience[0].position}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {application.status === "PENDING" && (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-50 p-1 text-yellow-600 hover:bg-yellow-100 cursor-pointer transition-colors text-sm"
                    onClick={() =>
                      handleBeingReviewedStatus(
                        application.id,
                        application.candidateId,
                        ApplicationStatusValues.REVIEWING,
                        application.jobId,
                      )
                    }
                  >
                    Mark as Being Reviewed
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className={`${styles.badge} text-sm`}
                >
                  {application.status}
                </Badge>
              </div>
            </div>

            {application.skills && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {application.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-600 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 space-y-2">
              {application.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="break-words">{application.location}</span>
                </div>
              )}
              {application.education && application.education[0] && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4 flex-shrink-0" />
                  <span className="break-words">{`${application.education[0].degree} - ${application.education[0].institution}`}</span>
                </div>
              )}
              {application.websiteLink && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LinkIcon className="w-4 h-4 flex-shrink-0" />
                  <a
                    href={application.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-words"
                  >
                    Portfolio
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="break-words">
                  Applied {formatDate(application.createdAt)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50 flex-1 sm:flex-none"
                  onClick={() =>
                    handleBeingReviewedStatus(
                      application.id,
                      application.candidateId,
                      ApplicationStatusValues.ACCEPTED,
                      application.jobId,
                    )
                  }
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleBeingReviewedStatus(
                      application.id,
                      application.candidateId,
                      ApplicationStatusValues.REJECTED,
                      application.jobId,
                    )
                  }
                  className="text-red-600 border-red-200 hover:bg-red-50 flex-1 sm:flex-none"
                >
                  Reject
                </Button>
              </div>
              <Button
                variant="link"
                className="text-blue-600 w-full sm:w-auto"
                onClick={() => {
                  setSelectedApplication(application);
                  setIsModalOpen(true);
                }}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ApplicationsOverview = ({
  applications,
}: {
  applications: Application[];
}) => {
  const [Filter, setFilter] = useState<string>("all");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [view, setView] = useState<boolean>(false);
  const filteredApplications = applications.filter((application) =>
    Filter === "all" ? application : application.status === Filter,
  );

  function handleShowChange(value: string) {
    setFilter(value);
    setIsSelectOpen(false);
  }

  const formatStatus = (status: string) => {
    if (status === "all") return "All";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="lg:col-span-full space-y-6 ">
      <Card>
        <CardHeader className="flex sm:flex-row items-center justify-between border-b border-gray-200 px-6 py-4">
          <CardTitle className="flex items-center gap-2">
            <FileUser size={20} className="text-gray-700" />
            <span>Applications Overview ({applications.length})</span>
          </CardTitle>

          <div className="flex items-center gap-4">
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <span className="text-gray-600">Show:</span>
                <span className="font-medium">{formatStatus(Filter)}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSelectOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSelectOpen && (
                <div className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  {[
                    "all",
                    ApplicationStatusValues.PENDING,
                    ApplicationStatusValues.REVIEWING,
                    ApplicationStatusValues.ACCEPTED,
                    ApplicationStatusValues.REJECTED,
                  ].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleShowChange(value)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      {formatStatus(value)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* View Toggle Buttons */}
            <div className="hidden md:flex items-center gap-2 border-l border-gray-200 pl-4 ">
              <button
                className={`p-2 hover:bg-blue-500 rounded-lg transition-colors ${
                  view ? "bg-blue-400 text-white" : "text-gray-600"
                }`}
                onClick={() => {
                  setView(true);
                }}
              >
                <AlignJustify
                  size={20}
                  className={view ? "text-white" : "text-gray-600"}
                />
              </button>
              <button
                className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-colors ${
                  !view ? "bg-blue-400 text-white" : "text-gray-600"
                }`}
                onClick={() => {
                  setView(false);
                }}
              >
                <Grid
                  size={20}
                  className={!view ? "text-white" : "text-gray-600"}
                />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div
            className={`transition-all duration-300 ${
              view
                ? "flex flex-col space-y-4"
                : "grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4"
            }`}
          >
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application: Application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
                <div className="w-64 h-64 mb-6">
                  <img
                    src="/notfoundsearch.png"
                    alt="No results found"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No{" "}
                  {formatStatus(Filter) === "All" ? "" : formatStatus(Filter)}{" "}
                  Applications Found
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  {Filter === "all"
                    ? "There are no applications in the system yet."
                    : `There are no applications with the "${formatStatus(Filter)}" status at the moment.`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ApplicationsOverview;
