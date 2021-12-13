import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useBlogQuery } from '../../app/api'
import { formatHtml } from '../../common/helper'

import { Box, Button, Typography } from '@mui/material'

export interface IBlogDetailsProps {}

function BlogDetails(props: IBlogDetailsProps) {
  const navigate = useNavigate()
  let params = useParams()
  const { data: blog } = useBlogQuery(params.slug || '')

  const setHtml = (text: string | undefined) => (
    <div dangerouslySetInnerHTML={{ __html: formatHtml(text) }} />
  )

  return (
    <Box sx={{ m: 'auto', p: '2rerm', width: '70%' }}>
      <Box sx={{ m: '2rem' }}>
        <Typography variant='h4'>Blog Details</Typography>
        <Typography gutterBottom variant='h5' color='primary' component='div'>
          {blog?.title}
        </Typography>
        <Typography
          gutterBottom
          variant='subtitle2'
          color='secondary'
          component='div'
        >
          {blog?.created_at ? new Date(blog?.created_at).toDateString() : ''}
        </Typography>
        <Typography variant='subtitle2' color='inherit'>
          {blog?.description}
        </Typography>
        <Typography variant='subtitle2' color='inherit'>
          {setHtml(blog?.body)}
        </Typography>
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
      </Box>
    </Box>
  )
}

export { BlogDetails }
