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

  const handleEdit = () => {
    router.push("/employer/job-management/update/" + job.id);
    console.log("Edit job:", job.id);
  };

  const handleMarkClosed = () => {
    console.log("Mark job as closed:", job.id);
  };

  const handleDelete = () => {
    console.log("Delete job:", job.id);
  };

  return (
    <Card className="group transition-all duration-300 border border-gray-50">
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
                  onClick={handleDelete}
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
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-1 transition-colors">
            {job.title}
          </h3>

          <div className="space-y-3 mb-4">
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
                ${job.salaryMin.toLocaleString()} - $
                {job.salaryMax.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{job.applications.length} </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {job.jobDescription}
          </p>

          <div className="flex justify-end">
            <Button
              variant="outline"
              className="group/button hover:bg-blue-600 hover:text-white transition-all duration-300"
              onClick={() => {
                router.push(job.id);
              }}
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
