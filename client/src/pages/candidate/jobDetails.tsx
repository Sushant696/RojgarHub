import { Clock, MapPin, DollarSign, Users } from "lucide-react";

const JobDetails = ({ job }: any) => {
  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-4">
          Job Overview
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-blue-50 p-2 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </span>
            <div>
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-medium capitalize">{job.type}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-blue-50 p-2 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </span>
            <div>
              <p className="text-sm text-gray-500">Salary Range</p>
              <p className="font-medium">
                ${job.salaryMin.toLocaleString()} - $
                {job.salaryMax.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-blue-50 p-2 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600" />
            </span>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{job.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-blue-50 p-2 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </span>
            <div>
              <p className="text-sm text-gray-500">Company Size</p>
              <p className="font-medium">
                {job.employer.companySize}+ Employees
              </p>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="regular-text font-semibold text-slate-900">
              About {job.employer.companyName}
            </h3>
            <p className="small-text text-gray-600 line-clamp-4">
              {job.employer.industry} - A leading company in the industry
              focused on innovation and growth.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold regular-text text-slate-900">
              Required Skills
            </h3>
            {job.skills && job?.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {job?.skills?.map((currSkill: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg"
                  >
                    <span className="text-sm">{currSkill}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold regular-text text-slate-900">
              Job Description
            </h3>
            <p className="text-slate-600 small-text whitespace-pre-wrap">
              {job.jobDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
