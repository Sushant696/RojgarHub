import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/auth";
import useRouter from "@/lib/router";
import useAuthStore from "@/stores/authStore";
import { ProfileCircle, Setting3 } from "iconsax-react";

function Profile() {
  const logout = useLogout();
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 border flex items-center justify-center rounded-full bg-blue-950 text-white capitalize hover:bg-blue-900 transition-colors duration-200">
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
            onClick={() => router.push("/candidate/company")}
            className="flex items-center text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <ProfileCircle variant="Bulk" size={16} className="text-gray-600" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/candidate/settings")}
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
  );
}

export default Profile;
