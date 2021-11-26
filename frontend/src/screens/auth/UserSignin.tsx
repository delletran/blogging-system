import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSigninMutation } from '../../app/api'
import { useAppDispatch } from '../../app/hooks'
import { setToken } from '../../features/auth/auth-slice'

const UserSignin: FunctionComponent = () => {
  const [signin, { data }] = useSigninMutation()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const dispatch = useAppDispatch()

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

  return (
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
  )
}

export { UserSignin }
