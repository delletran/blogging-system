import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useBlogUpdateMutation } from '../../app/api'
import { IBlogForm } from '../../app/api'

import Editor from '../../common/sharedComponents/Editor'

import { TextField, Typography, Button } from '@mui/material'
import { Stack } from '@mui/material'

const BlogUpdate = () => {
  let params = useParams()
  const initialState: IBlogForm = {
    title: '',
    description: '',
    body: '',
    tags: [],
    slug: '',
  }

  const [updateBlog, { isSuccess }] = useBlogUpdateMutation()
  const [blogData, setBlogData] = useState(initialState)

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBlogData({ ...blogData, [name]: value })
  }

  const handlePostBlog = (blogSlug: string | undefined) => {
    blogSlug !== undefined && updateBlog({ blogSlug, blogData })
  }

  return (
    <Stack
      spacing={4}
      direction='column'
      sx={{
        m: 'auto',
        maxWidth: '80%',
        backgroundColor: '#f0f0f0f0',
      }}
    >
      <Typography variant='h4'>Blog Update Form</Typography>
      <br />
      <form action='/' method='POST' onSubmit={(e) => e.preventDefault()}>
        <Stack
          spacing={4}
          direction='column'
          sx={{
            p: 2,
            mx: 'auto',
            maxWidth: '100%',
            // backgroundColor: '#f0f0f0f0',
          }}
        >
          <Typography variant='h5'>Title</Typography>
          <TextField
            id='blog-title'
            label='Title'
            name='title'
            type='text'
            onChange={hangleChange}
            sx={{ width: '40%', alignSelf: 'center' }}
            variant='standard'
          />
          <TextField
            id='blog-title'
            label='Description'
            name='description'
            type='text'
            onChange={hangleChange}
            sx={{ width: '40%', alignSelf: 'center' }}
            variant='standard'
          />
          <br />
          <Typography variant='h5'>Body</Typography>
          <br />
          <Editor state={blogData} setState={setBlogData} property={'body'} />

          <Button
            variant='contained'
            type='submit'
            onClick={() => handlePostBlog(params?.slug)}
            sx={{ width: 120, alignSelf: 'center' }}
          >
            Update
          </Button>
          {isSuccess ? <p>Blogpost Saved!</p> : null}
        </Stack>
      </form>
    </Stack>
  )
}

export { BlogUpdate }
