import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useEffect } from "react";

interface ToggleUserProps {
  setCurrentUser: (userType: string) => void
}


export default function ToggleUser({ setCurrentUser }: ToggleUserProps) {
  const [alignment, setAlignment] = useState("left");

  useEffect(() => {
    const userType = alignment === "left" ? "candidate" : "employer";
    setCurrentUser(userType);
  }, [alignment, setCurrentUser]);

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      color="primary"
      onChange={(_, newAlignment) => newAlignment && setAlignment(newAlignment)}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="right aligned">
        Candidate
      </ToggleButton>
      <ToggleButton value="right" aria-label="justified">
        Employer
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
