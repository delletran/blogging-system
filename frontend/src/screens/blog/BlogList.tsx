import { useState } from 'react'
import { usePaginatedBlogsQuery } from '../../app/api'

import _ from 'lodash'

import Spinner from '../../common/sharedComponents/Spinner'
import { BLogCard } from './BLogCard'

import { Stack, TextField, Pagination } from '@mui/material'

export interface IBlogListProps {}

function BlogList(props: IBlogListProps) {
  const [query, setQuery] = useState({ page: 1, search: '', slug: [] } as {
    page: number
    search: string
    slug: string[]
  })
  const { data, isFetching } = usePaginatedBlogsQuery(query)

  const hangleDebounce = _.debounce(function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    hangleChange(e)
  },
  500)

  const handlePageChange = (event, value) => {
    setQuery({ ...query, page: value })
  }
  const hangleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setQuery({ ...query, [name]: value })
  }

  return (
    <>
      <h2>Blogs</h2>
      <Stack
        spacing={4}
        direction='column'
        sx={{
          p: 2,
          mx: 'auto',
          maxWidth: '100%',
        }}
      >
        <TextField
          id='blog-search'
          label='Search'
          name='search'
          type='text'
          onChange={hangleDebounce}
          sx={{ width: '40%', alignSelf: 'center' }}
          variant='standard'
        />
      </Stack>

      <Stack
        spacing={2}
        direction='column'
        sx={{
          my: 'auto',
          p: 2,
          maxWidth: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        {!isFetching ? (
          data !== undefined && data.results.length > 0 ? (
            data.results?.map((blog) => (
              <div key={blog.id}>
                <BLogCard blog={blog} />
              </div>
            ))
          ) : (
            <p>No Result Found.</p>
          )
        ) : (
          <Spinner />
        )}
        <Stack
          spacing={4}
          direction='row'
          sx={{
            my: 'auto',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Pagination
            color='secondary'
            count={data?.total_pages}
            page={query.page}
            onChange={handlePageChange}
          />
        </Stack>
      </Stack>
    </>
  )
}
export { BlogList }
