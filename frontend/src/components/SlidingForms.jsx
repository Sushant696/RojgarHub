import { useLocation } from "@tanstack/react-router";
import React from "react";
import { useState } from "react";
import Login from "../pages/login";
import Register from "../pages/register";
import { motion } from "motion/react";
import { useEffect } from "react";

function SlidingForms() {
  const location = useLocation();
  const [activeForm, setActiveForm] = useState(location.pathname.slice(1));

  useEffect(() => {
    setActiveForm(location.pathname.slice(1));
  }, location.pathname);

  return (
    <div>
      <div className=" relative mt-16 flex items-center justify-center w-full h-[calc(100vh-9rem)] overflow-hidden">
        {activeForm === "login" && (
          <motion.div
            key="login"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              ease: "linear",
              stiffness: 250,
              damping: 40,
            }}
            className="absolute w-full h-full ml-20"
          >
            <Login onSwitch={() => setActiveForm("register")} />
          </motion.div>
        )}
        {activeForm === "register" && (
          <motion.div
            key="register"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              ease: "linear",
              stiffness: 250,
              damping: 40,
            }}
            className="absolute w-full h-full mr-20"
          >
            <Register onSwitch={() => setActiveForm("login")} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SlidingForms;
