import MyProfile from '@/pages/my-profile'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/')({
  component: MyProfile
})
