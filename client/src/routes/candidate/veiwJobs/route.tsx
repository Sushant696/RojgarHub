import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidate/veiwJobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/candidate/veiwJobs"!</div>
}
