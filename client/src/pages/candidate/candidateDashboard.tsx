import Loading from "@/components/isLoading";
import { useGetDashboardData } from "@/hooks/candidate";
import useAuthStore from "@/stores/authStore";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

function CandidateDashboard() {
  const { authenticatedUser } = useAuthStore();
  const { data, isLoading, isError } = useGetDashboardData(
    authenticatedUser.id,
  );

  const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042"];
  const STATUS_COLORS: any = {
    PENDING: "#FFBB28",
    REVIEWING: "#0088FE",
    ACCEPTED: "#00C49F",
    REJECTED: "#FF8042",
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Error occurred while loading dashboard data
      </div>
    );

  const { statusChartData, timelineData, upcomingInterviews } = data || {};

  const totalApplications =
    statusChartData?.reduce((sum: number, item: any) => sum + item.count, 0) ||
    0;
  const pendingCount =
    statusChartData?.find((item: any) => item.status === "PENDING")?.count || 0;
  const reviewingCount =
    statusChartData?.find((item: any) => item.status === "REVIEWING")?.count ||
    0;
  const acceptedCount =
    statusChartData?.find((item: any) => item.status === "ACCEPTED")?.count ||
    0;
  const rejectedCount =
    statusChartData?.find((item: any) => item.status === "REJECTED")?.count ||
    0;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-md min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
          <p className="text-sm text-gray-500 mb-1">Total Applications</p>
          <p className="text-3xl font-bold text-blue-600">
            {totalApplications}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-500">
            {pendingCount + reviewingCount}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
          <p className="text-sm text-gray-500 mb-1">Accepted</p>
          <p className="text-3xl font-bold text-green-500">{acceptedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
          <p className="text-sm text-gray-500 mb-1">Rejected</p>
          <p className="text-3xl font-bold text-red-500">{rejectedCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Application Success Trend
          </h2>
          {timelineData?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#8884d8"
                  name="Applications"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="accepted"
                  stroke="#00C49F"
                  name="Accepted"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="#FF8042"
                  name="Rejected"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#FFBB28"
                  name="Pending"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">No trend data available</p>
            </div>
          )}
        </div>

        {/* Second row - two charts side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Status Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Application Status</h2>
            {statusChartData?.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusChartData.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          STATUS_COLORS[entry.status] ||
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} applications`, "Count"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No application data available</p>
              </div>
            )}
          </div>

          {/* Applications Timeline */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Applications Timeline
            </h2>
            {timelineData?.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Total"
                  />
                  <Area
                    type="monotone"
                    dataKey="accepted"
                    stackId="2"
                    stroke="#00C49F"
                    fill="#00C49F"
                    name="Accepted"
                  />
                  <Area
                    type="monotone"
                    dataKey="rejected"
                    stackId="2"
                    stroke="#FF8042"
                    fill="#FF8042"
                    name="Rejected"
                  />
                  <Area
                    type="monotone"
                    dataKey="pending"
                    stackId="2"
                    stroke="#FFBB28"
                    fill="#FFBB28"
                    name="Pending"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No timeline data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Interviews */}
        {upcomingInterviews?.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Upcoming Interviews</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingInterviews.map((interview: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {interview.jobApplication.job.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {interview.jobApplication.job.employer.companyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(interview.scheduledAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            interview.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {interview.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateDashboard;
