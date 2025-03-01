import { Button, CircularProgress } from "@mui/material";
import { HiCubeTransparent } from "react-icons/hi";
import { Location } from "iconsax-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useJobsSearch } from "@/hooks/jobs";
import { toast } from "react-toastify";
import { WorkflowIcon } from "lucide-react";

function SearchComponent({
  setSearchResults = () => {},
}: {
  bgColor?: string;
  setSearchResults: Dispatch<SetStateAction<any[]>>;
}) {
  const [keywords, setKeywords] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [searchParams, setSearchParams] = useState<any>(null);
  const [validationError, setValidationError] = useState("");

  const {
    data: searchResults,
    isLoading: isSearching,
    error,
  } = useJobsSearch(searchParams);

  useEffect(() => {
    if (searchResults) setSearchResults(searchResults);
    if (error) toast.error("Error searching jobs");
  }, [searchResults, error, setSearchResults]);

  const validateSearch = () => {
    const trimmedKeywords = keywords.trim();
    const trimmedIndustry = industry.trim();
    const trimmedLocation = location.trim();

    if (!trimmedKeywords && !trimmedIndustry && !trimmedLocation) {
      setValidationError("Please fill at least one search field");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSearch = () => {
    if (!validateSearch()) return;

    const query = {
      keywords: keywords.trim(),
      industry: industry.trim(),
      location: location.trim(),
    };

    setSearchParams(query);
    // Reset form fields after submission
    setKeywords("");
    setIndustry("");
    setLocation("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-4 border border-gray-300 mx-8 p-4 md:mx-16 xl:mx-32 rounded-lg mt-12">
        {/* Keywords Search */}
        <div className="flex-1 w-full flex items-center h-12 gap-3 rounded-lg px-4">
          <HiCubeTransparent className="text-blue-950 text-2xl" />
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Job title, keywords, or description"
            className="w-full bg-transparent regular-text outline-none"
          />
        </div>

        {/* Industry Dropdown */}
        <div className="flex-1 w-full flex items-center h-12 gap-3 rounded-lg px-4">
          <WorkflowIcon className="text-blue-950" size={24} />
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Industry"
            className="w-full bg-transparent regular-text outline-none"
          />
        </div>

        {/* Location Dropdown */}
        <div className="flex-1 w-full flex items-center h-12 gap-3 rounded-lg px-4">
          <Location className="text-blue-950" size={24} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full bg-transparent regular-text outline-none"
          />
        </div>

        <Button
          onClick={handleSearch}
          variant="contained"
          disabled={isSearching}
          className="h-12 w-full md:w-auto"
        >
          {isSearching ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </div>

      {validationError && (
        <p className="text-red-500 text-center mt-2">{validationError}</p>
      )}
    </div>
  );
}

export default SearchComponent;
