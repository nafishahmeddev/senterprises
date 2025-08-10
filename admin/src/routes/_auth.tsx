import MainLayout from '@app/components/layouts/MainLayout'
import LoginComponent from '@app/components/login-component';
import AuthApi from '@app/services/auth';
import { useAuthStore } from '@app/store/auth';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent
})

function RouteComponent() {
  const [auth] = useAuthStore<AuthState>()


  useEffect(() => {
    AuthApi.verify()
  }, [])

  if (auth.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  if (!auth.loggedIn) {
    return <LoginComponent />;
  }
  return <MainLayout />;
}
