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
      <TopBar />
      <div className="flex">
        <SideBar open={open} />
        <div className="relative top-[-14px] left-[18px]">
          {!open ? (
            <ArrowCircleLeft
              onClick={() => {
                setOpen(!open);
              }}
              className=""
              size="32"
              color="gray"
              variant="Bold"
            />
          ) : (
            <ArrowCircleRight
              size={30}
              onClick={() => {
                setOpen(!open);
              }}
              variant="Bold"
              color="gray"
            />
          )}
        </div>
        <main className="rounded-sm bg-blue-50 w-full p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerLayout;
