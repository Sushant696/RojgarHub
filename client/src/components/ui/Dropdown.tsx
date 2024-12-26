import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface DropdownTypes {
  data: string[];
  setSelectedValue: (value: string) => void;
  name: string;
  value: string;
}

function Dropdown({ data, setSelectedValue, name, value }: DropdownTypes) {
  function handleSelectdOption(e: SelectChangeEvent<string>) {
    const selectedValue = e.target.value as string;
    setSelectedValue(selectedValue);
    console.log("hello")
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
          onChange={handleSelectdOption}
          displayEmpty
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
          <MenuItem value="" disabled>
            Select a {name}
          </MenuItem>
          {data?.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;
