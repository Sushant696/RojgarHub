import { employerApi } from "@/api/employer";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployerById = (jobId: string) => {
  return useQuery({
    queryKey: ["jobById", jobId],
    queryFn: () => employerApi.getEmployerById(jobId),
    enabled: !!jobId,
  });
};

export const useGetEmployerJobs = () => {
  return useQuery({
    queryKey: ["employerJobs"],
    queryFn: employerApi.getAllJobs,
  });
};

export const useGetEmployerCandidates = () => {
  return useQuery({
    queryKey: ["employerCandidates"],
    queryFn: employerApi.getCandidateByEmployer,
  });
};
