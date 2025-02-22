import CandidateDashboard from '@/pages/candidate/candidateDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidate/dashboard/')({
  component: CandidateDashboard,
})

