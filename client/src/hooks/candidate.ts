import { candidateAction } from "@/api/candidate";
import useAuthStore from "@/stores/authStore";
import showNotification from "@/utils/toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCandidateById = () => {
  return useQuery({
    queryKey: ["candidate"],
    queryFn: candidateAction.getCandidateById,
    retry: false,
    refetchOnMount: true,
  });
};
export const useGetCandidateApplications = () => {
  return useQuery({
    queryKey: ["candidateApplication"],
    queryFn: candidateAction.getCandidateApplications,
    retry: 1,
  });
};

export const useGetDashboardData = (candidateId: string) => {
  return useQuery({
    queryKey: ["candidate"],
    queryFn: () => candidateAction.getCandidateDashboardData(candidateId),
    retry: 1,
  });
};

export const useEditCandidate = () => {
  const queryClient = useQueryClient();
  const { setAuthenticatedUser } = useAuthStore();
  return useMutation({
    mutationFn: ({ candidateData }: { candidateData: any }) =>
      candidateAction.editCandidateProfile(candidateData),
    onSuccess: (response) => {
      setAuthenticatedUser(response?.data?.candidate);
      showNotification("success", response?.message);
      queryClient.invalidateQueries({ queryKey: ["candidate"] });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
};
