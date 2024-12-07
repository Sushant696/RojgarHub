import { Link } from "@tanstack/react-router";
import React from "react";

function Navbar() {
  return (
    <div className="flex justify-evenly p-4">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/apply" className="[&.active]:font-bold">
        Apply
      </Link>
      <Link to="/contact" className="[&.active]:font-bold">
        Contact
      </Link>
    </div>
  );
}

export default Navbar;
