import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileUser,
  MapPin,
  Phone,
  Calendar,
  GraduationCap,
  Briefcase,
  Code,
  Download,
  Globe,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Application } from "@/types/job";

interface applicationDetailsModalProps {
  application: Application;
  onClose: () => void;
}

const ApplicationDetailsModal = ({
  application,
  onClose,
}: applicationDetailsModalProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[70vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Application Details</h2>
          <Button variant="ghost" size="sm" onClick={() => onClose()}>
            ×
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FileUser className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-semibold">
                    {application.fullName}
                  </h1>
                  {application.experience?.[0]?.position && (
                    <p className="text-gray-600">
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

              <div className="mt-4 grid grid-cols-2 gap-4">
                {application.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {application.location}
                  </div>
                )}
                {application.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {application.phone}
                  </div>
                )}
                {application.websiteLink && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <a
                      href={application.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Portfolio Website
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Applied on {formatDate(application.createdAt)}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Skills Section */}
          {application.skills && application.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          )}

          {/* Experience Section */}
          {application.experience && application.experience.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-4">
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-gray-600">
                      {exp.company} • {exp.duration}
                    </p>
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education Section */}
          {application.education && application.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-4">
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-gray-600">
                      {edu.institution} • {edu.year}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Resume Section */}
          {application.resumeUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end gap-3">
            <Button variant="outline" className="w-32">
              Reject
            </Button>
            <Button className="w-32">Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
