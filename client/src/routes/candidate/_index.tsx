import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoutes } from '../../auth/protectedRoutes'
import { CandidateLayout } from '../../layouts/candidateLayout'

export const Route = createFileRoute('/candidate/_index')({
  component: () => (
    <ProtectedRoutes allowedRoles={['CANDIDATE']}>
      <CandidateLayout />
    </ProtectedRoutes>
  ),
})
