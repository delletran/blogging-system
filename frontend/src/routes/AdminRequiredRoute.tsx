// import { Navigate, useLocation } from 'react-router-dom'
import { Auth } from '../features/auth/auth-slice'

export interface NavigateToProps {
  pathname: string
  state: { from: string }
}

interface AdminRouteProps {
  auth: Auth
  children: JSX.Element
}

function AdminRequiredRoute({ auth, children }: AdminRouteProps): JSX.Element {
  // const location = useLocation().pathname

  if (auth.is_admin) return children
  else
    return (
      <div>
        <p>404 Not Found.</p>
        <p>Admin required.</p>
      </div>
      // <Navigate
      //   to={{ pathname: '/', state: { from: location } } as NavigateToProps}
      // />
    )
}

export default AdminRequiredRoute
