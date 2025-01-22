import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logout")({
  component: () => <h1>loggin out, some loading will be shown </h1>,
});


