import useAuthStore from "../stores/authStore";
import useRouter from "../lib/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import showNotification from "../utils/toastify";
import { authApi } from "../api/user";
import { toast } from "react-toastify";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setCurrentUser = useAuthStore((state) => state.setCurrentuser);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.Login,
    onSuccess: (response) => {
      const { accessToken, role, id, contact } = response.data.user;
      setAccessToken(accessToken);
      setIsAuthenticated(true);
      setCurrentUser({ id, role, contact });
      queryClient.invalidateQueries({ queryKey: ["verify"] });
      role === "employer"
        ? router.push("/employer")
        : router.push("/candidate");
      showNotification("success", "successfully logged in");
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
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.Logout,
    onMutate: () => {
      toast.dismiss();
    },
    // delay for clearing the states
    onSuccess: () => {
      router.push("/logout");
      setTimeout(() => {
        setUser(null);
        setAccessToken(null);
        setIsAuthenticated(false);
        queryClient.invalidateQueries({ queryKey: ["verify"] });
        toast.dismiss();
        showNotification("success", "logged out successfully.");
      }, 100);
    },
  });
};
