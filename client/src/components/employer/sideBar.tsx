import useRouter from "@/lib/router";
import { useLogout } from "@/hooks/auth";
import { LogOut } from "lucide-react";
import {
  Home2,
  People,
  FolderAdd,
  Messages3,
  Building4,
  Note1,
  DocumentText,
} from "iconsax-react";
import clsx from "clsx";
import { useLocation } from "@tanstack/react-router";

interface SideBarProps {
  open: boolean;
}

function SideBar({ open }: SideBarProps) {
  const router = useRouter();
  const logout = useLogout();
  const location = useLocation();

  const navItems = [
    { icon: Home2, label: "Dashboard", path: "/employer/dashboard" },
    { icon: FolderAdd, label: "Post Job", path: "/employer/postJob" },
    { icon: Note1, label: "Job Management", path: "/employer/job-management" },
    {
      icon: DocumentText,
      label: "Application Management",
      path: "/employer/application-management",
    },
    { icon: People, label: "Candidates", path: "/employer/candidates" },
    { icon: Building4, label: "Company", path: "/employer/company" },
    { icon: Messages3, label: "Messages", path: "/employer/messages" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={clsx("bg-white sticky top-20", open ? "w-60" : "w-16")}>
      <div className="flex flex-col h-5/6">
        {/* Navigation Items */}
        <div className={clsx("flex-1 space-y-4 py-4", open ? "px-3" : "px-2")}>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={clsx(
                "w-full flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200",
                isActive(item.path)
                  ? "bg-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100",
              )}
              title={item.label}
            >
              <item.icon
                variant="Bulk"
                className={clsx(
                  isActive(item.path) ? "text-white" : "text-gray-700", // Icon color
                  open ? "w-8 h-8" : "w-6 h-6 mx-auto",
                )}
              />
              {open && (
                <span
                  className={clsx(
                    "text-sm font-medium",
                    isActive(item.path) ? "text-white" : "text-gray-700", // Text color
                  )}
                >
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="py-6 border-t border-gray-200">
          <button
            onClick={() => logout.mutate()}
            className={clsx(
              "w-full flex items-center space-x-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200",
              open ? "px-4" : "px-2 justify-center",
            )}
            title="Logout"
          >
            <LogOut size={open ? 24 : 20} />
            {open && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
