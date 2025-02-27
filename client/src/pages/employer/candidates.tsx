import { useState } from "react";
import { User, MapPin, ExternalLink, ChevronDown } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import Loading from "@/components/isLoading";
import { useGetEmployerCandidates } from "@/hooks/employer";
import { Button } from "@/components/ui/button";
import CandidateDetailsModal from "./home/candidateDetails";
import { CandidateProfile } from "@/types/candidate";
import { Separator } from "@/components/ui/separator";

function Candidates() {
  const { data, isLoading, isError } = useGetEmployerCandidates();
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateProfile | null>(null);
  const [showCount, setShowCount] = useState<number | string>(10);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleShowChange = (value: number | string) => {
    setShowCount(value);
    setIsSelectOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <h1 className="text-lg text-gray-600">Candidates not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-h-fit">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-6">
        <div className="flex items-center justify-between md:justify-start space-x-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl md:text-2xl font-semibold">Candidates</h1>
            <span className="bg-blue-100 text-blue-950 text-sm font-medium px-3 py-1 rounded-full">
              ({data.candidate?.length || 0})
            </span>
          </div>

          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="md:hidden bg-gray-50 p-2 rounded-lg border border-gray-200"
          >
            <Search className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div
          className={`w-full md:w-72 lg:w-96 relative ${showMobileSearch ? "block" : "hidden md:block"}`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search candidates..."
              value={query}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-800/70">Showing 41-60 of 944 Candidates</h1>
          <div className="relative">
            <button
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span>
                <span className="text-gray-800/70 p-1">Show:</span>
                {showCount === "all" ? "All" : showCount}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSelectOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSelectOpen && (
              <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {[10, 20, 30, "all"].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleShowChange(value)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                  >
                    {value === "all" ? "All" : `${value}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 mb-6">
          <Separator />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.candidate?.map((candidate: CandidateProfile) => (
            <div
              key={candidate.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col h-[280px]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold capitalize text-gray-800">
                      {candidate.fullName}
                    </h2>
                    <div className="flex items-center text-gray-600/80 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {candidate.location || "Location not specified"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section - Fixed Height */}
              <div className="h-16 mb-4">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {candidate.bio || "No bio available"}
                </p>
              </div>

              {/* Skills Section - Fixed Height */}
              <div className="h-20">
                {candidate.skills &&
                Array.isArray(candidate.skills) &&
                candidate.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.slice(0, 5).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 5 && (
                      <span className="text-blue-500 text-xs font-medium">
                        +{candidate.skills.length - 5} more
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center h-full">
                    <span className="text-gray-500 text-sm">
                      No skills listed
                    </span>
                  </div>
                )}
              </div>

              {/* Button Section - Fixed at Bottom */}
              <div className="mt-auto">
                <Button
                  onClick={() => setSelectedCandidate(candidate)}
                  className="w-full mt-3 bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                  variant="outline"
                >
                  View Profile
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {selectedCandidate && (
          <CandidateDetailsModal
            isOpen={true}
            onClose={() => setSelectedCandidate(null)}
            candidate={selectedCandidate}
          />
        )}

        {data.candidate?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-blue-50 rounded-lg">
            <User className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-blue-600">
              No candidates yet
            </h3>
            <p className="text-blue-500 text-sm">
              Candidates who apply will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Candidates;
