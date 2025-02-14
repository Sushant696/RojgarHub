import TopBar from "@/components/employer/topbar";
import { useEffect, useRef, useState } from "react";
import SideBarMobile from "./sidebarMobile";
import { Outlet } from "@tanstack/react-router";

export const EmployerMobileView = () => {
  const [open, setOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="block xl:hidden">
      {open && (
        <div
          ref={sidebarRef}
          className="absolute top-0 min-h-screen bg-white z-50"
        >
          <SideBarMobile open={open} setOpen={setOpen} />
        </div>
      )}
      <div className="sticky top-0 z-40">
        <TopBar open={open} setOpen={setOpen} />
      </div>
      <div className="flex mt-3"></div>
      <main className="rounded-sm bg-[#F2F4FA] w-full max-h-fit overflow-hidden  md:md-2 lg:px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployerMobileView;
