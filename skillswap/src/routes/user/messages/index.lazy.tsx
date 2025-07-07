import Message from '@/pages/message'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/messages/')({
  component: Message,
})

