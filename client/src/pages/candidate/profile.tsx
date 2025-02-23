import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Globe, FileText } from "lucide-react";
import useAuthStore from "@/stores/authStore";

function Profile() {
  const { authenticatedUser } = useAuthStore();

  if (!authenticatedUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 space-y-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage
              src={authenticatedUser.profile}
              alt={authenticatedUser.fullName}
            />
            <AvatarFallback className="text-2xl">
              {authenticatedUser.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{authenticatedUser.fullName}</h1>
            <p className="text-blue-100 mt-2 text-lg italic">
              &quot;{authenticatedUser.bio}&quot;
            </p>

            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-blue-500/30 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4" />
                <span>{authenticatedUser.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/30 rounded-full px-4 py-2">
                <Phone className="w-4 h-4" />
                <span>{authenticatedUser.phone}</span>
              </div>
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
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {authenticatedUser.skills.map((skill, index) => (
              <Badge
                key={index}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="flex flex-col h-full justify-between">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Resume</h2>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">View Full Resume</span>
              </div>
              <a
                href={authenticatedUser.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {authenticatedUser.experience.map((exp, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600"></div>
                <div className="border-l-2 border-blue-200 pl-6 pb-6">
                  <h3 className="font-bold text-lg text-gray-800">
                    {exp.title}
                  </h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-gray-600 text-sm mt-1">{exp.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Education</h2>
          <div className="space-y-6">
            {authenticatedUser.education.map((edu, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600"></div>
                <div className="border-l-2 border-blue-200 pl-6 pb-6">
                  <h3 className="font-bold text-lg text-gray-800">
                    {edu.degree}
                  </h3>
                  <p className="text-blue-600 font-medium">{edu.institution}</p>
                  <p className="text-gray-600 text-sm mt-1">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
