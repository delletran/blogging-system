import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useBlogDeleteMutation } from '../../app/api'

import { Typography, Button } from '@mui/material'
import { Stack } from '@mui/material'

// TODO: Change to Modal

const BlogDelete = () => {
  let params = useParams()
  const navigate = useNavigate()
  const [deleteBlog, { isSuccess }] = useBlogDeleteMutation()

  const handlePostBlog = (blogSlug: string | undefined) => {
    blogSlug !== undefined && deleteBlog(blogSlug)
  }

  useEffect(() => {
    isSuccess && setTimeout(() => navigate('/blog'), 1000)
  }, [isSuccess, navigate])

  return (
    <Stack
      spacing={4}
      direction='column'
      sx={{
        m: 'auto',
        p: 2,
        maxWidth: '80%',
        backgroundColor: '#f0f0f0f0',
      }}
    >
      <Typography variant='h5'>
        Are you sure you want to delete {params?.slug}?
      </Typography>
      <br />
      {isSuccess ? (
        <p>Blogpost Deleted!</p>
      ) : (
        <Button
          variant='contained'
          type='submit'
          onClick={() => handlePostBlog(params?.slug)}
          sx={{ width: 120, alignSelf: 'center' }}
        >
          Delete
        </Button>
      )}
    </Stack>
  )
}

export { BlogDelete }
