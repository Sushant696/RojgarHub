import { useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import { motion, AnimatePresence } from "motion/react";

function SlidingForms() {
  const location = useLocation();
  const [activeForm, setActiveForm] = useState(location.pathname.slice(1));

  useEffect(() => {
    setActiveForm(location.pathname.slice(1));
  }, [location.pathname]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-[#f0f6ff] overflow-hidden p-4">
      <div className="absolute top-0 left-0 w-full h-52 md:h-64 bg-gradient-to-b from-blue-600 to-blue-500" />

      <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeForm === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
              className="w-full h-full"
            >
              <Login onSwitch={() => setActiveForm("register")} />
            </motion.div>
          )}

          {activeForm === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
              className="w-full h-full"
            >
              <Register onSwitch={() => setActiveForm("login")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SlidingForms;
