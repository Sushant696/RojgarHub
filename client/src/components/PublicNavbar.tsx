import { Link } from "@tanstack/react-router";
import {
  Menu,
  Home,
  Briefcase,
  Mail,
  LogIn,
  UserPlus,
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
import { cn } from "@/lib/utils";
import useRouter from "@/lib/router";

interface NavLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "button";
}

const NavLink = ({
  to,
  icon: Icon,
  children,
  onClick,
  className = "",
  variant = "default",
}: NavLinkProps) => {
  const content = (
    <>
      <Icon className={`h-5 w-5 text-slate-600 ${className}`} />
      <span className="text-slate-700">{children}</span>
    </>
  );

  return (
    <SheetClose asChild>
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
          variant === "default"
            ? "hover:bg-slate-100 [&.active]:bg-slate-100 [&.active]:font-medium"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          className,
        )}
      >
        {content}
      </Link>
    </SheetClose>
  );
};

function PublicNavbar() {
  const router = useRouter();
  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="none md:container md:mx-auto">
        <div className="flex justify-between items-center py-5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <img src="/tempLogo.png" className="w-12 h-12" alt="temp logo" />
            <span className="font-semibold medium-text hidden sm:block">
              RojgarHub
            </span>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button>
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent className="w-[300px]">
                <SheetHeader
                  onClick={() => {
                    router.push("/");
                  }}
                  className="pb-4"
                >
                  <SheetTitle className="flex items-center gap-2">
                    <img
                      src="/tempLogo.png"
                      className="w-8 h-8"
                      alt="temp logo"
                    />
                    <span>RojgarHub</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-1">
                  <NavLink to="/" icon={Home}>
                    Home
                  </NavLink>
                  <NavLink to="/apply" icon={Briefcase}>
                    Apply
                  </NavLink>
                  <NavLink to="/contact" icon={Mail}>
                    Contact
                  </NavLink>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col gap-2">
                  <NavLink to="/register" icon={UserPlus}>
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    icon={LogIn}
                    variant="button"
                    className="bg-blue-600 hover:bg-blue-600 text-white"
                  >
                    <p className="text-white">Login</p>
                  </NavLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-900 transition-colors [&.active]:text-blue-600 [&.active]:font-medium"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="/apply"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-900 transition-colors [&.active]:text-blue-600 [&.active]:font-medium"
              >
                <Briefcase className="h-4 w-4" />
                Apply
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-900 transition-colors [&.active]:text-blue-600 [&.active]:font-medium"
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </nav>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-4">
              <Link
                to="/register"
                className="text-slate-700 hover:text-slate-900 transition-colors"
              >
                Register
              </Link>
              <Link to="/login">
                <Button className="bg-blue-600">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicNavbar;
