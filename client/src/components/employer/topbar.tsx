import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/auth";

function TopBar() {
  const logout = useLogout();

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="px-3 py-2 mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="/tempLogo.png"
            alt="Company Logo"
            className="w-14 h-14 rounded-full"
          />
          <h2 className="emphasized-text font-bold text-gray-800">rojgarHub</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 border flex items-center justify-center rounded-full bg-blue-950 text-white">
                JD
              </div>
              <div className="hidden md:block text-left">
                <p className="regular-text font-medium text-gray-700">
                  John Doe
                </p>
                <p className="text-xs text-gray-500">Employer</p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center space-x-2">
              <User size={16} />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center space-x-2">
              <Settings size={16} />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => logout.mutate()}
              className="flex items-center space-x-2 text-red-600"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TopBar;
