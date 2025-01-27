import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/logout")({
  beforeLoad: () => {
    <h1>loading...</h1>;
    throw redirect({
      to: "/",
    });
  },
});
