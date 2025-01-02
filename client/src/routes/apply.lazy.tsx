import { createLazyFileRoute } from '@tanstack/react-router'
import Apply from '../pages/apply'

export const Route = createLazyFileRoute('/apply')({
  
  component: Apply,
})

