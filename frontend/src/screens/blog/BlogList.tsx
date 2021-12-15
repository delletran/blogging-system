import { useState } from 'react'
import { usePaginatedBlogsQuery } from '../../app/api'

import _ from 'lodash'

import Spinner from '../../common/sharedComponents/Spinner'
import { BLogCard } from './BLogCard'

import { Box, Stack, TextField, Button, Pagination } from '@mui/material'

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

  const handlePrev = () => {
    data?.previous_page && setQuery({ ...query, page: data.previous_page })
  }
  const handleNext = () => {
    data?.next_page && setQuery({ ...query, page: data.next_page })
  }

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
        {/* <Stack
          spacing={4}
          direction='row'
          sx={{
            p: 2,
            my: 'auto',
            maxWidth: '100%',
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            disabled={data?.previous_page === null}
            onClick={handlePrev}
            sx={{ width: '15ch' }}
          >
            Prev
          </Button> */}
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
        {/* <Button
            variant='contained'
            color='secondary'
            disabled={data?.next_page === null}
            onClick={handleNext}
            sx={{ width: '15ch' }}
          >
            Next
          </Button>
        </Stack> */}
      </Stack>
    </>
  )
}
export { BlogList }
