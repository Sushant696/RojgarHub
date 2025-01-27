import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidate/applications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/candidate/applications"!</div>
}
