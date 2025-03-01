import JobDetails from "./jobDetails";
import JobApplicationForm from "@/components/candidate/jobApplicationForm";
import { useParams } from "@tanstack/react-router";
import { useGetJobByIdPublic } from "@/hooks/jobs";
import Loading from "@/components/isLoading";

function ApplyJob() {
  const { applyId } = useParams({
    from: "/candidate/apply/$applyId",
  });

  const { data, isLoading } = useGetJobByIdPublic(applyId);

  if (isLoading) return <Loading />;

  const { job } = data?.data || {};

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <img
              src={job.image}
              alt={job.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center gap-2 text-blue-600 mt-1">
                <span className="font-medium">{job.employer.companyName}</span>{" "}
                • {job.location} • {job.type}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <JobDetails job={job} />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="medium-text font-semibold text-gray-900 mb-6">
                Complete Your Application
              </h2>
              <JobApplicationForm jobId={applyId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
