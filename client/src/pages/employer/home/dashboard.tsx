import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Treemap,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Briefcase, CheckCircle, Clock } from "lucide-react";
import { useGetVizData } from "@/hooks/employer";

interface JobPosting {
  month: string;
  count: number;
}

interface ApplicationStatus {
  status: string;
  count: number;
}

interface JobApplication {
  title: string;
  applicationCount: number;
}

// Component Props Types
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: number;
}

interface EmptyStateProps {
  message: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <h2 className="text-2xl font-bold">{value}</h2>
            {trend && (
              <span
                className={`ml-2 text-sm ${trend >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {trend > 0 ? "+" : ""}
                {trend}%
              </span>
            )}
          </div>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300">
    <p className="text-gray-500">{message}</p>
  </div>
);

const JobPostingsChart: React.FC<{ data: JobPosting[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <EmptyState message="No job postings data available" />;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#2563eb"
          strokeWidth={2}
          name="Job Posts"
          dot={{ fill: "#2563eb" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ApplicationStatusPie: React.FC<{ data: ApplicationStatus[] }> = ({
  data,
}) => {
  if (!data || data.length === 0) {
    return <EmptyState message="No application status data available" />;
  }

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const JobApplicationsTreemap: React.FC<{ data: JobApplication[] }> = ({
  data,
}) => {
  if (!data || data.length === 0) {
    return <EmptyState message="No applications per job data available" />;
  }

  // Vibrant color palette for the treemap
  const COLORS = [
    "#FF6B6B", // Coral Red
    "#4ECDC4", // Turquoise
    "#45B7D1", // Sky Blue
    "#96CEB4", // Mint
    "#FFEEAD", // Cream Yellow
    "#D4A5A5", // Dusty Rose
    "#9B5DE5", // Purple
    "#F15BB5", // Pink
    "#00BBF9", // Bright Blue
    "#00F5D4", // Aqua
    "#FEE440", // Yellow
    "#8338EC", // Deep Purple
    "#FF006E", // Hot Pink
    "#FB5607", // Orange
    "#3A86FF", // Royal Blue
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        data={data}
        dataKey="applicationCount"
        nameKey="title"
        aspectRatio={4 / 3}
        stroke="#fff"
        animationDuration={500}
      >
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
          formatter={(value: number, name: string) => [
            `${value} applications`,
            name,
          ]}
        />
        {data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            className="hover:opacity-80 transition-opacity duration-200"
          />
        ))}
      </Treemap>
    </ResponsiveContainer>
  );
};

const DashboardEmployer: React.FC = () => {
  const { data, isLoading } = useGetVizData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Calculate summary statistics
  const totalApplications =
    data?.applicationStatusDistribution?.reduce(
      (sum: any, item: any) => sum + item.count,
      0,
    ) || 0;
  const totalJobs = data?.applicationsPerJob?.length || 0;
  const acceptedApplications =
    data?.applicationStatusDistribution?.find(
      (item: any) => item.status === "ACCEPTED",
    )?.count || 0;

  const pendingApplications =
    data?.applicationStatusDistribution?.find(
      (item: any) => item.status === "PENDING",
    )?.count || 0;

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employer Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={Users}
          trend={5}
        />
        <StatCard title="Active Jobs" value={totalJobs} icon={Briefcase} />
        <StatCard
          title="Accepted Applications"
          value={acceptedApplications}
          icon={CheckCircle}
          trend={2}
        />
        <StatCard
          title="Pending Reviews"
          value={pendingApplications}
          icon={Clock}
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Job Postings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <JobPostingsChart data={data?.jobPostingsByMonth || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ApplicationStatusPie
              data={data?.applicationStatusDistribution || []}
            />
          </CardContent>
        </Card>
      </div>

      {/* Applications per Job Section */}
      <Card>
        <CardHeader>
          <CardTitle>Applications per Job Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <JobApplicationsTreemap data={data?.applicationsPerJob || []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardEmployer;
