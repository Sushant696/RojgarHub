import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SingleDropzone from "../singleDropzone";
import { useUpdateEmployer } from "@/hooks/employer";
import Loading from "../isLoading";

const profileSchema = Yup.object({
  companyName: Yup.string()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
  companySize: Yup.number()
    .required("Company size is required")
    .positive("Must be a positive number")
    .integer("Must be a whole number"),
  industry: Yup.string().required("Industry is required"),
  location: Yup.string().required("Location is required"),
  companyDescription: Yup.string()
    .min(50, "Description must be at least 50 characters")
    .required("Company description is required"),
  websiteLink: Yup.string().url("Must be a valid URL"),
});

const ProfileForm = ({ employer }: any) => {
  const [preview, setPreview] = useState(employer.profile);
  const updateMutation = useUpdateEmployer();

  const formik = useFormik({
    initialValues: {
      profile: employer.profile || "",
      companyName: employer.companyName || "",
      companySize: employer.companySize || "",
      industry: employer.industry || "",
      websiteLink: employer.websiteLink || "",
      location: employer.location || "",
      companyDescription: employer.companyDescription || "",
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      updateMutation.mutate({ employerId: employer.id, updateData: values });
    },
  });

  if (updateMutation.isPending) {
    return <Loading />;
  }

  const handleImageUpload = (file: File | null) => {
    formik.setFieldValue("profile", file);
  };

  return (
    <Card className="border border-blue-100 shadow-lg shadow-blue-50">
      <CardHeader className="border-b border-blue-50 bg-gradient-to-r from-blue-50/50 to-transparent">
        <CardTitle className="text-2xl font-bold text-blue-950">
          Company Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
          <div className="space-y-2 w-full lg:w-auto">
            <Label className="text-sm font-medium text-blue-900">
              Employer Image
            </Label>
            <div className="flex gap-4 items-start flex-wrap">
              <div className="w-full sm:w-80">
                <SingleDropzone
                  onFileSelect={handleImageUpload}
                  preview={preview}
                  setPreview={setPreview}
                />
              </div>
              {employer.profile && !preview && (
                <div className="w-full sm:w-48">
                  <img
                    src={employer.profile}
                    alt={employer.companyName}
                    className="w-full h-48 object-cover rounded-lg border border-blue-100"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-blue-900">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                onChange={formik.handleChange}
                value={formik.values.companyName}
                className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.companyName)}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteLink" className="text-blue-900">
                Website URL
              </Label>
              <Input
                id="websiteLink"
                name="websiteLink"
                placeholder="https://your-company.com"
                onChange={formik.handleChange}
                value={formik.values.websiteLink}
                className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
              />
              {formik.touched.websiteLink && formik.errors.websiteLink && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.websiteLink)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize" className="text-blue-900">
                Company Size
              </Label>
              <Input
                id="companySize"
                name="companySize"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.companySize}
                className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
              />
              {formik.touched.companySize && formik.errors.companySize && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.companySize)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" className="text-blue-900">
                Industry
              </Label>
              <Input
                id="industry"
                name="industry"
                onChange={formik.handleChange}
                value={formik.values.industry}
                className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
              />
              {formik.touched.industry && formik.errors.industry && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.industry)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-blue-900">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
                className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.location)}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyDescription" className="text-blue-900">
              Company Description
            </Label>
            <Textarea
              id="companyDescription"
              name="companyDescription"
              rows={6}
              onChange={formik.handleChange}
              value={formik.values.companyDescription}
              className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
            />
            {formik.touched.companyDescription &&
              formik.errors.companyDescription && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.companyDescription)}
                </div>
              )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="min-w-[120px] bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default ProfileForm;
