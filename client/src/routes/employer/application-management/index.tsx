import ApplicationManagement from '@/pages/employer/home/application-management'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employer/application-management/')({
  component: ApplicationManagement,
})
