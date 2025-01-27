import { Outlet } from "@tanstack/react-router";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useAuthStore from "../stores/authStore";

const PublicLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <div className="sticky top-0 z-50 overflow-hidden">
        {!isAuthenticated && <Navbar />}
      </div>
      <div className="">
        <Outlet />
      </div>
      <div className="mt-20">{!isAuthenticated && <Footer />}</div>
    </>
  );
};

export default PublicLayout;
