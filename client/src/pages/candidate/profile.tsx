import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Globe,
  FileText,
  Edit,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import useRouter from "@/lib/router";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  const totalFields = 9;
  const completedFields = [
    authenticatedUser?.fullName ? 1 : 0,
    authenticatedUser?.phone ? 1 : 0,
    authenticatedUser?.skills?.length ? 1 : 0,
    authenticatedUser?.education?.length ? 1 : 0,
    authenticatedUser?.experience?.length ? 1 : 0,
    authenticatedUser?.bio ? 1 : 0,
    authenticatedUser?.location ? 1 : 0,
    authenticatedUser?.profile ? 1 : 0,
    authenticatedUser?.resumeUrl ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const completionPercentage = Math.round(
    (completedFields / totalFields) * 100,
  );

  const isProfileComplete = completionPercentage === 100;

  const profileSections = [
    {
      label: "Full Name",
      completed: !!authenticatedUser?.fullName,
      importance: "high",
      tip: "Your name is the first thing employers see",
    },
    {
      label: "Phone Number",
      completed: !!authenticatedUser?.phone,
      importance: "medium",
      tip: "Essential for recruiters to contact you",
    },
    {
      label: "Skills",
      completed: !!authenticatedUser?.skills?.length,
      importance: "high",
      tip: "Highlight your expertise to match job requirements",
    },
    {
      label: "Education",
      completed: !!authenticatedUser?.education?.length,
      importance: "high",
      tip: "Showcase your academic background",
    },
    {
      label: "Experience",
      completed: !!authenticatedUser?.experience?.length,
      importance: "high",
      tip: "Work history increases your visibility to employers",
    },
    {
      label: "Bio",
      completed: !!authenticatedUser?.bio,
      importance: "medium",
      tip: "A compelling bio helps you stand out",
    },
    {
      label: "Location",
      completed: !!authenticatedUser?.location,
      importance: "medium",
      tip: "Helps match you with local opportunities",
    },
    {
      label: "Profile Photo",
      completed: !!authenticatedUser?.profile,
      importance: "medium",
      tip: "Profiles with photos get 14× more views",
    },
    {
      label: "Resume",
      completed: !!authenticatedUser?.resumeUrl,
      importance: "high",
      tip: "Essential for job applications",
    },
  ];

  const missingHighImportance = profileSections
    .filter((item) => !item.completed && item.importance === "high")
    .map((item) => item.label);

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

      {!isProfileComplete && (
        <Alert
          className={cn(
            "border-l-4",
            completionPercentage < 50
              ? "border-l-orange-500 bg-orange-50"
              : completionPercentage < 80
                ? "border-l-blue-500 bg-blue-50"
                : "border-l-green-500 bg-green-50",
          )}
        >
          <AlertCircle
            className={cn(
              "h-5 w-5",
              completionPercentage < 50
                ? "text-orange-500"
                : completionPercentage < 80
                  ? "text-blue-500"
                  : "text-green-500",
            )}
          />
          <AlertTitle className="text-gray-800 font-bold">
            {completionPercentage < 50
              ? "Your profile needs attention"
              : completionPercentage < 80
                ? "You're making good progress"
                : "You're almost there!"}
          </AlertTitle>
          <AlertDescription className="text-gray-600">
            {completionPercentage < 50
              ? `Complete your profile to increase your chances of getting noticed by employers. Focus on adding ${missingHighImportance.join(", ")}.`
              : completionPercentage < 80
                ? "Keep going! Profiles with more details are 40% more likely to receive job offers."
                : "Just a few more details to perfect your profile. Completed profiles receive 3× more job matches!"}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-8">
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

        {!isProfileComplete && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Profile Completion
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-800">
                  Profile Complete
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold px-3 py-1 rounded-full",
                    completionPercentage < 50
                      ? "bg-orange-100 text-orange-700"
                      : completionPercentage < 80
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700",
                  )}
                >
                  {completionPercentage}%
                </span>
              </div>
              <Progress
                value={completionPercentage}
                className={cn(
                  "h-3 bg-gray-100 border rounded-full",
                  completionPercentage < 50
                    ? "text-orange-500"
                    : completionPercentage < 80
                      ? "text-blue-500"
                      : "text-green-500",
                )}
              />

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-6">
                {profileSections.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg transition-colors group",
                      item.completed
                        ? "bg-green-50 hover:bg-green-100"
                        : item.importance === "high"
                          ? "bg-orange-50 hover:bg-orange-100"
                          : "bg-blue-50 hover:bg-blue-100",
                    )}
                  >
                    <div className="mt-1">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 fill-current" />
                      ) : (
                        <Circle
                          className={cn(
                            "w-5 h-5 stroke-2",
                            item.importance === "high"
                              ? "text-orange-500"
                              : "text-blue-400",
                          )}
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span
                          className={cn(
                            "font-medium",
                            item.completed
                              ? "text-green-800"
                              : item.importance === "high"
                                ? "text-orange-800"
                                : "text-blue-800",
                          )}
                        >
                          {item.label}
                        </span>
                        {item.importance === "high" && !item.completed && (
                          <Badge className="ml-2 bg-orange-200 text-orange-800 hover:bg-orange-300">
                            Priority
                          </Badge>
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-xs mt-1 opacity-0 max-h-0 overflow-hidden transition-all duration-200 group-hover:opacity-100 group-hover:max-h-20 group-hover:mt-2",
                          item.completed
                            ? "text-green-700"
                            : item.importance === "high"
                              ? "text-orange-700"
                              : "text-blue-700",
                        )}
                      >
                        {item.tip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => router.push("editCandidate")}
                className={cn(
                  "mt-6",
                  completionPercentage < 50
                    ? "bg-orange-600 hover:bg-orange-700"
                    : completionPercentage < 80
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-green-600 hover:bg-green-700",
                )}
              >
                <Edit className="mr-2 h-4 w-4" />
                Complete Your Profile
              </Button>
            </div>
          </div>
        )}

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
                      <h3 className="font-bold text-lg text-gray-800 lowercase capitalize">
                        {exp.position}
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
