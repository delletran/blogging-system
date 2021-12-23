import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useBlogQuery } from '../../app/api'
import { IBlog } from '../../app/api'
import { Auth } from '../../features/auth/auth-slice'

import { Box, Button, Typography } from '@mui/material'

import { BlogContent } from './BlogContent'
import { CommentList, CommentCreate } from './comment'

export interface IBlogDetailsProps {
  blog?: IBlog
  auth: Auth
}

function BlogDetails({ blog, auth }: IBlogDetailsProps) {
  const navigate = useNavigate()
  let params = useParams()
  const { data: blogData } = useBlogQuery(params.slug || '')

  return (
    <Box sx={{ m: 'auto', p: '1rem', width: '70%' }}>
      {/* <Box sx={{ m: '2rem' }}> */}
      <Typography variant='h4'>Blog Details</Typography>
      <BlogContent blog={blogData} />
      {auth.is_admin ? (
        <>
          <Button
            variant='contained'
            color='info'
            onClick={() => navigate('update')}
            sx={{ width: 120, alignSelf: 'center' }}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => navigate('delete')}
            sx={{ width: 120, alignSelf: 'center' }}
          >
            Delete
          </Button>
        </>
      ) : null}
      <Typography variant='h5' mt={4}>
        Comment Section
      </Typography>
      <CommentCreate blogId={blogData?.id} contentType={8} />
      <CommentList blog={blogData} />
      {/* </Box> */}
    </Box>
  )
}

export { BlogDetails }
