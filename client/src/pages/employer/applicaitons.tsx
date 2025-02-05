import { useGetAllJobs } from "@/hooks/jobs";
import { getTimeAgo } from "@/utils/getTimeAgo";
import {
  MapPin,
  BriefcaseIcon,
  DollarSign,
  Users,
  ArrowRight,
  HomeIcon,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loading from "@/components/isLoading";
import { useState } from "react";
import useRouter from "@/lib/router";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    image: string;
    location: string;
    type: string;
    salaryMin: number;
    salaryMax: number;
    jobDescription: string;
    applications: [];
    createdAt: string;
  };
}

function Applications() {
  const [showCount, setShowCount] = useState<number | string>(10);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllJobs();

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching jobs.</div>;

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
              .map((job: any) => <JobCard key={job.id} job={job} />)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const JobCard = ({ job }: JobCardProps) => {
  const router = useRouter();
  return (
    <Card className="group transition-all duration-300  border border-gray-50">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={job.image}
            alt={job.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4">
            <Badge
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm shadow-sm"
            >
              {getTimeAgo(job.createdAt)}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-1  transition-colors">
            {job.title}
          </h3>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{job.location}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <BriefcaseIcon className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm capitalize">
                {job.type.replace("-", " ")}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">
                ${job.salaryMin.toLocaleString()} - $
                {job.salaryMax.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{job.applications.length} </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {job.jobDescription}
          </p>

          <div className="flex justify-end">
            <Button
              variant="outline"
              className="group/button hover:bg-blue-600 hover:text-white transition-all duration-300"
              onClick={() => {
                router.push(job.id);
              }}
            >
              View Applications
              <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Applications;
