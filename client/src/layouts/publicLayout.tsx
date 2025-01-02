import { Outlet } from "@tanstack/react-router";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

const PublicLayout = () => (
  <>
    <div className="sticky top-0 z-50 overflow-hidden">
      <Navbar />
    </div>
    <div className="">
      <Outlet />
    </div>
    <div className="mt-20">
      <Footer />
    </div>
  </>
);

export default PublicLayout;
