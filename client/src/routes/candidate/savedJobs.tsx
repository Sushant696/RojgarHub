import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidate/savedJobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/candidate/savedJobs"!</div>
}
