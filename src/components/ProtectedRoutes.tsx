import { Navigate, Outlet } from 'react-router-dom'

import { useUserStore } from '~/hooks/use-user'
import { Spinner } from './Spinner'

export function ProtectedRoutes() {
  const { status, isAuthenticated } = useUserStore()

  if (status === 'loading') return <Spinner />

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
