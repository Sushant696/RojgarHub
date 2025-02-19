import { candidateAction } from "@/api/candidate";
import { useQuery } from "@tanstack/react-query";

export const useGetCandidateById = () => {
  return useQuery({
    queryKey: ["candidate"],
    queryFn: candidateAction.getCandidateById,
    retry: false,
  });
};
