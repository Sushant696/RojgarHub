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
import useRouter from "@/lib/router";
import { Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import useAuthStore from "@/stores/authStore";

interface TopBarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function TopBar({ open, setOpen }: TopBarProps) {
  const logout = useLogout();
  const router = useRouter();
  const { user } = useAuthStore();
  return (
    <div className="w-full bg-white">
      <div className="px-3 py-2 flex items-center justify-between">
        <div className=" hidden xl:flex  items-center space-x-2 ">
          <img
            src="/tempLogo.png"
            alt="Company Logo"
            className="w-14 h-14 rounded-full"
          />
          <p className="emphasized-text">RojgarHub</p>
        </div>
        <div
          className="flex xl:hidden items-center space-x-2 "
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Menu />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden xl:block">
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
                  {user?.username.slice(0, 1)}
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 p-2 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <DropdownMenuLabel className="flex flex-col items-center p-4">
                <div className="w-12 h-12 border flex items-center justify-center rounded-full bg-blue-950 text-white capitalize mb-2">
                  {user?.username.slice(0, 1)}
                </div>
                <h1 className="text-sm font-semibold text-gray-900">
                  {user?.username}
                </h1>
                <p className="text-xs text-gray-500">{user?.role}</p>
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
