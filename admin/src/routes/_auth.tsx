import MainLayout from '@app/components/layouts/MainLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout />;
}
