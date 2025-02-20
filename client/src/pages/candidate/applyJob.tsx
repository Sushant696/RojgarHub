import JobDetails from "./jobDetails";
import JobApplicationForm from "@/components/candidate/jobApplicationForm";

function ApplyJob() {
  return (
    <div className="min-h-screen border border-black bg-gray-50">
      <div className=" mx-auto ">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="xl:max-h-screen xl:overflow-y-auto">
            <JobDetails />
          </div>

          <div className="xl:max-h-screen xl:overflow-y-auto">
            <JobApplicationForm candidateId="" jobId="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
