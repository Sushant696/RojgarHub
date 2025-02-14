import useRouter from "@/lib/router";
import { useLogout } from "@/hooks/auth";
import { LogOut } from "lucide-react";
import {
  Home2,
  People,
  FolderAdd,
  Note1,
  Messages3,
  Building4,
} from "iconsax-react";
import { useLocation } from "@tanstack/react-router";
import clsx from "clsx";

import useAuthStore from "@/stores/authStore";

interface SideBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function SideBarMobile({ open, setOpen }: SideBarProps) {
  const router = useRouter();
  const logout = useLogout();
  const location = useLocation();
  const { user } = useAuthStore();
  const navItems = [
    { icon: Home2, label: "Dashboard", path: "/employer/dashboard" },
    { icon: FolderAdd, label: "Post Job", path: "/employer/postJob" },
    { icon: Note1, label: "Job Management", path: "/employer/job-management" },
    { icon: People, label: "Candidates", path: "/employer/candidates" },
    { icon: Messages3, label: "Messages", path: "/employer/messages" },
    { icon: Building4, label: "Company", path: "/employer/company" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur effect */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 w-72 bg-white shadow-2xl transition-all duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border flex items-center justify-center rounded-full bg-blue-950 text-white capitalize hover:bg-blue-900 transition-colors duration-200">
              {user?.username.slice(0, 1)}
            </div>{" "}
            <span className="emphasized-text font-semibold text-gray-800">
              {user?.username}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col h-[calc(100%-160px)] overflow-y-auto">
          <div className="flex-1 py-6 px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setOpen(false);
                }}
                className={clsx(
                  "w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200",
                  isActive(item.path)
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-[0.98]"
                    : "text-gray-700 hover:bg-gray-50 active:scale-[0.98]",
                )}
              >
                <item.icon
                  variant="Bulk"
                  className={clsx(
                    "w-6 h-6",
                    isActive(item.path) ? "text-white" : "text-gray-600",
                  )}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => logout.mutate()}
              className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarMobile;
