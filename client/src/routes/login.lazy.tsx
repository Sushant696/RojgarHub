import { createLazyFileRoute } from '@tanstack/react-router'
import SlidingForms from '../components/SlidingForms'

export const Route = createLazyFileRoute('/login')({
  component: SlidingForms,
})
