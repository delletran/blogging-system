import { useUsersQuery } from '../../app/api'

import { Auth } from '../../features/auth/auth-slice'
import Spinner from '../../common/sharedComponents/Spinner'
import { Button } from '@mui/material'

export interface IUserListProps {
  auth: Auth
}

function UserList({ auth }: IUserListProps) {
  const { data = [], isFetching: isFetchingUser } = useUsersQuery()

  return (
    <>
      <h1>Users</h1>

      {!isFetchingUser ? (
        data?.map((user) => (
          <div key={user.id}>
            {user.username}: {user.email}
            <Button>{user.is_admin ? 'admin' : ''}</Button>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default UserList
