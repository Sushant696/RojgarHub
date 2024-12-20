import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

const useRouter = () => {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href) => navigate({ to: href }),
      replace: (href) => navigate({ to: href, replace: true }),
    }),
    [navigate],
  );

  return router;
};

export default useRouter;
