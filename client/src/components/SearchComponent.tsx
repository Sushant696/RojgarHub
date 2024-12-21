import { Button } from "@mui/material";
import { MdOutlineWorkOutline } from "react-icons/md";
import { HiCubeTransparent } from "react-icons/hi";
import Dropdown from "./ui/Dropdown";
import { Location } from "iconsax-react";
import { useState, useEffect } from "react";

const industry: string[] = [
  "Software Development",
  "Manufacturing",
  "Marketing",
];
const location: string[] = [
  "Kathmandu",
  "New York",
  "Birtamod",
  "Biratnagar",
  "Lalitpur",
];

function SearchComponent() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [selectedValueLocation, setSelectedValueLocation] =
    useState<string>("");

  useEffect(() => {
    if (selectedValue) {
      console.log(`Selected Industry changed to: ${selectedValue}`);
    }
  }, [selectedValue, selectedValueLocation]);

  function handleSearchQuery() {
    const queryObject = {
      location: selectedValueLocation,
      industry: selectedValue,
      keywords,
    };

    // reset the fields after submission
    setSelectedValue("");
    setSelectedValueLocation("");
    setKeywords("");
  }

  return (
    <div>
      <div className="flex items-center gap-4 border text-center mx-8 p-4 md:mx-16 xl:mx-32 rounded-lg mt-12">
        {/* Search Input */}
        <div className="flex-1 flex items-center h-12 gap-3 rounded-lg px-4">
          <HiCubeTransparent className="text-blue-950 text-2xl flex-shrink-0" />
          <input
            type="text"
            value={keywords}
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
            placeholder="Job keywords or title.."
            className="w-full bg-[#F4F7FD] outline-none h-full"
          />
        </div>
        <div>|</div>

        <div className="flex-2 flex items-center h-12 gap-3 rounded-lg px-4">
          <MdOutlineWorkOutline className="text-blue-950 text-2xl flex-shrink-0" />
          <Dropdown
            data={industry}
            setSelectedValue={setSelectedValue}
            name="Industry"
            value={selectedValue}
          />
        </div>

        <div>|</div>
        <div className="flex-2 flex items-center h-12 gap-3  rounded-lg px-4">
          <Location size={24} className="text-blue-950 flex-shrink-0" />
          <Dropdown
            data={location}
            setSelectedValue={setSelectedValueLocation}
            name="Location"
            value={selectedValueLocation}
          />
        </div>

        <div className="flex items-center h-12">
          <Button
            onClick={handleSearchQuery}
            variant="contained"
            sx={{
              height: "100%",
              minWidth: "unset",
              padding: "0 16px",
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
