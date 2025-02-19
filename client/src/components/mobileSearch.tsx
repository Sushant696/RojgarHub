import { Button } from "@mui/material";
import { MdOutlineWorkOutline } from "react-icons/md";
import { HiCubeTransparent } from "react-icons/hi";
import { Location } from "iconsax-react";
import { useState } from "react";

import Dropdown from "./ui/Dropdown";

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

function SearchComponentMobile({ bgColor }: { bgColor: string }) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const [selectedValueLocation, setSelectedValueLocation] =
    useState<string>("");

  return (
    <div>
      <div className="border text-center mx-1 p-4 md:mx-16 xl:mx-32 rounded-lg my-12 space-y-4">
        <div className=" border flex-1 flex items-center p-5 gap-3 rounded-lg">
          <HiCubeTransparent className="subtitle-text text-blue-950" />
          <input
            type="text"
            placeholder="Job keywords or title.."
            className={`w-full ${bgColor ? `${bgColor}` : ""} regular-text outline-none h-full`}
          />
        </div>
        <div className="flex-2 flex items-center p-5 gap-3 border rounded-lg">
          <MdOutlineWorkOutline className="emphasized-text text-blue-950" />
          <Dropdown
            data={industry}
            setSelectedValue={setSelectedValue}
            name="Industry"
            value={selectedValue}
          />
        </div>
        <div className="flex-2 flex items-center p-5 gap-3 border rounded-lg">
          <Location className="regular-text text-blue-950" />
          <Dropdown
            data={location}
            setSelectedValue={setSelectedValueLocation}
            name="Location"
            value={selectedValueLocation}
          />
        </div>
        <div className="p-2">
          <Button variant="contained">Search</Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponentMobile;
