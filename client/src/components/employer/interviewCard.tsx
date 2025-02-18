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
import { Edit } from "iconsax-react";
import { useDeleteInterview, useUpdateInterview } from "@/hooks/application";
import InterviewScheduler from "./interviewScheduler";

const InterviewCard = ({ interviews, applicationStatus }: any) => {
  const [editingInterviewId, setEditingInterviewId] = useState<string | null>(
    null,
  );

  const deleteInterview = useDeleteInterview();
  const updateInterview = useUpdateInterview();

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

  const handleDelete = (interviewId: string) => {
    deleteInterview.mutate(interviewId);
  };

  return (
    <div className="space-y-4">
      {interviews.map((interview: any) => (
        <Card
          key={interview.id}
          className="bg-white rounded-lg border-t-4 border-t-blue-500/20  shadow-sm"
        >
          <CardHeader className="mb-4 flex flex-row items-center justify-between border-b border-blue-50 bg-blue-50">
            <CardTitle className="text-blue-800 font-semibold flex items-center gap-2">
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
                <DropdownMenuItem
                  onClick={() => setEditingInterviewId(interview.id)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Interview
                </DropdownMenuItem>

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
          {editingInterviewId === interview.id ? (
            <div className="p-6 border-t border-gray-100">
              <InterviewScheduler
                applicationId={interview.applicationId}
                applicationStatus={applicationStatus}
                interviewData={{
                  scheduledAt: interview.scheduledAt,
                  time: interview.time,
                  location: interview.location,
                  notes: interview.notes,
                }}
                onCancel={() => setEditingInterviewId(null)}
                onSave={(data) => {
                  updateInterview.mutate({ id: interview.id, data });
                  setEditingInterviewId(null);
                }}
              />
            </div>
          ) : (
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm lg:text-base">
                  {interview.location}
                </span>
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
          )}
        </Card>
      ))}
    </div>
  );
};

export default InterviewCard;
