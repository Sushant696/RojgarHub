import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useRouter as Router } from "@tanstack/react-router";

const useRouter = () => {
  const navigate = useNavigate();
  const tanstackUseRouter = Router();

  const router = useMemo(
    () => ({
      back: () => tanstackUseRouter.history.back(),
      forward: () => tanstackUseRouter.history.forward(),
      reload: () => window.location.reload(),
      push: (href: string) => navigate({ to: href }),
      replace: (href: string) => navigate({ to: href, replace: true }),
    }),
    [navigate],
  );

  return router;
};

export default useRouter;
