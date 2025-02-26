import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Globe, FileText, Edit, Clock } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import useRouter from "@/lib/router";
import { Progress } from "@/components/ui/progress";

function Profile() {
  const { authenticatedUser } = useAuthStore();
  const router = useRouter();

  if (!authenticatedUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-6 space-y-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage
              src={authenticatedUser?.profile}
              alt={authenticatedUser?.fullName}
            />
            <AvatarFallback className="text-2xl">
              {authenticatedUser?.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">
              {authenticatedUser?.fullName || "Anonymous User"}
            </h1>
            {authenticatedUser?.bio && (
              <p className="text-blue-100 mt-2 text-lg italic">
                &quot;{authenticatedUser.bio}&quot;
              </p>
            )}

            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
              {authenticatedUser?.location && (
                <div className="flex items-center gap-2 bg-blue-500/30 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4" />
                  <span>{authenticatedUser.location}</span>
                </div>
              )}
              {authenticatedUser?.phone && (
                <div className="flex items-center gap-2 bg-blue-500/30 rounded-full px-4 py-2">
                  <Phone className="w-4 h-4" />
                  <span>{authenticatedUser.phone}</span>
                </div>
              )}
              {authenticatedUser?.websiteLink && (
                <div className="flex items-center gap-2 bg-blue-500/30 rounded-full px-4 py-2">
                  <Globe className="w-4 h-4" />
                  <a
                    href={authenticatedUser.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Portfolio Website
                  </a>
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={() => router.push("editCandidate")}
            className="bg-blue-700 hover:bg-blue-700/80"
          >
            <Edit className="mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills Section */}
        {authenticatedUser?.skills?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(authenticatedUser.skills || []).map(
                (skill: string, index: number) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm"
                  >
                    {skill}
                  </Badge>
                ),
              )}
            </div>
          </div>
        )}

        {/* Resume Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="flex flex-col h-full justify-between">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Resume</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">
                  {authenticatedUser?.resumeUrl
                    ? "View Full Resume"
                    : "No Resume Uploaded"}
                </span>
              </div>
              {authenticatedUser?.resumeUrl && (
                <a
                  href={authenticatedUser.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 w-fit text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Download CV
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Job Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Job Progress
          </h2>
          <div className="space-y-4 border bg-blue-500">
            {(authenticatedUser?.jobApplications || []).map(
              (job: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{job.title}</span>
                    <span className="text-sm text-blue-600">
                      {job.progress}%
                    </span>
                  </div>
                  <h1>hello</h1>
                  <Progress value={job.progress} className="h-2" />
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Applied {job.appliedDate}</span>
                  </div>
                </div>
              ),
            )}
            {authenticatedUser?.jobApplications?.length === 0 && (
              <p className="text-gray-500">No active applications</p>
            )}
          </div>
        </div>

        {/* Experience Section */}
        {authenticatedUser?.experience?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {(authenticatedUser.experience || []).map(
                (exp: any, index: number) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600"></div>
                    <div className="border-l-2 border-blue-200 pl-6 pb-6">
                      <h3 className="font-bold text-lg text-gray-800">
                        {exp.title}
                      </h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-gray-600 text-sm mt-1">
                        {exp.duration}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Education Section */}
        {authenticatedUser?.education?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Education</h2>
            <div className="space-y-6">
              {(authenticatedUser.education || []).map(
                (edu: any, index: number) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600"></div>
                    <div className="border-l-2 border-blue-200 pl-6 pb-6">
                      <h3 className="font-bold text-lg text-gray-800">
                        {edu.degree}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{edu.year}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
