import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import {
  CalendarDays,
  MapPin,
  BriefcaseIcon,
  Banknote,
  Clock,
} from "lucide-react";
import { Briefcase, Copy, CopySuccess } from "iconsax-react";
import DOMPurify from "dompurify";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { Button } from "@/components/ui/button";
import useRouter from "@/lib/router";
import { useGetJobById, useJobStatusToggle } from "@/hooks/jobs";
import clsx from "clsx";
import ApplicationsOverview from "@/components/employer/applicationOverview";

function JobDetails() {
  const [copied, setCopied] = useState(false);

  const { jobId } = useParams({
    from: "/employer/job-management/$jobId",
  });
  const { data, isLoading, isError } = useGetJobById(jobId);
  const job = data?.data?.job || {};
  const jobStatusToogle = useJobStatusToggle();

  const router = useRouter();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(job.employerId);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  function handleJobStatusToggle() {
    jobStatusToogle.mutate(job.id);
    router.push("/employer/job-management");
  }

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(job.requirements),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching job data</div>;

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-semibold text-gray-900">
              {job.title}
            </h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  router.push(`/employer/job-management/update/${job.id}`);
                }}
              >
                Edit
              </Button>
              <Button
                className={clsx` ${job.status === "OPEN" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                onClick={handleJobStatusToggle}
              >
                {job.status === "OPEN" ? (
                  <h1>Mark as Closed</h1>
                ) : (
                  <h1>Mark as Open</h1>
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <Badge
              variant="secondary"
              className="text-sm px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {job.status}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Posted {getTimeAgo(job.createdAt)}
            </span>
          </div>
        </div>
        <img
          src={job.image}
          alt={job.title}
          className="w-40 h-32 ml-6 rounded-lg object-cover border border-gray-200 shadow-sm"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-wrap">
                {job.jobDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-wrap">
                <div dangerouslySetInnerHTML={sanitizedData()} />
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Side Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BriefcaseIcon className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Job Type
                    </p>
                    <p className="text-gray-900 capitalize">
                      {job.type.replace("-", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Location
                    </p>
                    <p className="text-gray-900">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Banknote className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Salary Range
                    </p>
                    <p className="text-gray-900">
                      Rs {job.salaryMin.toLocaleString()} -
                      {job.salaryMax.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CalendarDays className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Posted Date
                    </p>
                    <p className="text-gray-900">
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Job ID
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between border p-3 border-gray-300 rounded-lg">
                <p className="text-sm text-gray-600">
                  Job ID:
                  <span className="ml-1 text-black/70">{job.id}</span>
                </p>

                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${
                    copied
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {copied ? (
                    <>
                      <CopySuccess size="20" className="text-green-500" />
                    </>
                  ) : (
                    <>
                      <Copy size="20" className="text-gray-600" />
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <ApplicationsOverview applications={job.applications} />
      </div>
    </div>
  );
}

export default JobDetails;
