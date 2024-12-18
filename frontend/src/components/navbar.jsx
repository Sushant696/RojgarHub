import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import React from "react";

function Navbar() {
  return (
    <div className="bg-blue-200/20 backdrop-blur-xl py-1">
      <div className="flex container justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/tempLogo.png" className="w-20 h-20" alt="temp logo" />
        </div>
        <div className="flex gap-20">
          <Link to="/" className="[&.active]:font-bold  regular-text ">
            Home
          </Link>{" "}
          <Link to="/apply" className="[&.active]:font-bold  regular-text">
            Find a Job
          </Link>
          <Link to="/pricing" className="[&.active]:font-bold  regular-text">
            Pricing
          </Link>
          <Link to="/blog" className="[&.active]:font-bold  regular-text">
            blogs
          </Link>
          <Link to="/contact" className="[&.active]:font-bold  regular-text">
            Contact
          </Link>
          <Link to="/dashboard" className="[&.active]:font-bold">
            <button className="border-dotted border-2 border-blue-600 px-4 rounded-md">
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
    </div>
  );
}

export default Navbar;
