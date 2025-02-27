import {
  MapPin,
  Link as LinkIcon,
  Phone,
  Briefcase,
  GraduationCap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidateProfile } from "@/types/candidate";

interface CandidateDetailsModelProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile;
}

function CandidateDetailsModal({
  isOpen,
  onClose,
  candidate,
}: CandidateDetailsModelProps) {
  if (!candidate) return null;

  function getInitials(fullName: string): string {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto mx-auto sm:mx-4 p-4 sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
            Candidate Profile
          </DialogTitle>
        </DialogHeader>
        <Separator />

        <div className="space-y-4 sm:space-y-6 pb-2">
          {/* Basic Info */}
          <div className="rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {candidate.profile ? (
                <img
                  src={candidate.profile}
                  alt="Candidate profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 mx-auto sm:mx-0"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl border-2 border-blue-300 mx-auto sm:mx-0">
                  {getInitials(candidate.fullName)}
                </div>
              )}

              {/* Candidate Name & Location */}
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl capitalize font-semibold text-gray-800">
                  {candidate.fullName}
                </h3>
                {candidate.location && (
                  <div className="flex items-center justify-center sm:justify-start text-blue-600/80 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500/80" />
                    {candidate.location}
                  </div>
                )}
              </div>
            </div>
            {candidate.bio && (
              <div className="bg-white">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {candidate.bio}
                </p>
              </div>
            )}
          </div>

          {/* Skills */}
          {candidate.skills &&
            Array.isArray(candidate.skills) &&
            candidate.skills.length > 0 && (
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-gray-800 font-semibold mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Experience */}
          {candidate.experience && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
              <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                Experience
              </h4>
              <div className="space-y-4">
                {Array.isArray(candidate.experience) &&
                  candidate.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 pl-3 sm:pl-4 hover:border-gray-400 transition-colors"
                    >
                      <div className="font-medium text-gray-800"></div>
                      <div className="text-gray-600 text-sm sm:text-base">
                        {exp.company}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {exp.startDate}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Education */}
          {candidate.education && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
              <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                Education
              </h4>
              <div className="space-y-4">
                {Array.isArray(candidate.education) &&
                  candidate.education.map((edu, index) => (
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
              </div>
            </div>
          )}

          {/* Contact Links */}
          <div className="flex flex-wrap gap-2 sm:gap-4 pt-4 border-t border-gray-100">
            {candidate.phone && (
              <Button
                variant="outline"
                className="text-gray-800 border-blue-200 hover:bg-gray-50 text-xs sm:text-sm w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                {candidate.phone}
              </Button>
            )}
            {candidate.websiteLink && (
              <Button
                variant="outline"
                className="text-gray-800 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm w-full sm:w-auto"
              >
                <LinkIcon className="w-4 h-4 mr-2 text-blue-600" />
                Portfolio
              </Button>
            )}
            {candidate.resumeUrl && (
              <Button variant={"outline"}>
                <a
                  href={candidate.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-800 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm w-full sm:w-auto"
                >
                  <LinkIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Resume
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateDetailsModal;
