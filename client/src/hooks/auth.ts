import useAuthStore from "../stores/authStore";
import useRouter from "../lib/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import showNotification from "../utils/toastify";
import { authApi } from "../api/user";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.Login,
    onSuccess: (response) => {
      const { accessToken, role } = response.data.user;
      setAccessToken(accessToken);
      queryClient.invalidateQueries({ queryKey: ["verify"] });
      showNotification("success", response?.data?.user.message);
      role === "employer"
        ? router.push("/employer")
        : router.push("/candidate");
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
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setUser = useAuthStore((state) => state.setCurrentuser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.Logout,
    onSuccess: () => {
      setUser(null);
      setAccessToken(null);
      setIsAuthenticated(false);
      queryClient.invalidateQueries({ queryKey: ["verify"] });
      window.location.href = "/";
    },
  });
};
