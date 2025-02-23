const JobApplicationCard = ({ application }: any) => {
  const { job, fullName, status, createdAt } = application;

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={job.image}
          alt={job.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-sm text-gray-500">{job.type}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Salary:</strong> ${job.salaryMin} - ${job.salaryMax}
        </p>
        <p>
          <strong>Applied On:</strong>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {status}
          </span>
        </p>
      </div>
      <div className="flex space-x-3 mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View Job Details
        </button>
      </div>
    </div>
  );
};

export default JobApplicationCard;
