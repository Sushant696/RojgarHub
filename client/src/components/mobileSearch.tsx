import { Button, CircularProgress } from "@mui/material";
import { MdOutlineWorkOutline } from "react-icons/md";
import { HiCubeTransparent } from "react-icons/hi";
import { Location } from "iconsax-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useJobsSearch } from "@/hooks/jobs";
import { toast } from "react-toastify";

function SearchComponentMobile({
  bgColor,
  setSearchResults,
}: {
  bgColor: string;
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
    <div>
      <div className="border text-center mx-1 p-4 md:mx-16 xl:mx-32 rounded-lg my-12 space-y-4">
        <div className="border flex-1 flex items-center p-5 gap-3 rounded-lg">
          <HiCubeTransparent className="subtitle-text text-blue-950" />
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Job keywords or title.."
            className={`w-full ${bgColor ? `${bgColor}` : ""} regular-text outline-none h-full`}
          />
        </div>

        <div className="flex-2 flex items-center p-5 gap-3 border rounded-lg">
          <MdOutlineWorkOutline className="emphasized-text text-blue-950" />
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Industry"
            className={`w-full ${bgColor ? `${bgColor}` : ""} regular-text outline-none h-full`}
          />
        </div>

        <div className="flex-2 flex items-center p-5 gap-3 border rounded-lg">
          <Location className="regular-text text-blue-950" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className={`w-full ${bgColor ? `${bgColor}` : ""} regular-text outline-none h-full`}
          />
        </div>

        <div className="p-2">
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </div>

        {validationError && (
          <p className="text-red-500 text-center mt-2">{validationError}</p>
        )}
      </div>
    </div>
  );
}

export default SearchComponentMobile;
