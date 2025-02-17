import { useUpdateApplicationStatus } from "@/hooks/application";
import { ApplicationStatus } from "@/types/job";
import { Dispatch, SetStateAction } from "react";
import { Check, X, Clock, Circle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StatusToggleProps {
  setShowStatusOptions: Dispatch<SetStateAction<boolean>>;
  showStatusOptions: boolean;
  dataObj: {
    applicationId: string;
    candidateId: string;
    jobId: string;
  };
  currentStatus: ApplicationStatus; 
}

function StatusToggle({
  showStatusOptions,
  setShowStatusOptions,
  dataObj,
  currentStatus,
}: StatusToggleProps) {
  const { mutate } = useUpdateApplicationStatus();

  const handleChangeApplicationStatus = (
    status: ApplicationStatus,
    applicationId: string,
    candidateId: string,
    jobId: string,
  ) => {
    mutate({ applicationId, candidateId, status, jobId });
    setShowStatusOptions(false); // Close dropdown after selection
  };

  const statusStyles = {
    PENDING: {
      color: "bg-yellow-50 text-yellow-600",
      icon: <Clock className="w-4 h-4" />,
    },
    ACCEPTED: {
      color: "bg-green-50 text-green-600",
      icon: <Check className="w-4 h-4" />,
    },
    REVIEWING: {
      color: "bg-blue-50 text-blue-600",
      icon: <Circle className="w-4 h-4" />,
    },
    REJECTED: {
      color: "bg-red-50 text-red-600",
      icon: <X className="w-4 h-4" />,
    },
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setShowStatusOptions(!showStatusOptions)}
      >
        <span>Status:</span>
        <Badge className={statusStyles[currentStatus].color}>
          {statusStyles[currentStatus].icon}
          <span className="ml-1">{currentStatus}</span>
        </Badge>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {/* Dropdown Options */}
      {showStatusOptions && (
        <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
          {["PENDING", "ACCEPTED", "REVIEWING", "REJECTED"].map((value) => (
            <button
              key={value}
              onClick={() =>
                handleChangeApplicationStatus(
                  value as ApplicationStatus,
                  dataObj.applicationId,
                  dataObj.candidateId,
                  dataObj.jobId,
                )
              }
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              {statusStyles[value as ApplicationStatus].icon}
              <span>{value}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusToggle;
