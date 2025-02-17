import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, MoreVertical, Trash } from "lucide-react";
import { ApplicationStatus, ApplicationStatusValues } from "@/types/job";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "iconsax-react";
import { useDeleteInterview } from "@/hooks/application";

const InterviewCard = ({ interviews }: any) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const { mutate } = useDeleteInterview();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatusValues.REVIEWING:
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case ApplicationStatusValues.ACCEPTED:
        return "bg-green-50 text-green-600 border-green-200";
      case ApplicationStatusValues.REJECTED:
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-blue-50 text-blue-600 border-blue-200";
    }
  };

  const handleUpdate = (interviewId: string, data: any) => {
    // TODO: Implement update logic
    console.log("Updating interview:", interviewId, data);
    setOpenDialog(null);
  };

  const handleDelete = (interviewId: string) => {
    // TODO: Implement delete logic
    mutate(interviewId);
    console.log("Deleting interview:", interviewId);
  };

  return (
    <div className="space-y-4">
      {interviews.map((interview: any) => (
        <Card
          key={interview.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-800 font-semibold flex items-center gap-2">
              Interview Details
              <Badge
                variant="secondary"
                className={`${getStatusColor(interview.status)} px-2 py-0.5`}
              >
                {interview.status}
              </Badge>
            </CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Dialog
                  open={openDialog === interview.id}
                  onOpenChange={(open) =>
                    setOpenDialog(open ? interview.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Interview
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Interview Details</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const data = {
                          location: formData.get("location"),
                          scheduledAt: formData.get("scheduledAt"),
                          time: formData.get("time"),
                          notes: formData.get("notes"),
                        };
                        handleUpdate(interview.id, data);
                      }}
                      className="space-y-4 pt-4"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          name="location"
                          defaultValue={interview.location}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Input
                          type="date"
                          name="scheduledAt"
                          defaultValue={
                            new Date(interview.scheduledAt)
                              .toISOString()
                              .split("T")[0]
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Time</label>
                        <Input
                          type="time"
                          name="time"
                          defaultValue={interview.time}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea
                          name="notes"
                          defaultValue={interview.notes}
                          className="w-full min-h-[100px]"
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setOpenDialog(null)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => handleDelete(interview.id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Interview
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm lg:text-base">{interview.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm lg:text-base">
                {formatDate(interview.scheduledAt)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm lg:text-base">{interview.time}</span>
            </div>
            {interview.notes && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {interview.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InterviewCard;
