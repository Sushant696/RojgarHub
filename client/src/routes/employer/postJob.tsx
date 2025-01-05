import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employer/postJob')({
 
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/employer/postJob"!</div>
}
