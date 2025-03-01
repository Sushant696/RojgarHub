import ApplicationDetails from '@/pages/candidate/applicationDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidate/application/$applicationId')({
  component: ApplicationDetails,
})
