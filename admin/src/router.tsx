import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import PendingComponent from './components/PendingComponent'

// Create a new router instance
const router = createRouter({ routeTree, defaultPendingComponent: PendingComponent })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function Router() {
  return <RouterProvider router={router} />
}