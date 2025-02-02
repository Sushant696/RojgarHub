import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/utils/imageUpload";
import { useState } from "react";

function PostJob() {
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [jobType, setJobType] = useState<string>();

  return (
    <div className="w-5/6 px-4">
      <div className="m-2">
        <h1 className="text-2xl font-semibold text-gray-700">Post a Job</h1>
      </div>
      <div className="bg-white my-6 rounded-xl p-6 shadow-sm">
        <div className="space-y-6">
          <ImageUpload id="companyLogo" onChange={setCompanyLogo} />

          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="job-title" className="text-gray-700">
              Job Title
            </Label>
            <Input
              id="job-title"
              placeholder="Job Title"
              className="w-full text-gray-700"
            />
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="jobDescription" className="text-gray-700">
              Description
            </Label>
            <Textarea
              id="jobDescription"
              placeholder="Job Description"
              className="w-full text-gray-700"
              rows={4}
            />
          </div>

          {/* Salary Range */}
          <div className="space-y-2">
            <Label htmlFor="salary-range" className="text-gray-700">
              Salary Range
            </Label>
            <Input
              id="salary-range"
              placeholder="Salary Range"
              className="w-full text-gray-700"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-700">
              Location
            </Label>
            <Input
              id="location"
              placeholder="Enter your company location"
              className="w-full text-gray-700"
            />
          </div>
          {/* Job Type (Dropdown) */}
          <div className="space-y-2">
            <Label htmlFor="job-type" className="text-gray-700">
              Job Type
            </Label>
            <Select onValueChange={(value) => setJobType(value)}>
              <SelectTrigger className="w-full text-gray-700">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-gray-700">
              Requirements
            </Label>
            <Textarea
              id="requirements"
              placeholder="Requirements"
              className="w-full text-gray-700"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Post Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
