import { createFileRoute } from "@tanstack/react-router";
import SlidingForms from "../components/SlidingForms";

export const Route = createFileRoute("/register")({
  component: SlidingForms,
});
