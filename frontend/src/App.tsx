import React, { useEffect } from 'react'
import './App.css'

import { useAppSelector, useAppDispatch } from './app/hooks'
import {
  Auth,
  authCheckState,
  renewAccess,
  selectAuth,
  getAuthUserData,
} from './features/auth/auth-slice'
import AppRoutes from './routes'
import { BSAppBar } from './common/navigation'
import { useUserProfileQuery } from './app/api'

import { IProfile } from './app/api'

function App() {
  const auth: Auth = useAppSelector(selectAuth)
  const { data: userData = {} as IProfile } = useUserProfileQuery(
    auth.id !== undefined ? auth.id : 1
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(renewAccess())
    dispatch(getAuthUserData())
  }, [dispatch])

  useEffect(() => {
    dispatch(authCheckState())
  }, [dispatch, auth])

  return (
    <div className='App'>
      <BSAppBar appName='Blogging system' auth={auth} userData={userData} />
      <AppRoutes auth={auth} userData={userData} />
    </div>
  )
}

export default App
