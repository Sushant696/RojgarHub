import { Button } from "@mui/material";
import { MdOutlineWorkOutline } from "react-icons/md";
import { HiCubeTransparent } from "react-icons/hi";
import React from "react";
import Dropdown from "./ui/Dropdown";
import { Location } from "iconsax-react";
import { useState } from "react";

function SearchComponent() {
  // fetch  the data and sent the data to the dropdown
  const [data, setData] = useState();

  const industry = ["Software Development", "Manufacturing", "Marketing"];
  const location = ["Kathmandu", "New York", "Birtamod"];
  console.log(data);

  return (
    <div>
      <div className="flex items-center gap-4 border text-center mx-8 p-4 md:mx-16 xl:mx-32 rounded-lg mt-12">
        {/* Search Input */}
        <div className="flex-1 flex items-center h-12 gap-3 rounded-lg px-4">
          <HiCubeTransparent className="text-blue-950 text-2xl flex-shrink-0" />
          <input
            type="text"
            placeholder="Job keywords or title.."
            className="w-full bg-[#F4F7FD] outline-none h-full"
          />
        </div>
        <div>|</div>

        <div className="flex-2 flex items-center h-12 gap-3 rounded-lg px-4">
          <MdOutlineWorkOutline className="text-blue-950 text-2xl flex-shrink-0" />
          <Dropdown data={industry} setData={setData} name="Industry" />
        </div>

        <div>|</div>
        <div className="flex-2 flex items-center h-12 gap-3  rounded-lg px-4">
          <Location size={24} className="text-blue-950 flex-shrink-0" />
          <Dropdown data={location} setData={setData} name="location" />
        </div>

        <div className="flex items-center h-12">
          <Button
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
