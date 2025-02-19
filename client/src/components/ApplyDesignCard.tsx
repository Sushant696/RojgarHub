import SearchComponentMobile from "@/components/mobileSearch";
import SearchComponent from "@/components/SearchComponent";
import { Briefcase } from "lucide-react";

const popularSearches = [
  "Software Developer",
  "Receptionist",
  "UI/UX Designer",
  "DevOps Engineer",
];

function ApplyDesignCard() {
  return (
    <div className="lg:container mx-0 sm:mx-auto px-1 md:px-4 py-0 sm:py-8">
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-sm sm:rounded-xl shadow-lg overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-200/20 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative px-6 py-16 md:py-10 md:px-12 text-center">
          {/* Header Section */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="hidden md:block text-orange-400 w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              <span className="text-orange-500">54 Jobs</span> Available Now
            </h1>
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            Find your dream job from our curated list of opportunities. We're
            connecting talented professionals with leading companies.
          </p>

          {/* Search Section - Mobile */}
          <div className="block lg:hidden mb-12">
            <SearchComponentMobile bgColor={"bg-[#E8F2FF]"} />
          </div>

          {/* Search Section - Desktop */}
          <div className="hidden lg:block">
            <SearchComponent bgColor={"bg-[#E8F2FF]"} />

            {/* Popular Searches */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
              <span className="text-gray-500">Popular:</span>
              {popularSearches.map((item, index) => (
                <button
                  key={index}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-orange-500 
                           transition-colors duration-200 ease-in-out rounded-full 
                           hover:bg-orange-50 focus:outline-none focus:ring-2 
                           focus:ring-orange-200"
                >
                  {item}
                  {index < popularSearches.length - 1 && ""}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyDesignCard;
