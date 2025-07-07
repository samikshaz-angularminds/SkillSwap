import Homepage from '@/pages/user-homepage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/home/')({
  component: Homepage,
})


