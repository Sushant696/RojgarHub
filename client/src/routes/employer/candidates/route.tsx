import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employer/candidates')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/employer/candidates"!</div>
}
