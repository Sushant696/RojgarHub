import { useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { X, Plus, Upload } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import EducationForm from "./educationForm";
import ExperienceForm from "./experienceForm";

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
  bio: string;
  skills: string[];
  location: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  resumeUrl?: string;
  websiteLink?: string;
}

const JobApplicationForm = ({ jobId }: { jobId: string }) => {
  const [skill, setSkill] = useState<string>("");
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const { authenticatedUser } = useAuthStore();

  const formik = useFormik<JobApplicationFormTypes>({
    initialValues: {
      fullName: authenticatedUser?.fullName || "",
      phone: authenticatedUser?.phone || "",
      profilePicture: authenticatedUser?.profile || "",
      bio: authenticatedUser?.bio || "",
      skills: authenticatedUser?.skills || [],
      location: authenticatedUser?.location || "",
      education: authenticatedUser?.education || [],
      experience: authenticatedUser?.experience || [],
      resumeUrl: authenticatedUser?.resumeUrl || "",
      websiteLink: authenticatedUser?.websiteLink || "",
    },
    onSubmit: (values) => {
      console.log({
        ...values,
      });
      formik.resetForm();
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

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-800">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
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

          {/* Profile Picture Upload */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                {formik.values.profilePicture ? (
                  <img
                    src={formik.values.profilePicture}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Upload className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <Input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                className="flex-1"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const fakeUrl = URL.createObjectURL(file);
                    formik.setFieldValue("profilePicture", fakeUrl);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Skills</h3>
        <div className="space-y-2">
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
            <div className="flex flex-wrap gap-2 mt-2">
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

      {/* Education Section*/}
      <EducationForm
        formik={formik}
        showEducationForm={showEducationForm}
        setShowEducationForm={setShowEducationForm}
      />

      {/* Experience Section*/}
      <ExperienceForm
        formik={formik}
        showExperienceForm={showExperienceForm}
        setShowExperienceForm={setShowExperienceForm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="resumeUrl">Resume</Label>
          <Input
            id="resumeUrl"
            name="resumeUrl"
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const fakeUrl = `resume_${file.name}`;
                formik.setFieldValue("resumeUrl", fakeUrl);
              }
            }}
          />
          <p className="text-xs text-gray-500">
            Upload your resume (PDF or DOCX)
          </p>
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
      </div>

      <div className="w-full flex justify-end">
        <Button type="submit" className=" bg-blue-600 hover:bg-blue-700">
          Submit Application
        </Button>
      </div>
    </form>
  );
};

export default JobApplicationForm;
