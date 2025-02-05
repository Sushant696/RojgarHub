import { useLoaderData } from "@tanstack/react-router";
import {
  CalendarDays,
  MapPin,
  BriefcaseIcon,
  DollarSign,
  Clock,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTimeAgo } from "@/utils/getTimeAgo";

function ApplicationDetails() {
  const { job } = useLoaderData({
    from: "/employer/applications/$applicationId",
  });
  console.log(job);

  return (
    <div className="mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{job.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="secondary" className="text-sm">
              {job.status}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Posted {getTimeAgo(job.createdAt)}
            </span>
          </div>
        </div>
        <img
          src={job.image}
          alt={job.title}
          className="w-32 h-32 rounded-lg object-cover border border-gray-200 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-wrap">
                {job.jobDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-wrap">
                {job.requirements}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Side Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BriefcaseIcon className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Job Type
                    </p>
                    <p className="text-gray-900 capitalize">
                      {job.type.replace("-", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Location
                    </p>
                    <p className="text-gray-900">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Salary Range
                    </p>
                    <p className="text-gray-900">
                      ${job.salaryMin.toLocaleString()} - $
                      {job.salaryMax.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CalendarDays className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Posted Date
                    </p>
                    <p className="text-gray-900">
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Employer Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Employer ID: {job.employerId}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
