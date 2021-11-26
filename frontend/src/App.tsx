import React, { useEffect } from 'react'
import './App.css'
// import { useRefreshMutation } from './app/api'

import { useAppSelector, useAppDispatch } from './app/hooks'
import { authCheckState, renewAccess } from './features/auth/auth-slice'
import AppRoutes from './routes'

function App() {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(renewAccess())
  }, [dispatch])

  useEffect(() => {
    dispatch(authCheckState())
  }, [dispatch, auth])

  return (
    <div className='App'>
      <AppRoutes />
    </div>
  )
}

export default App
