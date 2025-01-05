import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidate/apply')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/candidate/apply"!</div>
}
