import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useSigninMutation } from '../../app/api'
import { useAppDispatch } from '../../app/hooks'
import { setToken } from '../../features/auth/auth-slice'
import { Auth } from './../../features/auth/auth-slice'

const UserSignin = ({ auth }: { auth: Auth }): JSX.Element => {
  const [signin, { data }] = useSigninMutation()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  let from = location.state?.from?.pathname || '/'

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  const handleSignin = () => {
    signin(credentials)
  }

  useEffect(() => {
    data &&
      dispatch(
        setToken({
          userEmail: credentials?.email,
          ...data,
        })
      )
  }, [data, dispatch, credentials?.email])

  useEffect(() => {
    auth.isAuthenticated === true && navigate(from, { replace: true })
  }, [auth, navigate, from])

  return (
    <>
      {auth.isAuthenticated !== true && (
        <div>
          <h2>Signin</h2>
          <form action='/' method='POST' onSubmit={(e) => e.preventDefault()}>
            <div>
              Email
              <br />
              <input
                id='signup-email'
                name='email'
                type='text'
                onChange={(e) => hangleChange(e)}
              />
              <br />
              <br />
              Password
              <br />
              <input
                id='signup-password'
                name='password'
                type='password'
                onChange={(e) => hangleChange(e)}
              />
              <br />
              <br />
              <button type='submit' onClick={handleSignin}>
                Signin
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export { UserSignin }
