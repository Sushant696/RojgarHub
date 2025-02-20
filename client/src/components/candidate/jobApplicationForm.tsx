import { useState } from "react";
import { useFormik } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Upload } from "lucide-react";

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

const JobApplicationForm = ({
  jobId,
  candidateId,
}: {
  jobId: string;
  candidateId: string;
}) => {
  const [skill, setSkill] = useState<string>("");
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const formik = useFormik<JobApplicationFormTypes>({
    initialValues: {
      fullName: "",
      phone: "",
      profilePicture: "",
      bio: "",
      skills: [],
      location: "",
      education: [],
      experience: [],
      resumeUrl: "",
      websiteLink: "",
    },
    onSubmit: (values) => {
      // Here you would submit the form with jobId and candidateId included
      console.log({
        ...values,
        jobId,
        candidateId,
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

  const handleAddEducation = () => {
    const newEducation: EducationEntry = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    };
    formik.setFieldValue("education", [
      ...formik.values.education,
      newEducation,
    ]);
    setShowEducationForm(true);
  };

  const handleUpdateEducation = (
    index: number,
    field: keyof EducationEntry,
    value: string,
  ) => {
    const updatedEducation = [...formik.values.education];
    updatedEducation[index][field] = value;
    formik.setFieldValue("education", updatedEducation);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = formik.values.education.filter(
      (_, i) => i !== index,
    );
    formik.setFieldValue("education", updatedEducation);
  };

  const handleAddExperience = () => {
    const newExperience: ExperienceEntry = {
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
    };
    formik.setFieldValue("experience", [
      ...formik.values.experience,
      newExperience,
    ]);
    setShowExperienceForm(true);
  };

  const handleUpdateExperience = (
    index: number,
    field: keyof ExperienceEntry,
    value: string,
  ) => {
    const updatedExperience = [...formik.values.experience];
    updatedExperience[index][field] = value;
    formik.setFieldValue("experience", updatedExperience);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = formik.values.experience.filter(
      (_, i) => i !== index,
    );
    formik.setFieldValue("experience", updatedExperience);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">
              Complete Your Job Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                    {formik.values.profilePicture ? (
                      <img
                        src={formik.values.profilePicture}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <Input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    className="max-w-xs"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // In a real app, you'd upload this to a server and get a URL back
                        const fakeUrl = URL.createObjectURL(file);
                        formik.setFieldValue("profilePicture", fakeUrl);
                      }
                    }}
                  />
                </div>
              </div>
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

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

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself and your professional background"
                    rows={4}
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    className="resize-none"
                  />
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

              {/* Education Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Education</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddEducation}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Add Education
                  </Button>
                </div>

                {formik.values.education.length > 0 && (
                  <div className="space-y-6">
                    {formik.values.education.map((edu, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Institution</Label>
                            <Input
                              placeholder="University or School Name"
                              value={edu.institution}
                              onChange={(e) =>
                                handleUpdateEducation(
                                  index,
                                  "institution",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input
                              placeholder="Bachelor's, Master's, etc."
                              value={edu.degree}
                              onChange={(e) =>
                                handleUpdateEducation(
                                  index,
                                  "degree",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <Label>Field of Study</Label>
                          <Input
                            placeholder="Computer Science, Business, etc."
                            value={edu.fieldOfStudy}
                            onChange={(e) =>
                              handleUpdateEducation(
                                index,
                                "fieldOfStudy",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              type="date"
                              value={edu.startDate}
                              onChange={(e) =>
                                handleUpdateEducation(
                                  index,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="date"
                              value={edu.endDate}
                              onChange={(e) =>
                                handleUpdateEducation(
                                  index,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Work Experience</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddExperience}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Add Experience
                  </Button>
                </div>

                {formik.values.experience.length > 0 && (
                  <div className="space-y-6">
                    {formik.values.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                              placeholder="Company Name"
                              value={exp.company}
                              onChange={(e) =>
                                handleUpdateExperience(
                                  index,
                                  "company",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Position</Label>
                            <Input
                              placeholder="Job Title"
                              value={exp.position}
                              onChange={(e) =>
                                handleUpdateExperience(
                                  index,
                                  "position",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements"
                            rows={3}
                            value={exp.description}
                            onChange={(e) =>
                              handleUpdateExperience(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                            className="resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              type="date"
                              value={exp.startDate}
                              onChange={(e) =>
                                handleUpdateExperience(
                                  index,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="date"
                              value={exp.endDate}
                              onChange={(e) =>
                                handleUpdateExperience(
                                  index,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
                  <Label htmlFor="websiteLink">
                    Portfolio/Personal Website
                  </Label>
                  <Input
                    id="websiteLink"
                    name="websiteLink"
                    placeholder="https://yourwebsite.com"
                    value={formik.values.websiteLink}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobApplicationForm;
