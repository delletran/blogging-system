import React, { FunctionComponent, useState } from 'react'
import { useSignupMutation } from '../../app/api'

const UserSignup: FunctionComponent = () => {
  const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  }

  const [signupUser, { isLoading: isUpdating }] = useSignupMutation()
  const [userData, setUserData] = useState(initialState)
  console.log('isUpdating: ', isUpdating)

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSignup = () => {
    signupUser(userData)
  }

  return (
    <div>
      <h2>Signup</h2>
      <form action='/' method='POST' onSubmit={(e) => e.preventDefault()}>
        <div>
          Username
          <br />
          <input
            id='signup-username'
            name='username'
            type='text'
            onChange={(e) => hangleChange(e)}
          />
          <br />
          <br />
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
          Confirm Password
          <br />
          <input
            id='signup-password2'
            name='password2'
            type='password'
            onChange={(e) => hangleChange(e)}
          />
          <br />
          <br />
          <button type='submit' onClick={handleSignup}>
            Signup
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserSignup
export { UserSignup }
