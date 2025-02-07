import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Moon, ProfileCircle, Setting3, Sun1 } from "iconsax-react";

import { useLogout } from "@/hooks/auth";
import { Button } from "../ui/button";
import { TopBarSearch } from "./searchBar";
import useRouter from "@/lib/router";

const user = {
  name: "sushant babu prasai",
  role: "",
};

function TopBar() {
  const logout = useLogout();
  const router = useRouter();

  return (
    <div className="w-full bg-white">
      <div className="px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="/tempLogo.png"
            alt="Company Logo"
            className="w-14 h-14 rounded-full"
          />
          <p className="emphasized-text">Employer Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <TopBarSearch />
          <div>
            <Button
              onClick={() => {
                router.push("/employer/postJob");
              }}
              className="bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Create Job
              <Edit size="20" color="white" variant="Bulk" className="ml-2" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 border flex items-center justify-center rounded-full bg-blue-950 text-white capitalize hover:bg-blue-900 transition-colors duration-200">
                  {user.name.slice(0, 1)}
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 p-2 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <DropdownMenuLabel className="flex flex-col items-center p-4">
                <div className="w-12 h-12 border flex items-center justify-center rounded-full bg-blue-950 text-white capitalize mb-2">
                  {user.name.slice(0, 1)}
                </div>
                <h1 className="text-sm font-semibold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-xs text-gray-500">{user.role}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                onClick={() => router.push("/employer/company")}
                className="flex items-center text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ProfileCircle
                  variant="Bulk"
                  size={16}
                  className="text-gray-600"
                />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/employer/settings")}
                className="flex items-center text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <Setting3 variant="Bulk" size={16} className="text-gray-600" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem className="flex justify-between items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
                <span>Theme</span>
                <div className="flex items-center gap-4">
                  <Sun1 size="18" color="#2ccce4" variant="Bulk" />

                  <Moon size="18" color="#2ccce4" variant="Bulk" />
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => logout.mutate()}
                className="flex items-center space-x-2 p-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
              >
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
