import { Routes, Route } from 'react-router-dom'

import { Auth } from './../features/auth/auth-slice'

import AuthRequiredRoute from './AuthRequiredRoute'
import AdminRequiredRoute from './AdminRequiredRoute'

import { UserSignup, UserSignin } from '../screens/auth'
import { UserManagement } from '../screens/admin'
import UserList from './../screens/user/UserList'
import UserProfile from '../screens/user/UserProfile'
import Homepage from '../screens/homepage/Homepage'
import { IProfile } from './../app/api'

export interface IAppRoutesProps {
  auth: Auth
  userData?: IProfile
}

const AppRoutes = ({ auth, userData }: IAppRoutesProps) => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/signin' element={<UserSignin auth={auth} />} />
      <Route
        path='/profile'
        element={
          <AuthRequiredRoute auth={auth}>
            <UserProfile auth={auth} userData={userData} />
          </AuthRequiredRoute>
        }
      />
      <Route
        path='/admin'
        element={
          <AuthRequiredRoute auth={auth}>
            <UserManagement auth={auth} />
          </AuthRequiredRoute>
        }
      />
      <Route
        path='/user-list'
        element={
          <AdminRequiredRoute auth={auth}>
            <UserList auth={auth} />
          </AdminRequiredRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
