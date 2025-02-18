import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, MapPin, CalendarDays, MessageSquare, Info } from "lucide-react";
import { ApplicationStatus } from "@/types/job";
import { useInterviewScheduler } from "@/hooks/application";

interface InterviewSchedulerProps {
  applicationId: string;
  applicationStatus: ApplicationStatus;
  interviewData?: {
    scheduledAt: string;
    time: string;
    location: string;
    notes?: string;
  };
  onSave?: (data: any) => void; // Callback for saving
  onCancel?: () => void; // Callback for canceling
}

const InterviewScheduler = ({
  applicationId,
  applicationStatus,
  interviewData,
  onSave,
  onCancel,
}: InterviewSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(interviewData?.scheduledAt) || new Date(),
  );
  const [time, setTime] = useState(interviewData?.time || "");
  const [location, setLocation] = useState(interviewData?.location || "");
  const [notes, setNotes] = useState(interviewData?.notes || "");
  const interviewScheduler = useInterviewScheduler();

  const handleScheduleInterview = () => {
    if (!selectedDate || !time || !location) {
      return;
    }

    const interviewObj = {
      scheduledAt: new Date(selectedDate).toISOString(),
      time,
      location,
      notes,
    };

    if (onSave) {
      onSave(interviewObj);
    } else {
      interviewScheduler.mutate({ applicationId, interviewObj });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    const [hours, minutes] = timeValue.split(":");
    const selectedDateTime = new Date(selectedDate || new Date());
    selectedDateTime.setHours(parseInt(hours, 10));
    selectedDateTime.setMinutes(parseInt(minutes, 10));

    if (selectedDateTime < new Date()) {
      alert("Please select a future time.");
      return;
    }

    setTime(timeValue);
  };

  return (
    <Card className="border-t-4 border-t-blue-500/20 shadow-sm">
      <CardHeader className="bg-blue-50/50">
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          <span>{interviewData ? "Edit Interview" : "Schedule Interview"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {" "}
        {/* Info Callout */}
        {applicationStatus !== "ACCEPTED" && (
          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              You can only schedule interviews with candidates whose
              applications are <span className="font-semibold">accepted</span>.
            </p>
          </div>
        )}
        {/* Date Picker */}
        <div className="space-y-4">
          <div className="flex justify-center p-4">
            <div className="border border-gray-200 w-full rounded-lg p-3 bg-white shadow-sm">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md w-full"
                classNames={{
                  day_selected: "bg-blue-600 text-white hover:bg-blue-600",
                  day_today: "bg-blue-50 text-blue-900",
                }}
                disabled={applicationStatus !== "ACCEPTED"}
              />
            </div>
          </div>{" "}
        </div>
        {/* Time Input */}
        <div className="space-y-2">
          <Label
            htmlFor="interview-time"
            className="text-gray-800 font-medium flex items-center gap-2"
          >
            <Clock className="w-4 h-4 text-blue-600" />
            Select Time
          </Label>
          <Input
            id="interview-time"
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            disabled={applicationStatus !== "ACCEPTED"}
          />
        </div>
        {/* Location Input */}
        <div className="space-y-2">
          <Label
            htmlFor="interview-location"
            className="text-gray-800 font-medium flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            Location
          </Label>
          <Input
            id="interview-location"
            placeholder="Office address or video call link"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            disabled={applicationStatus !== "ACCEPTED"}
          />
        </div>
        {/* Additional Notes */}
        <div className="space-y-2">
          <Label
            htmlFor="interview-notes"
            className="text-gray-800 font-medium flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            Additional Notes
          </Label>
          <Textarea
            id="interview-notes"
            placeholder="Add any special instructions or agenda points..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-24 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            disabled={applicationStatus !== "ACCEPTED"}
          />
        </div>
        {/* Schedule Button */}
        <div className="flex gap-2">
          <Button
            onClick={handleScheduleInterview}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition-colors"
            disabled={
              !selectedDate ||
              !time ||
              !location ||
              applicationStatus !== "ACCEPTED"
            }
          >
            {interviewData ? "Save Changes" : "Schedule Interview"}
          </Button>
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewScheduler;
