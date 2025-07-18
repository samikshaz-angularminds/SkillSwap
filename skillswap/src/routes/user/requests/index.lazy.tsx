import ConnectionRequests from '@/pages/connection-requests'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/requests/')({
  component: ConnectionRequests,
})

