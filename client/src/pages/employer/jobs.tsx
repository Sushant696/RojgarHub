import { useState } from "react";
import { HomeIcon, ChevronDown } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import Loading from "@/components/isLoading";
import JobCard from "@/components/employer/jobCard";
import { useGetEmployerJobs } from "@/hooks/employer";

export default function Jobs() {
  const [showCount, setShowCount] = useState<number | string>(10);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data, isLoading, isError } = useGetEmployerJobs();

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <h1 className="text-lg text-gray-600">Candidates not found</h1>
      </div>
    );
  }

  const handleShowChange = (value: number | string) => {
    setShowCount(value);
    setIsSelectOpen(false);
  };

  return (
    <div className="mx-auto px-4 py-8 max-h-fit">
      <div className="flex items-center justify-between mb-6">
        <h1 className="emphasized-text font-semibold text-gray-900">
          Jobs Posted
        </h1>
        <div className="border  border-gray-200 bg-white  rounded-md">
          <nav className="list-none flex gap-2 p-2 rounded-md text-gray-800/70">
            <li className="flex items-center gap-1">
              <HomeIcon size={18} />
              Admin
            </li>
            {">"}
            <li>Applications</li>
          </nav>
        </div>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-gray-800/70 ">Showing 41-60 of 944 jobs</h1>
            <div className="relative ">
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
          <hr />
        </CardContent>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.jobs
              ?.slice(
                0,
                showCount === "all" ? data?.jobs.length : Number(showCount),
              )
              .map(
                (job: any) =>
                  job.status === "OPEN" && <JobCard key={job.id} job={job} />,
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
