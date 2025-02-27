import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { X, Plus } from "lucide-react";

interface EducationEntry {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

function EducationForm({
  formik,
  showEducationForm,
  setShowEducationForm,
}: any) {
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
      (_: any, i: number) => i !== index,
    );
    formik.setFieldValue("education", updatedEducation);
  };

  return (
    <div>
      <div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Education</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowEducationForm(!showEducationForm)}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              {showEducationForm ? "Minimize" : "Maximize"}
            </Button>
          </div>
          {!showEducationForm && formik.values.education.length > 0 && (
            <div className="space-y-4">
              {formik.values.education.map(
                (edu: EducationEntry, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-blue-50 shadow-md rounded-xl border border-blue-100"
                  >
                    <h3 className="text-lg font-semibold">{edu.institution}</h3>
                    <p className="text-sm text-gray-600">
                      {edu.degree} • {edu.fieldOfStudy}
                    </p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ),
              )}
            </div>
          )}
          {showEducationForm && (
            <>
              {formik.values.education.length > 0 && (
                <div className="space-y-6">
                  {formik.values.education.map(
                    (edu: EducationEntry, index: number) => (
                      <div
                        key={index}
                        className="p-4 bg-blue-50 rounded-lg border border-blue-100 relative shadow-sm"
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
                            <Label className="text-blue-700 font-medium">
                              Institution
                            </Label>
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
                              className="bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-blue-700 font-medium">
                              Degree
                            </Label>
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
                              className="bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
                            />
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <Label className="text-blue-700 font-medium">
                            Field of Study
                          </Label>
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
                            className="bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label className="text-blue-700 font-medium">
                              Start Date
                            </Label>
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
                              className="bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-blue-700 font-medium">
                              End Date
                            </Label>
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
                              className="bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
              <div className="flex justify-center mt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddEducation}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </div>
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default EducationForm;
