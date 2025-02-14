import EmployerMobileView from "@/components/employer/mobileLayout";
import EmployerLayoutDesktop from "@/components/employer/EmployerDesktopView";

export const EmployerLayout = () => {
  return (
    <div className="max-h-screen">
      <div className="">
        <EmployerMobileView />
      </div>
      <div className="">
        <EmployerLayoutDesktop />
      </div>
    </div>
  );
};

export default EmployerLayout;
