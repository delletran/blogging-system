import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Auth } from '../features/auth/auth-slice'

interface AuthenticatedRouteProps<T> {
  auth: T
  children: JSX.Element
}

function AuthenticatedRoute({ auth, children }: AuthenticatedRouteProps<Auth>) {
  const location = useLocation()

  useEffect(() => {}, [auth.isAuthenticated])
  return auth.isAuthenticated !== false ? (
    children
  ) : (
    <Navigate to='/signin' state={{ from: location }} />
  )
}

export default AuthenticatedRoute
