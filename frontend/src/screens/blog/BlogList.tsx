import { useBlogsQuery } from '../../app/api'

import Spinner from '../../common/sharedComponents/Spinner'
import { Stack } from '@mui/material'
import { BLogCard } from './BLogCard'
export interface IBlogListProps {}

function BlogList(props: IBlogListProps) {
  const { data = [], isFetching } = useBlogsQuery()

  return (
    <>
      <h2>Blogs</h2>

      <Stack
        spacing={2}
        direction='column'
        sx={{
          my: 'auto',
          maxWidth: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        {!isFetching ? (
          data?.map((blog) => (
            <div key={blog.id}>
              <BLogCard blog={blog} />
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </Stack>
    </>
  )
}
export { BlogList }
