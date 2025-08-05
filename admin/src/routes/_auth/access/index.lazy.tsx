import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/access/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/accesses/"!</div>
}
