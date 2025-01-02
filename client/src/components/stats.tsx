import { Briefcase, Users, Building2, Trophy } from "lucide-react";

const statsData = [
  {
    number: "25K+",
    title: "Active Jobs",
    description: "Open positions from top companies across various industries",
    icon: <Briefcase className="w-14 h-14 text-emerald-500" />,
    numberColor: "text-gray-900",
  },
  {
    number: "150K+",
    title: "Job Seekers",
    description:
      "Active professionals looking for their next career opportunity",
    icon: <Users className=" w-14 h-14 text-purple-500" />,
    numberColor: "text-gray-900",
  },
  {
    number: "10K+",
    title: "Companies",
    description: "Trusted employers posting new opportunities daily",
    icon: <Building2 className=" w-14 h-14 text-orange-500" />,
    numberColor: "text-gray-900",
  },
  {
    number: "95%",
    title: "Success Rate",
    description: "Of job seekers find relevant positions within 3 months",
    icon: <Trophy className="w-14 h-14 text-rose-500" />,
    numberColor: "text-gray-900",
  },
];

const Stats = () => {
  return (
    <div className="section-margin">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex pr-4 justify-between">
                <div className="">
                  <h2 className="text-4xl font-bold text-color-dark mb-2">
                    {stat.number}
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {stat.title}
                  </h3>
                </div>
                <div className={`mb-4`}>{stat.icon}</div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
