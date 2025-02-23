import { useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus, ExternalLink } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import EducationForm from "./educationForm";
import ExperienceForm from "./experienceForm";
import SingleDropzone from "../singleDropzone";
import { useCreateApplication } from "@/hooks/application";
import Loading from "../isLoading";
import { SingleDropzonePdf } from "../SingleDropzonePdf";

interface EducationEntry {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface ExperienceEntry {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface JobApplicationFormTypes {
  fullName: string;
  phone: string;
  profilePicture?: string;
  skills: string[];
  location: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  resumeUrl?: string;
  websiteLink?: string;
}

const EditProfileForm = () => {
  const { authenticatedUser } = useAuthStore();
  const applicationMutation = useCreateApplication();

  const [skill, setSkill] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [previewPdf, setPreviewPdf] = useState<boolean>(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const formik = useFormik<JobApplicationFormTypes>({
    initialValues: {
      fullName: authenticatedUser?.fullName || "",
      phone: authenticatedUser?.phone || "",
      profilePicture: authenticatedUser?.profile || null,
      skills: authenticatedUser?.skills || [],
      location: authenticatedUser?.location || "",
      education: authenticatedUser?.education || [],
      experience: authenticatedUser?.experience || [],
      resumeUrl: authenticatedUser?.resumeUrl || null,
      websiteLink: authenticatedUser?.websiteLink || null,
    },
    onSubmit: (values) => {
      formik.resetForm();
      setPreview(null);
    },
  });

  const handleAddSkill = () => {
    if (skill?.trim()) {
      formik.setFieldValue("skills", [...formik.values.skills, skill.trim()]);
      setSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const filteredSkills = formik.values.skills.filter(
      (curr) => curr !== skillToRemove,
    );
    formik.setFieldValue("skills", filteredSkills);
  };

  const handleImageUpload = (file: File | null) => {
    formik.setFieldValue("profilePicture", file);
  };
  const handlePdfUpload = (file: File | null) => {
    formik.setFieldValue("resumeUrl", file);
  };

  if (applicationMutation.isPending) {
    return <Loading />;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      {/* Profile Picture Section */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-600">
          Profile Picture
        </Label>
        <div className="flex gap-4 items-start">
          <div className="w-64">
            <SingleDropzone
              onFileSelect={handleImageUpload}
              preview={preview}
              setPreview={setPreview}
            />
          </div>
          {authenticatedUser.profile && !preview && (
            <div className="w-48">
              <img
                src={formik.values.profilePicture}
                alt={authenticatedUser.fullName}
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="City, Country"
              value={formik.values.location}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={skill}
              placeholder="Add a relevant skill"
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formik.values.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formik.values.skills.map((currSkill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg"
                >
                  <span className="text-sm">{currSkill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(currSkill)}
                    className="text-blue-700 hover:text-red-500 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Education Section */}
      <EducationForm
        formik={formik}
        showEducationForm={showEducationForm}
        setShowEducationForm={setShowEducationForm}
      />

      {/* Experience Section */}
      <ExperienceForm
        formik={formik}
        showExperienceForm={showExperienceForm}
        setShowExperienceForm={setShowExperienceForm}
      />

      {/* Resume Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Resume</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-64">
            <SingleDropzonePdf
              onFileSelect={handlePdfUpload}
              initialFileUrl={authenticatedUser.resumeUrl}
              preview={previewPdf}
              setPreview={setPreviewPdf}
            />
          </div>
          {authenticatedUser.resumeUrl && !previewPdf && (
            <div>
              <a
                href={authenticatedUser.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View Uploaded Resume</span>
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteLink">Portfolio/Personal Website</Label>
        <Input
          id="websiteLink"
          name="websiteLink"
          placeholder="https://yourwebsite.com"
          value={formik.values.websiteLink}
          onChange={formik.handleChange}
        />
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-end">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Submit Application
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
