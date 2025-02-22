import { useState, useMemo } from "react";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  Clock,
  Grid,
  MapPin,
  Menu,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loading from "@/components/isLoading";
import { useGetCandidateApplications } from "@/hooks/candidate";
import { Application } from "@/types/job";
import useRouter from "@/lib/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CandidateApplications = () => {
  const { data, isLoading, isError } = useGetCandidateApplications();
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("status");

  // Filter applications by status
  const filteredApplications =
    filterStatus === "all"
      ? data?.applications
      : data?.applications.filter(
          (app: Application) => app.status === filterStatus,
        );

  // Sort applications
  const sortedApplications = useMemo(() => {
    const priorityOrder: any = {
      ACCEPTED: 0,
      REVIEWING: 1,
      PENDING: 2,
      REJECTED: 3,
    };

    return [...(filteredApplications || [])].sort((a, b) => {
      switch (sortBy) {
        case "status":
          // First sort by status priority
          const statusDiff = priorityOrder[a.status] - priorityOrder[b.status];
          if (statusDiff !== 0) return statusDiff;
          // Then by salary for same status
          return (b.job?.salaryMax || 0) - (a.job?.salaryMax || 0);

        case "salary-high":
          return (b.job?.salaryMax || 0) - (a.job?.salaryMax || 0);

        case "salary-low":
          return (a.job?.salaryMax || 0) - (b.job?.salaryMax || 0);

        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        default:
          return 0;
      }
    });
  }, [filteredApplications, sortBy]);

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-600">No Applications found</div>;

  return (
    <div className="mx-auto py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Applications</h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">By Status (Accepted First)</SelectItem>
              <SelectItem value="salary-high">Salary: High to Low</SelectItem>
              <SelectItem value="salary-low">Salary: Low to High</SelectItem>
              <SelectItem value="latest">Latest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Status: {filterStatus === "all" ? "All" : filterStatus}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </Button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {["all", "PENDING", "REVIEWING", "ACCEPTED", "REJECTED"].map(
                  (status) => (
                    <button
                      key={status}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        filterStatus === status
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setFilterStatus(status);
                        setIsFilterOpen(false);
                      }}
                    >
                      {status === "all" ? "All Applications" : status}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          {/* View Toggle Buttons */}
          <div className="hidden sm:flex border-l border-gray-200 pl-3">
            <Button
              variant={viewType === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewType("grid")}
              className="h-9 w-9"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewType("list")}
              className="h-9 w-9 ml-2"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {sortedApplications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No applications found for the selected status.
          </p>
        </div>
      ) : (
        <div
          className={
            viewType === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {sortedApplications.map((application: Application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

const ApplicationCard = ({ application }: { application: any }) => {
  const statusStyles: any = {
    PENDING: "bg-blue-50 text-blue-600",
    REVIEWING: "bg-yellow-50 text-yellow-600",
    ACCEPTED: "bg-green-50 text-green-600",
    REJECTED: "bg-red-50 text-red-600",
  };

  const router = useRouter();
  const hasInterview = application?.interviews?.length > 0;

  // Format salary range
  const formatSalary = (min: number, max: number) => {
    return `NPR ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  return (
    <Card className="group transition duration-200 hover:shadow-lg hover:border-blue-100">
      <CardContent className="p-6">
        {/* Company Image and Title Section */}
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={application.job?.image || "/api/placeholder/64/64"}
              alt="Company logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900 truncate text-lg">
                {application.job?.title}
              </h3>
              <Badge
                className={`${statusStyles[application.status]} text-xs font-medium`}
              >
                {application.status}
              </Badge>
            </div>

            {/* Job Details */}
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="h-4 w-4" />
                <span className="capitalize">{application.job?.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{application.job?.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  {formatSalary(
                    application.job?.salaryMin,
                    application.job?.salaryMax,
                  )}
                </span>
              </div>
            </div>

            {/* Skills Preview */}
            <div className="mt-3 flex flex-wrap gap-2">
              {application.skills
                ?.slice(0, 3)
                .map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              {application.skills?.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{application.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Interview Indicator */}
        {hasInterview && (
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
            <Calendar className="h-4 w-4" />
            <span>Interview Scheduled</span>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 block">
              Applied {new Date(application.createdAt).toLocaleDateString()}
            </span>
            <span className="text-sm text-gray-500 block">
              Last updated{" "}
              {new Date(application.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() =>
              router.push(`/candidate/application/${application.id}`)
            }
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 -mr-2 transition-colors"
          >
            View Details →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateApplications;
