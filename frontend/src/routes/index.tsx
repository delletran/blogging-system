// import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'

import { UserSignup, UserSignin } from '../screens/auth'
import { UserManagement } from '../screens/admin'
import UserList from './../screens/test/UserList'

const AppRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <Routes>
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/signin' element={<UserSignin />} />
      <Route path='/test-route' element={<UserList />} />
      <Route path='/admin' element={<UserManagement />} />
    </Routes>
  )
}

export default AppRoutes
