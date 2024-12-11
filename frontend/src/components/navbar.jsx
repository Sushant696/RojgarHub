import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import React from "react";

function Navbar() {
  return (
    <div className="flex container justify-between items-center">
      <div className="h-24 w-20 p-1">
        <img src="/tempLogo.png" alt="temp logo" />
      </div>
      <div className="flex gap-20">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About Us
        </Link>
        <Link to="/apply" className="[&.active]:font-bold">
          Find a Job
        </Link>
        <Link to="/blog" className="[&.active]:font-bold">
          blogs
        </Link>
        <Link to="/contact" className="[&.active]:font-bold">
          Contact
        </Link>
        <Link to="/dashboard" className="[&.active]:font-bold">
          <button className="border-dotted border-2 border-blue-600 px-4 py-1 rounded-md">
            Dashboard
          </button>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/register" className="[&.active]:font-bold">
          Register
        </Link>
        |
        <Link to="/login" className="[&.active]:font-bold">
          <Button variant="contained">Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
