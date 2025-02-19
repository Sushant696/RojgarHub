import { MapPin, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { useGetAllJobs } from "@/hooks/jobs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "./isLoading";
import clsx from "clsx";
import Filter from "./filter";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  jobDescription: string;
  image: string;
}

function JobLists() {
  const { data, isLoading, isError } = useGetAllJobs();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No jobs found at the moment</p>
      </div>
    );

  const filteredJobs = data?.jobs.filter((job: Job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      jobType === "all" ||
      !jobType ||
      job.type.toLowerCase() === jobType.toLowerCase();

    const matchesSalary = () => {
      if (salaryRange === "all" || !salaryRange) return true;

      const [min, max] = salaryRange.split("-").map(Number);
      return (
        (job.salaryMin >= min && job.salaryMin <= max) ||
        (job.salaryMax >= min && job.salaryMax <= max)
      );
    };

    return matchesSearch && matchesType && matchesSalary();
  });

  if (sortBy) {
    filteredJobs.sort((a: Job, b: Job) => {
      if (sortBy === "newest") return a;
      if (sortBy === "low_to_high") return a.salaryMin - b.salaryMin;
      if (sortBy === "high_to_low") return b.salaryMax - a.salaryMax;
      return 0;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <Filter
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          jobType={jobType}
          setJobType={setJobType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Job Cards */}
        <div
          className={clsx(
            "gap-4",
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2"
              : "space-y-4",
          )}
        >
          {filteredJobs.map((job: Job) => (
            <Card
              key={job.id}
              className="hover:shadow-md transition-all duration-300 border-0 shadow-sm"
            >
              <CardContent
                className={clsx(
                  "p-6",
                  viewMode === "grid" ? "flex flex-col gap-4" : "",
                )}
              >
                <div
                  className={clsx(
                    "flex items-start gap-6",
                    viewMode === "grid" ? "flex-col" : "",
                  )}
                >
                  <div
                    className={clsx(
                      "rounded-lg overflow-hidden bg-slate-100 flex-shrink-0",
                      viewMode === "grid" ? "w-full h-48" : "w-16 h-16",
                    )}
                  >
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          {job.title}
                        </h2>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-medium text-slate-700">
                              {`${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <p className="text-slate-600 line-clamp-2 max-w-2xl">
                        {job.jobDescription}
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 ml-4 whitespace-nowrap">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default JobLists;
