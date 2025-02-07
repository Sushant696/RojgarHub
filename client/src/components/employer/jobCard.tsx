import {
  MapPin,
  BriefcaseIcon,
  DollarSign,
  Users,
  ArrowRight,
  MoreVertical,
  Pencil,
  XCircle,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useRouter from "@/lib/router";
import { useDeleteJob, useJobStatusToggle } from "@/hooks/jobs";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    image: string;
    location: string;
    type: string;
    salaryMin: number;
    salaryMax: number;
    jobDescription: string;
    applications: [];
    createdAt: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  const router = useRouter();
  const jobToggle = useJobStatusToggle();
  const jobDelete = useDeleteJob();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    router.push("/employer/job-management/update/" + job.id);
  };

  const handleMarkClosed = async () => {
    jobToggle.mutate(job.id);
  };

  const handleDelete = () => {
    console.log("delete");
    jobDelete.mutate(job.id);
    setShowDeleteConfirm(false);
  };

  if (showDeleteConfirm) {
    return (
      <Card className="relative border border-red-100 bg-red-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Delete Job Posting?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="w-24"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="w-24"
              >
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={job.image}
            alt={job.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm shadow-sm"
            >
              {getTimeAgo(job.createdAt)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Job
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleMarkClosed}
                  className="cursor-pointer"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Mark as Closed
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{job.location}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <BriefcaseIcon className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm capitalize">
                {job.type.replace("-", " ")}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">
                ${job?.salaryMin?.toLocaleString()} - $
                {job.salaryMax.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">
                {job.applications.length} Application
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {job.jobDescription}
          </p>

          <div className="flex justify-end">
            <Button
              variant="outline"
              className="group/button hover:bg-blue-600 hover:text-white transition-all duration-300"
              onClick={() => router.push(job.id)}
            >
              View Applications
              <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
