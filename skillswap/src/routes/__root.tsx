import CustomHeader from '@/components/CustomHeader'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Suspense } from 'react'

export const Route = createRootRoute({
  component: () => (
    <>
    <Suspense fallback={<div>Loading...</div>}>
<CustomHeader/>
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
    </>
  ),
})
