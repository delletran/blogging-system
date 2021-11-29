// import { useEffect } from 'react'

import { useUsersQuery, useUserQuery } from '../../app/api'

import Spinner from '../../common/sharedComponents/Spinner'
import { Auth } from '../../features/auth/auth-slice'

export interface IUserListProps {
  auth: Auth
}

function UserList({ auth }: IUserListProps) {
  const { data = [], isFetching: isFetchingUser } = useUsersQuery()
  const authUser = useUserQuery(auth.username || '').data

  return (
    <>
      <h1>Users</h1>

      {!isFetchingUser ? (
        data?.map((user) => (
          <div key={user.id}>
            <p>
              {user.username}: {user.email} -- {user.is_admin ? 'admin' : ''}
            </p>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default UserList
