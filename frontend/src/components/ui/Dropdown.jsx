import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";

function Dropdown({ data, setData, name }) {
  const [value, setValue] = useState("placeholder");

  function handleChange(e) {
    setValue(e.target.value);
    setData(value);
  }

  return (
    <div className="w-full">
      <FormControl
        fullWidth
        variant="standard"
        sx={{
          "& .MuiInput-underline:before": { borderBottom: "none" },
          "& .MuiInput-underline:after": { borderBottom: "none" },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
          },
        }}
      >
        <Select
          value={value}
          onChange={handleChange}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiSelect-icon": { color: "inherit" },
            boxShadow: "none",
            "& .MuiSelect-select": {
              opacity: value === "placeholder" ? 0.6 : 1,
            },
          }}
        >
          <MenuItem value="placeholder" disabled>
            Select a {name}
          </MenuItem>
          {data?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;
