import ConnectionRequests from '@/pages/connection-requests'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/requests/')({
  component: ConnectionRequests,
})

function RouteComponent() {
  return <div>Hello "/user/requests/"!</div>
}
