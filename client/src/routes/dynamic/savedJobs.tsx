import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dynamic/savedJobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/candidate/savedJobs"!</div>
}
