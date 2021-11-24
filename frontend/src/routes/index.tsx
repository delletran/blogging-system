// import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'

import { UserSignup } from '../screens/auth'
import UserList from './../screens/test/UserList'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/test-route' element={<UserList />} />
    </Routes>
  )
}

export default AppRoutes
