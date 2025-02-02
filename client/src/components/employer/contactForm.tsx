import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function ContactForm() {
  return (
    <div>
      <div className="bg-white rounded-md p-6 shadow-sm mt-4">
        <h1 className="regular-text text-lg font-semibold mb-6">
          Contact Information
        </h1>

        <div className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="Address">Address</Label>
            <Input
              id="address"
              type="address"
              placeholder="Enter your Address"
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

export default ContactForm;
