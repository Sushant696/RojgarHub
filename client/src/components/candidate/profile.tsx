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
import { User, Settings, LogOut, Bell, Shield, HelpCircle } from "lucide-react";

function ProfileModal() {
  const logout = useLogout();
  const router = useRouter();
  const { user, authenticatedUser } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10 rounded-full ring-2 ring-primary/10 overflow-hidden">
            {authenticatedUser.profile ? (
              <img
                src={authenticatedUser.profile}
                alt={authenticatedUser.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center text-lg font-medium text-primary-foreground">
                {user?.username.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 p-2">
        <DropdownMenuLabel className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-full ring-2 ring-primary/10 overflow-hidden">
              {authenticatedUser.profile ? (
                <img
                  src={authenticatedUser.profile}
                  alt={authenticatedUser.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary flex items-center justify-center text-xl font-medium text-primary-foreground">
                  {user?.username.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-base">{user?.username}</h3>
              <p className="text-sm text-muted-foreground">
                {user?.role.toLowerCase()}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuItem
            onClick={() => router.push("/candidate/profile")}
            className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>View Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push("/candidate/settings")}
            className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer">
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuItem
            onClick={() => logout.mutate()}
            className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileModal;
