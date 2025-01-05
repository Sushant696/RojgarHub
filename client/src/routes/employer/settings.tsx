import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employer/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/employer/settings"!</div>
}
