import Message from "@/pages/employer/messages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/messages")({
  component: Message,
});
