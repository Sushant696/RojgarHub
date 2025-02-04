import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit } from "iconsax-react";

function ProfileForm() {
  return (
    <div>
      <div className="">
        <h1 className="regular-text text-lg font-semibold mb-6">
          Profile Form
        </h1>

        <div className=" flex items-end gap-4 space-y-2 mb-4">
          <div className="">
            <Input
              id="companyLogo"
              type="file"
              accept="image/*"
              className="w-full"
            />

          </div>
          <Button className="bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200">
            Create Job
            <Edit size="20" color="white" variant="Bulk" className="ml-2" />
          </Button>
        </div>
        <div className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              className="w-full"
            />
          </div>

          {/* Contact Person Name */}
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person Name</Label>
            <Input
              id="contactPerson"
              placeholder="Enter contact person's name"
              className="w-full"
            />
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Input
              id="companySize"
              type="number"
              placeholder="Enter number of employees"
              className="w-full"
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              placeholder="Enter your industry"
              className="w-full"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter your company location"
              className="w-full"
            />
          </div>

          {/* Company Description */}
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description</Label>
            <Textarea
              id="companyDescription"
              placeholder="Describe your company"
              className="w-full"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
