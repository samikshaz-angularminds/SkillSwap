import UserSignUp from '@/pages/user-signup'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/signup/')({
  component: UserSignUp,
})

