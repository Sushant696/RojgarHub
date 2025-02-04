import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { authApi } from "../api/user";
import useRouter from "../lib/router";
import useAuthStore from "../stores/authStore";
import showNotification from "../utils/toastify";
import DisplayErrorToast from "../utils/displayErrorMessage";
import { toast } from "react-toastify";

export const useLogin = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setCurrentUser = useAuthStore((state) => state.setCurrentuser);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.Login,
    onSuccess: (response) => {
      const { role, id, contact } = response?.data?.data;
      setIsAuthenticated(true);
      setCurrentUser({ id, role, contact });
      queryClient.invalidateQueries({ queryKey: ["verify"] });
      role === "EMPLOYER"
        ? router.push("/employer")
        : router.push("/candidate");
      showNotification("success", response.data.message);
    },
    onError: (error: any) => {
      DisplayErrorToast(error);
    },
  });
};

export const useLogout = () => {
  const {
    setIsAuthenticated,
    setCurrentuser: setUser,
    setIsLoading,
  } = useAuthStore();

  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.Logout,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async () => {
      try {
        setUser(null);
        setIsAuthenticated(false);

        await queryClient.resetQueries();
        queryClient.clear();
        toast.dismiss();
        await router.push("/");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setIsLoading(false);
    },
  });
};

export const useVerify = () => {
  return useQuery({
    queryKey: ["verify"],
    queryFn: authApi.verify,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000,
  });
};

export const useRefresh = () => {
  const queryClient = useQueryClient();

  const response = useQuery({
    queryKey: ["refresh"],
    queryFn: authApi.refresh,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000,
  });
  queryClient.invalidateQueries({ queryKey: ["verify"] });
  return response;
};
