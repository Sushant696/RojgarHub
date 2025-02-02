import { Outlet } from "@tanstack/react-router";
import { ArrowCircleLeft, ArrowCircleRight } from "iconsax-react";
// import useAuthStore from "../stores/authStore";

import TopBar from "@/components/employer/topbar";
import SideBar from "@/components/employer/sideBar";
import { useState } from "react";

export const EmployerLayout = () => {
  // const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="">
      <div className="sticky top-0">
        <TopBar />
      </div>
      <div className="flex">
        <div className=" sticky top-20">
          <SideBar open={open} />
        </div>
        <div className="fixed z-0 top-20 left-56">
          {open ? (
            <ArrowCircleLeft
              onClick={() => {
                setOpen(!open);
              }}
              className="fixed z-0 top-[72px] left-[226px]"
              size="32"
              color="gray"
              variant="Bold"
            />
          ) : (
            <ArrowCircleRight
              size={30}
              className="fixed z-0 top-[70px] left-[50px]"
              onClick={() => {
                setOpen(!open);
              }}
              variant="Bold"
              color="gray"
            />
          )}
        </div>
        <main className="rounded-sm bg-[#F2F4FA] w-full overflow-hidden p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerLayout;
