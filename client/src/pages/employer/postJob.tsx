import { useFormik } from "formik";
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
import { SingleDropzone } from "@/components/singleDropzone";
import jobPostingSchema from "@/validators/jobValidators";
import RichText from "@/components/ui/richText";
import { useState } from "react";
import { usePostJob } from "@/hooks/jobs";
import Loading from "@/components/isLoading";
import { Building2, MapPin, Briefcase, DollarSign } from "lucide-react";

function PostJob() {
  const [preview, setPreview] = useState<string | null>(null);
  const postJob = usePostJob();
  const formik = useFormik({
    initialValues: {
      image: null,
      title: "",
      jobDescription: "",
      salaryMin: 0,
      salaryMax: 0,
      location: "",
      type: "",
      requirements: "",
    },
    validationSchema: jobPostingSchema,
    onSubmit: (values) => {
      postJob.mutate(values);
      setPreview(null);
      formik.resetForm();
    },
  });

  if (postJob.isPending) {
    return <Loading />;
  }

  const handleImageUpload = (file: File | null) => {
    formik.setFieldValue("image", file);
  };

  return (
    <div className=" mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-2">
        <h1 className="medium-text font-medium text-gray-800">Post a Job</h1>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Company Branding Section */}
          <div className="w-full max-w-xs">
            <Label
              htmlFor="image"
              className="text-sm font-medium text-gray-600 mb-2 block"
            >
              Job Image
            </Label>
            <SingleDropzone
              onFileSelect={handleImageUpload}
              preview={preview}
              setPreview={setPreview}
            />
          </div>

          {/* Basic Job Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-600"
              >
                Job Title*
              </Label>
              <Input
                id="title"
                placeholder="e.g. Senior Software Engineer"
                onChange={formik.handleChange}
                value={formik.values.title}
                className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-400 text-sm">
                  {formik.errors.title}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="type"
                className="text-sm font-medium text-gray-600"
              >
                Employment Type*
              </Label>
              <Select
                onValueChange={(value) => formik.setFieldValue("type", value)}
                value={formik.values.type}
              >
                <SelectTrigger className="w-full border-gray-200">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.type && formik.errors.type && (
                <div className="text-red-400 text-sm">{formik.errors.type}</div>
              )}
            </div>
          </div>

          {/* Salary Range */}
          <div className="space-y-2">
            <Label
              htmlFor="salaryMin"
              className="text-sm font-medium text-gray-600"
            >
              Salary Range*
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="salaryMin"
                  placeholder="Minimum"
                  type="number"
                  className="pl-10 border-gray-200"
                  onChange={formik.handleChange}
                  value={formik.values.salaryMin}
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="salaryMax"
                  placeholder="Maximum"
                  type="number"
                  className="pl-10 border-gray-200"
                  onChange={formik.handleChange}
                  value={formik.values.salaryMax}
                />
              </div>
            </div>
            {formik.touched.salaryMin && formik.errors.salaryMin && (
              <div className="text-red-400 text-sm">
                {formik.errors.salaryMin}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-sm font-medium text-gray-600"
            >
              Location*
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="location"
                placeholder="e.g. San Francisco, CA (or Remote)"
                className="pl-10 border-gray-200"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
            </div>
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-400 text-sm">
                {formik.errors.location}
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label
              htmlFor="jobDescription"
              className="text-sm font-medium text-gray-600"
            >
              Job Description*
            </Label>
            <Textarea
              id="jobDescription"
              placeholder="Describe the role, responsibilities, and ideal candidate..."
              className="min-h-[150px] border-gray-200"
              onChange={formik.handleChange}
              value={formik.values.jobDescription}
            />
            {formik.touched.jobDescription && formik.errors.jobDescription && (
              <div className="text-red-400 text-sm">
                {formik.errors.jobDescription}
              </div>
            )}
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label
              htmlFor="requirements"
              className="text-sm font-medium text-gray-600"
            >
              Requirements & Qualifications*
            </Label>
            <RichText
              value={formik.values.requirements}
              height={400}
              onChange={(content) =>
                formik.setFieldValue("requirements", content)
              }
            />
            {formik.touched.requirements && formik.errors.requirements && (
              <div className="text-red-400 text-sm">
                {formik.errors.requirements}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg transition-colors"
              disabled={postJob.isPending}
            >
              {postJob.isPending ? (
                <div className="flex items-center space-x-2">
                  <span className="animate-spin">⋅</span>
                  <span>Posting...</span>
                </div>
              ) : (
                "Post Job"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
