import useRouter from "@/lib/router";
import { useLogout } from "@/hooks/auth";
import {
  Home,
  FilePlus,
  ListChecks,
  LogOut,
  MessageSquare,
  Users,
  Building2,
} from "lucide-react";

interface SideBarProps {
  open: boolean;
}

function SideBar({ open }: SideBarProps) {
  const router = useRouter();
  const logout = useLogout();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/employer/dashboard" },
    { icon: FilePlus, label: "Post Job", path: "/employer/postJob" },
    { icon: ListChecks, label: "Applications", path: "/employer/applications" },
    { icon: Users, label: "Candidates", path: "/employer/candidates" },
    // { icon: BarChart3, label: "Analytics", path: "/employer/analytics" },
    { icon: MessageSquare, label: "Messages", path: "/employer/messages" },
    { icon: Building2, label: "Company", path: "/employer/company" },
  ];

  if (!open) {
    return (
      <nav className="w-16 min-h-screen bg-white">
        <div className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="w-full flex items-center justify-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              title={item.label}
            >
              <item.icon size={25} />
            </button>
          ))}
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200">
          <button
            onClick={() => logout.mutate()}
            className="w-full flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={25} />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-60 min-h-screen bg-white px-6 space-y-6">
      <div className="py-6 space-y-4">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <item.icon size={24} />
            <span className="small-text font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-gray-200">
        <button
          onClick={() => logout.mutate()}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={24} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default SideBar;
