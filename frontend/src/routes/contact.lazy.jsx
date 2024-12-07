import { createLazyFileRoute } from '@tanstack/react-router'
import Contact from '../pages/contact'

export const Route = createLazyFileRoute('/contact')({
  component: Contact,
})


