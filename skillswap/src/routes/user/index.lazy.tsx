import MyProfile from '@/pages/my-profile'
import UserProfile from '@/pages/user-profile'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/')({
  component: MyProfile
})
