import { useState } from "react";
import { ArrowCircleLeft, ArrowCircleRight } from "iconsax-react";

import TopBar from "@/components/employer/topbar";
import SideBar from "@/components/employer/sideBar";
import { Outlet } from "@tanstack/react-router";

export const EmployerLayoutDesktop = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="hidden xl:block">
      <div className="sticky top-0 z-40">
        <TopBar open={open} setOpen={setOpen} />
      </div>
      <div className="flex mt-3">
        <div className="">
          <SideBar open={open} />
        </div>

        <div className="z-50">
          {open ? (
            <ArrowCircleLeft
              onClick={() => {
                setOpen(!open);
              }}
              className="fixed z-0 top-[74px] left-[226px]"
              size="32"
              color="gray"
              variant="Bold"
            />
          ) : (
            <ArrowCircleRight
              size={30}
              className="fixed z-0 top-[74px] left-[50px]"
              onClick={() => {
                setOpen(!open);
              }}
              variant="Bold"
              color="gray"
            />
          )}
        </div>
        <main className="rounded-sm bg-[#F2F4FA] w-full max-h-fit overflow-hidden px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerLayoutDesktop;
