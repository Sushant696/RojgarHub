import Company from "@/pages/employer/company";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/company")({
  component: Company,
});
