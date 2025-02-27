import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@mui/material";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, DollarSign } from "lucide-react";
import clsx from "clsx";
import useRouter from "@/lib/router";
import { Money } from "iconsax-react";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  jobDescription: string;
  image: string;
  requirements: string;
  skills: string[];
  status: string;
  employerId: string;
  employer: {
    companyName: string;
  };
}

interface SearchResultsProps {
  jobs: Job[];
}

const SearchResults = ({ jobs }: SearchResultsProps) => {
  const router = useRouter();
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 mt-6">
        <p className="text-gray-500 text-lg">
          No jobs found matching your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Search Results</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "contained" : "outlined"}
            onClick={() => setViewMode("grid")}
            className="text-sm"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "contained" : "outlined"}
            onClick={() => setViewMode("list")}
            className="text-sm"
          >
            List
          </Button>
        </div>
      </div>

      <div
        className={clsx(
          "gap-4",
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "space-y-4",
        )}
      >
        {jobs.map((job: Job) => (
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

                <div className="flex-1 w-full ">
                  <div className="flex justify-between  items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {job.title}
                      </h2>
                      <p className="text-sm text-blue-600">
                        {job.employer.companyName}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={22} className="bg-blue-500 rounded-md text-white p-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={22} className="bg-blue-500 rounded-md text-white p-1" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Money size={22} className="bg-green-500/80 rounded-md text-white p-1" />
                          <span className="font-medium text-slate-700">
                            {`${job?.salaryMin?.toLocaleString()} - ${job?.salaryMax?.toLocaleString()}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex flex-col gap-5 3xl:flex-row sm:items-start sm:justify-between">
                    <p className="text-slate-600 line-clamp-2 max-w-2xl">
                      {job.jobDescription}
                    </p>

                    {/* Buttons section */}
                    <div className="w-full sm:w-auto flex gap-2 self-end sm:self-auto sm:ml-auto">
                      <Button
                        variant="contained"
                        onClick={() =>
                          router.push(`/candidate/apply/${job.id}`)
                        }
                        className="whitespace-nowrap sm:w-auto"
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
  );
};

export default SearchResults;
