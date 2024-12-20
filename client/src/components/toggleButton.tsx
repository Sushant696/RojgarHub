import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useEffect } from "react";

export default function ToggleUser({ setCurrentUser }) {
  const [alignment, setAlignment] = useState("left");

  useEffect(() => {
    const userType = alignment === "left" ? "user" : "employer";
    setCurrentUser(userType);
  }, [alignment, setCurrentUser]);

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      color="primary"
      onChange={(e, newAlignment) => newAlignment && setAlignment(newAlignment)}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="right aligned">
        Job Seeker
      </ToggleButton>
      <ToggleButton value="right" aria-label="justified">
        Job Provider
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
