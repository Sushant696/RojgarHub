import { Building2, MapPin, Globe, Users, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAuthStore from "@/stores/authStore";
import useRouter from "@/lib/router";

const Company = () => {
  const { authenticatedUser } = useAuthStore();
  const router = useRouter();

  const isProfileComplete = () => {
    const requiredFields = [
      "companyName",
      "location",
      "companySize",
      "profile",
      "companyDescription",
      "industry",
      "websiteLink",
    ];

    return requiredFields.every((field) => authenticatedUser?.[field]);
  };

  if (!isProfileComplete()) {
    return (
      <div className=" bg-gray-50 p-6 flex  justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
          <p className="text-gray-600 mb-4">
            Your profile is incomplete. Please provide the necessary details to
            complete your profile.
          </p>
          <Button
            variant="default"
            onClick={() => {
              router.push("/employer/settings");
            }}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              {authenticatedUser?.companyName}
            </h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {authenticatedUser?.location}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {authenticatedUser?.companySize}+ team members
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              router.push("/employer/settings");
            }}
            className="bg-white/10 hover:bg-white/20"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Info */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <img
              src={authenticatedUser?.profile}
              alt="Company Logo"
              className="w-16 h-16 rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">About Us</h2>
              <p className="text-gray-600">
                {authenticatedUser?.companyDescription}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Company Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-600">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Industry</span>
              </div>
              <p className="text-gray-700">{authenticatedUser?.industry}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-600">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Website</span>
              </div>
              <a
                href={
                  authenticatedUser?.websiteLink?.startsWith("http")
                    ? authenticatedUser.websiteLink
                    : `https://${authenticatedUser?.websiteLink}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600"
              >
                {authenticatedUser?.websiteLink}
              </a>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-gray-700">{authenticatedUser?.location}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-600">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Team Size</span>
              </div>
              <p className="text-gray-700">
                {authenticatedUser?.companySize}+ employees
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Company;
