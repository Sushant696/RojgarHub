import CandidateApplications from '@/pages/candidate/candidateApplications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidate/application/')({
  component: CandidateApplications,
})
