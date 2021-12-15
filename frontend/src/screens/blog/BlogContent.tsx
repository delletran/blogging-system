import React from 'react'

import { formatHtml } from '../../common/helper'
import { IBlog } from '../../app/api'

import { Box, Typography } from '@mui/material'

export interface IBlogDetailsProps {
  blog?: IBlog
}

function BlogContent({ blog }: IBlogDetailsProps) {
  const setHtml = (text: string | undefined) => (
    <div dangerouslySetInnerHTML={{ __html: formatHtml(text) }} />
  )

  return (
    <Box sx={{ m: 'auto', p: '2rerm', width: '100%' }}>
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
    </Box>
  )
}

export { BlogContent }
