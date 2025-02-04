import { useMutation } from "@tanstack/react-query";

import showNotification from "../utils/toastify";
import DisplayErrorToast from "../utils/displayErrorMessage";
import { jobAction } from "@/api/job";

export const usePostJob = () => {
  return useMutation({
    mutationKey: ["post-job"],
    mutationFn: jobAction.postJob,
    onSuccess(response) {
      showNotification("success", response.data.message);
    },
    onError: (error: any) => {
      DisplayErrorToast(error);
    },
  });
};
