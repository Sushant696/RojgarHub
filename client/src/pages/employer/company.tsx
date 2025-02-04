import Loading from "@/components/isLoading";
import { useGetAllJobs } from "@/hooks/jobs";

function Company() {
  const { data, isLoading, isError } = useGetAllJobs();
  console.log(data);
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error fetching jobs.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.jobs?.map((job: any) => (
          <div key={job.id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={job.image}
              alt={job.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-sm text-gray-500">{job.type}</p>
            <p className="text-lg font-bold mt-2">
              ${job.salaryMin} - ${job.salaryMax}
            </p>
            <p className="mt-2 text-gray-700">{job.jobDescription}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Company;
