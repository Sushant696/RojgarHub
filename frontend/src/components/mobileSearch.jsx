import { Button } from "@mui/material";
import { MdOutlineWorkOutline } from "react-icons/md";
import { HiCubeTransparent } from "react-icons/hi";
import React from "react";
import Dropdown from "./ui/Dropdown";
import { Location } from "iconsax-react";
import { useState } from "react";

function SearchComponentMobile() {
  const [data, setData] = useState();
  const industry = ["Software Development", "Manufacturing", "Marketing"];
  const location = ["Kathmandu", "New York", "Birtamod"];

  console.log(data);
  return (
    <div>
      <div className="border text-center mx-8 p-4 md:mx-16 xl:mx-32 rounded-lg my-12 space-y-4">
        <div className=" border flex-1 flex items-center p-5 gap-3 rounded-lg">
          <HiCubeTransparent className="subtitle-text text-blue-950" />
          <input
            type="text"
            placeholder="Job keywords or title.."
            className="w-full bg-[#F4F7FD] regular-text outline-none"
          />
        </div>
        <div className="flex-2 flex items-center p-5 gap-3 border rounded-lg">
          <MdOutlineWorkOutline className="emphasized-text text-blue-950" />
          <Dropdown data={industry} setData={setData} name="Industry" />
        </div>
        <div className="flex-2 flex items-center p-5 gap-3 border rounded-lg">
          <Location className="regular-text text-blue-950" />
          <Dropdown data={location} setData={setData} name="location" />
        </div>
        <div className="p-2">
          <Button variant="contained">Search</Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponentMobile;
