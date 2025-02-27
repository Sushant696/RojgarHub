import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceEntry {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
}

function ExperienceForm({
  formik,
  showExperienceForm,
  setShowExperienceForm,
}: any) {
  const handleAddExperience = () => {
    const newExperience: ExperienceEntry = {
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      currentJob: false,
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
    value: string | boolean,
  ) => {
    const updatedExperience = [...formik.values.experience];
    updatedExperience[index][field] = value;

    if (field === "currentJob" && value === true) {
      updatedExperience[index].endDate = "";
    }

    formik.setFieldValue("experience", updatedExperience);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = formik.values.experience.filter(
      (_: any, i: number) => i !== index,
    );
    formik.setFieldValue("experience", updatedExperience);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowExperienceForm(!showExperienceForm)}
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          {showExperienceForm ? "Minimize" : "Maximize"}
        </Button>
      </div>

      {!showExperienceForm && formik.values.experience.length > 0 && (
        <div className="space-y-4">
          {formik.values.experience.map(
            (exp: ExperienceEntry, index: number) => (
              <div
                key={index}
                className="p-4 bg-blue-50 shadow-md rounded-xl border border-blue-100"
              >
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <p className="text-sm text-gray-600">
                  {exp.position} • {exp.startDate} -{" "}
                  {exp.currentJob ? "Present" : exp.endDate}
                </p>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </div>
            ),
          )}
        </div>
      )}

      {showExperienceForm && (
        <>
          {formik.values.experience.length > 0 && (
            <div className="space-y-6">
              {formik.values.experience.map(
                (exp: ExperienceEntry, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100 relative"
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
                          className="bg-white "
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
                          className="bg-white "
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
                        className="resize-none bg-white"
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
                          className="bg-white "
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
                          disabled={exp.currentJob}
                          className="bg-white "
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center space-x-2">
                      <Checkbox
                        id={`current-job-${index}`}
                        checked={exp.currentJob}
                        onCheckedChange={(checked: boolean) =>
                          handleUpdateExperience(
                            index,
                            "currentJob",
                            checked === true,
                          )
                        }
                      />
                      <Label
                        htmlFor={`current-job-${index}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        This is my current job
                      </Label>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </>
      )}
      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddExperience}
          className="text-blue-600 border-blue-600 hover:bg-blue-50 "
        >
          <Plus className="h-4 w-4 mr-2" /> Add Experience
        </Button>
      </div>
    </div>
  );
}

export default ExperienceForm;
