import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { authApi } from "../api/user";
import useRouter from "../lib/router";
import useAuthStore from "../stores/authStore";
import showNotification from "../utils/toastify";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setCurrentUser = useAuthStore((state) => state.setCurrentuser);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.Login,
    onSuccess: (response) => {
      const { accessToken, role, id, contact } = response?.data?.data;
      setAccessToken(accessToken);
      setIsAuthenticated(true);
      setCurrentUser({ id, role, contact });
      queryClient.invalidateQueries({ queryKey: ["verify"] });
      role === "EMPLOYER"
        ? router.push("/employer")
        : router.push("/candidate");
      showNotification("success", response.data.message);
    },
    onError: (error) => {
      console.log(error);
      showNotification("error", error.message || "Sometime went wrong.");
    },
  });
};

export const useVerify = () => {
  return useQuery({
    queryKey: ["verify"],
    queryFn: authApi.Verify,
    retry: false,
  });
};

export const useLogout = () => {
  const {
    setAccessToken,
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
        setAccessToken(null);
        setIsAuthenticated(false);

        await queryClient.resetQueries();
        queryClient.clear();

        await router.push("/");
        showNotification("success", "logged out successfully.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setIsLoading(false);
    },
  });
};
