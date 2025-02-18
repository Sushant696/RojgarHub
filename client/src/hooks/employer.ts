import { employerApi } from "@/api/employer";
import DisplayErrorToast from "@/utils/displayErrorMessage";
import showNotification from "@/utils/toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetEmployerById = () => {
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

export const useUpdateEmployer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employerId,
      updateData,
    }: {
      employerId: string;
      updateData: any;
    }) => employerApi.updateEmployer(employerId, updateData),
    onSuccess: () => {
      showNotification("success", "Profile updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["application"] });
      queryClient.invalidateQueries({ queryKey: ["employer"] });
    },
    onError: (error: any) => {
      DisplayErrorToast(error);
    },
    retry: false,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employerId,
      updateData,
    }: {
      employerId: string;
      updateData: any;
    }) => employerApi.updateEmployer(employerId, updateData),
    onSuccess: () => {
      showNotification("success", "Profile updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["application"] });
      queryClient.invalidateQueries({ queryKey: ["employer"] });
    },
    onError: (error: any) => {
      DisplayErrorToast(error);
    },
    retry: false,
  });
};
