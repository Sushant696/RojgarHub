import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileUser,
  Grid,
  AlignJustify,
  MapPin,
  Link as LinkIcon,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/types/job";
import { useState } from "react";
import ApplicationDetailsModal from "./applicationDetails";

const ApplicationCard = ({ application }: { application: Application }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <FileUser className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {application.fullName}
                </h3>
                {application.experience && application.experience[0] && (
                  <p className="text-sm text-gray-500">
                    {application.experience[0].position}
                  </p>
                )}
              </div>
              <Badge
                variant="secondary"
                className={`
                  ${application.status === "PENDING"
                    ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                    : application.status === "ACCEPTED"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }
                `}
              >
                {application.status}
              </Badge>
            </div>

            {application.skills && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {application.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-600"
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
                  <MapPin className="w-4 h-4" />
                  {application.location}
                </div>
              )}
              {application.education && application.education[0] && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  {`${application.education[0].degree} - ${application.education[0].institution}`}
                </div>
              )}
              {application.websiteLink && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    href={application.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Portfolio
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Applied {formatDate(application.createdAt)}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Reject
                </Button>
              </div>
              <Button
                variant="link"
                className="text-blue-600"
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
  console.log(applications, "applications");
  return (
    <div className="lg:col-span-full space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 pb-4">
          <CardTitle className="flex items-center gap-2">
            <FileUser size={20} />
            Applications Overview ({applications.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <AlignJustify className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map((application: Application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsOverview;
