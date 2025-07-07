import UserProfile from '@/pages/user-profile'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/$username/')({
  component: UserProfile,
})


