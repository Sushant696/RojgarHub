import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function SocialMediaform() {
  return (
    <div>
      <div className="">
        <h1 className="regular-text text-lg font-semibold mb-6">
          Social Media Links
        </h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/company"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter URL</Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/company"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteLink">Website URL</Label>
            <Input
              id="websiteLink"
              placeholder="https://yourcompany.com"
              className="w-full"
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

export default SocialMediaform;
