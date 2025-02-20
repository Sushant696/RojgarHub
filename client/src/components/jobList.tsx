import { useState } from "react";
import { MapPin, Clock, DollarSign, Building2, Users, Eye } from "lucide-react";
import DOMPurify from "dompurify";
import clsx from "clsx";

import { useGetAllJobs } from "@/hooks/jobs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Loading from "./isLoading";
import Filter from "./filter";
import useAuthStore from "@/stores/authStore";
import useRouter from "@/lib/router";
import JobApplicationForm from "./candidate/jobApplicationForm";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  jobDescription: string;
  image: string;
  employer?: {
    companyName: string;
    companySize: number;
    industry: string;
  };
  requirements?: string;
}

function JobLists() {
  const { data, isLoading, isError } = useGetAllJobs();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

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

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };

  const handleApplyJob = (job: Job) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  const sanitizedData = () => ({
    __html: selectedJob?.requirements
      ? DOMPurify.sanitize(selectedJob.requirements)
      : "",
  });
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="lg:container mx-0 sm:mx-auto px-1 md:px-4 py-0 sm:py-8">
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
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          onClick={() => handleViewDetails(job)}
                          className="whitespace-nowrap"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          onClick={() =>
                            router.push("/candidate/apply/" + job.id)
                          }
                          className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-xl text-blue-600">
              Job Details
            </SheetTitle>
          </SheetHeader>
          {selectedJob && (
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={selectedJob.image}
                    alt={selectedJob.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {selectedJob.title}
                  </h2>
                  <div className="flex items-center gap-2 text-blue-600 mt-1">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">
                      {selectedJob.employer?.companyName}
                    </span>
                  </div>
                </div>
              </div>

              <Card className="bg-white/50 backdrop-blur-sm border-blue-100">
                <CardContent className="grid grid-cols-2 gap-6 p-6">
                  <div className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="text-sm font-medium text-slate-700">
                        {selectedJob.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm text-slate-500">Job Type</p>
                      <p className="text-sm font-medium text-slate-700 capitalize">
                        {selectedJob.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm text-slate-500">Salary Range</p>
                      <p className="text-sm font-medium text-slate-700">
                        ${selectedJob.salaryMin.toLocaleString()} - $
                        {selectedJob.salaryMax.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm text-slate-500">Company Size</p>
                      <p className="text-sm font-medium text-slate-700">
                        {selectedJob.employer?.companySize}+ Employees
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">
                  Job Description
                </h3>
                <p className="text-slate-600 whitespace-pre-wrap">
                  {selectedJob.jobDescription}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Requirements</h3>
                <p className="text-slate-600 whitespace-pre-wrap">
                  <div dangerouslySetInnerHTML={sanitizedData()} />
                </p>
              </div>

              <Button
                onClick={() => {
                  setIsDetailsOpen(false);
                  router.push("/candidate/apply/" + selectedJob.id);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Apply for this Position
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Job Application Sheet */}
      <Sheet open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-xl text-blue-600">
              Apply for {selectedJob?.title}
            </SheetTitle>
          </SheetHeader>
          <JobApplicationForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default JobLists;
