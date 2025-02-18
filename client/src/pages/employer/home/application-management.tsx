import { useState } from "react";
import { Users, Clock, CheckCircle, XCircle, Search, X } from "lucide-react";
import { Application } from "@/types/job";
import Loading from "@/components/isLoading";
import { useGetEmployerApplications } from "@/hooks/employer";
import { CardContent } from "@/components/ui/card";
import ApplicationsSection from "@/components/employer/applications";

const ApplicationManagement = () => {
  const { data: applications, isLoading } = useGetEmployerApplications();
  const [searchedData, setSearchedData] = useState(null);
  const [query, setQuery] = useState("");

  const stats = [
    {
      title: "Total Applications",
      value: "128",
      change: "+12% this month",
      icon: <Users className="h-10 w-10" />,
      color: "blue",
    },
    {
      title: "Pending Review",
      value: "45",
      change: "8 new today",
      icon: <Clock className="h-10 w-10" />,
      color: "yellow",
    },
    {
      title: "Interview Scheduled",
      value: "32",
      change: "4 this week",
      icon: <CheckCircle className="h-10 w-10" />,
      color: "green",
    },
    {
      title: "Rejected",
      value: "12",
      change: "Last 30 days",
      icon: <XCircle className="h-10 w-10" />,
      color: "red",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-600",
      yellow: "bg-yellow-50 text-yellow-600",
      green: "bg-green-50 text-green-600",
      red: "bg-red-50 text-red-600",
    };
    return colorMap[color as keyof typeof colorMap] || "";
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchedData(null);
      return;
    }

    const filtered = applications?.filter((application: Application) =>
      application.jobId?.toString().includes(query.trim()),
    );
    setSearchedData(filtered);
  };

  const handleCancel = () => {
    setQuery("");
    setSearchedData(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 
                     transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start gap-6">
              <div className={`${getColorClasses(stat.color)} p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <div className="space-y-2">
                <h3 className="emphasized-text">{stat.value}+</h3>
                <p className="small-text text-gray-500">{stat.title}</p>
                <p className="caption-text text-gray-400">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-6">
          <div className="w-full md:w-96">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center"
            >
              <input
                type="text"
                placeholder="Enter Job ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                          focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                          transition-all duration-200 outline-none regular-text"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full 
                         hover:bg-gray-100 transition-colors duration-200"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
              {query && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full 
                           hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <CardContent className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ApplicationsSection applications={searchedData || applications} />
      </CardContent>
    </div>
  );
};

export default ApplicationManagement;
