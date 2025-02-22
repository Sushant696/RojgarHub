import { Link } from "@tanstack/react-router";
import {
  Menu,
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ProfileModal from "./profile";

interface NavLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "button";
}

function NavLink({ to, icon: Icon, children, onClick }: NavLinkProps) {
  return (
    <SheetClose asChild>
      <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors [&.active]:bg-blue-50 [&.active]:text-blue-700 group"
      >
        <Icon className="h-5 w-5 text-blue-600/70 group-hover:text-blue-600" />
        <span className="text-slate-700 group-hover:text-blue-700">
          {children}
        </span>
      </Link>
    </SheetClose>
  );
}

function CandidateNavbar() {
  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-blue-100">
      <div className="container">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-2">
            <img src="/tempLogo.png" className="w-12 h-12" alt="temp logo" />
            <span className="font-semibold text-xl hidden sm:block text-blue-950">
              JobPortal
            </span>
          </div>

          {/* Mobile Sheet Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] border-l border-blue-100">
                <SheetHeader className="pb-4">
                  <SheetTitle className="flex items-center gap-2 text-blue-950">
                    <img
                      src="/tempLogo.png"
                      className="w-8 h-8"
                      alt="temp logo"
                    />
                    <span>JobPortal</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-1">
                  <NavLink to="/candidate/dashboard" icon={LayoutDashboard}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/apply" icon={Briefcase}>
                    Find Jobs
                  </NavLink>
                  <NavLink to="/candidate/application" icon={ClipboardList}>
                    My Applications
                  </NavLink>
                </div>

                <Separator className="my-4 bg-blue-100" />

                <div className="flex flex-col gap-1">
                  <NavLink to="/candidate/notifications" icon={Bell}>
                    Notifications
                  </NavLink>
                  <NavLink to="/candidate/settings" icon={Settings}>
                    Settings
                  </NavLink>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <Separator className="mb-4 bg-blue-100" />
                  <div className="flex items-center justify-between">
                    <ProfileModal />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <Link
                to="/candidate/dashboard"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-colors [&.active]:text-blue-700 [&.active]:font-medium group"
              >
                <LayoutDashboard className="h-4 w-4  group-hover:text-blue-600" />
                Dashboard
              </Link>
              <Link
                to="/apply"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-colors [&.active]:text-blue-700 [&.active]:font-medium group"
              >
                <Briefcase className="h-4 w-4  group-hover:text-blue-600" />
                Find Jobs
              </Link>
              <Link
                to="/candidate/application"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-colors [&.active]:text-blue-700 [&.active]:font-medium group"
              >
                <ClipboardList className="h-4 w-4  group-hover:text-blue-600" />
                My Applications
              </Link>
            </nav>

            <Separator orientation="vertical" className="h-6 bg-blue-100" />

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Bell className="h-5 w-5"  />
              </Button>
              <ProfileModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateNavbar;
