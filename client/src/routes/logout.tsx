import Loading from "@/components/isLoading";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/logout")({
  beforeLoad: () => {
    <h1>
      <Loading />
    </h1>;
    throw redirect({
      to: "/",
    });
  },
});
