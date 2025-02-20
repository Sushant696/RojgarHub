import {
  Building2,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Briefcase,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetJobByIdPublic } from "@/hooks/jobs";
import { useParams } from "@tanstack/react-router";
import Loading from "@/components/isLoading";

const JobDetails = () => {
  const { applyId } = useParams({
    from: "/candidate/apply/$applyId",
  });
  const { data, isLoading } = useGetJobByIdPublic(applyId);

  if (isLoading) return <Loading />;

  const { job } = data.data;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" lg:container mx-0 sm:mx-auto px-1 md:px-4 py-0 sm:py-8 space-y-6">
        {/* Header Section */}
        <div className="flex items-start gap-6 bg-white p-6 rounded-lg shadow-sm">
          <img
            src={job.image}
            alt={job.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <div className="flex items-center gap-2 text-blue-600">
              <Building2 size={20} />
              <span className="font-medium">{job.employer.companyName}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span className="capitalize">{job.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={16} />
                <span>
                  ${job.salaryMin.toLocaleString()} - $
                  {job.salaryMax.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details Card */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">
              About the Company
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Users className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium">
                    {job.employer.companySize}+ Employees
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{job.employer.industry}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-wrap">
              {job.jobDescription}
            </p>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-wrap">
              {job.requirements}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;
