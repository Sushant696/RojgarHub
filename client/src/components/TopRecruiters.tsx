const recruiters = [
  {
    id: 1,
    name: "Google",
    logo: "https://img.icons8.com/?size=512&id=17949&format=png",
    jobs: 156,
    industry: "Technology",
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "https://w7.pngwing.com/pngs/75/995/png-transparent-microsoft-logo-information-microsoft-logo-angle-rectangle-orange-thumbnail.png",
    jobs: 124,
    industry: "Technology",
  },
  {
    id: 3,
    name: "Amazon",
    logo: "https://seekvectors.com/files/download/Amazon-Logo-07.png",
    jobs: 208,
    industry: "E-commerce",
  },
  {
    id: 4,
    name: "Apple",
    logo: "https://static-00.iconduck.com/assets.00/apple-logo-icon-1661x2048-8adk63j7.png",
    jobs: 97,
    industry: "Technology",
  },
  {
    id: 5,
    name: "LeapFrog",
    logo: "https://www.brand.lftechnology.com/download/icon-circle/leapfrog-ic-ro.png",
    jobs: 76,
    industry: "Technology",
  },
  {
    id: 6,
    name: "Twb Creates",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQH-DaAvRJpvzw/company-logo_200_200/company-logo_200_200/0/1676627846070?e=2147483647&v=beta&t=-Fh-dHb0mfSbKz9HdDkBPsXI7r-P_rwMEChIGibAkfI",
    jobs: 145,
    industry: "Consulting",
  },
];

const TopRecruiters = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="subtitle-text font-bold text-center mb-4">
            Top Recruiters
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded"></div>
          <p className="text-gray-600 mt-4 text-center max-w-2xl">
            Connect with the industry leaders who are actively hiring talent
            like you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="p-6 flex items-center">
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                  <img
                    src={recruiter.logo}
                    alt={recruiter.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{recruiter.name}</h3>
                  <p className="text-gray-600 text-sm">{recruiter.industry}</p>
                  <div className="mt-2 bg-blue-50 text-blue-700 text-xs py-1 px-2 rounded-full inline-block">
                    {recruiter.jobs} open positions
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRecruiters;
