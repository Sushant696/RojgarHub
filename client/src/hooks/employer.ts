import { employerApi } from "@/api/employer";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployerById = () => {
  console.log("this is logged");
  return useQuery({
    queryKey: ["employer"],
    queryFn: employerApi.getEmployerById,
    retry: false,
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

export const useGetEmployerApplications = () => {
  return useQuery({
    queryKey: ["employerApplication"],
    queryFn: employerApi.getEmployerApplication,
  });
};
