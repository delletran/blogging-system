import React, { useState } from 'react'

import { useBlogCreateMutation } from '../../app/api'
import { IBlogForm } from '../../app/api'

import Editor from '../../common/sharedComponents/Editor'

import { TextField, Typography, Button } from '@mui/material'
import { Stack } from '@mui/material'

const BlogCreate = () => {
  const initialState: IBlogForm = {
    title: '',
    description: '',
    body: '',
    tags: [],
    slug: '',
  }

  const [postBlog, { isSuccess }] = useBlogCreateMutation()
  const [blogData, setBlogData] = useState(initialState)

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBlogData({ ...blogData, [name]: value })
  }

  const handlePostBlog = () => {
    postBlog(blogData)
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
      <Typography variant='h4'>Blog Create Form</Typography>
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
            onClick={handlePostBlog}
            sx={{ width: 120, alignSelf: 'center' }}
          >
            Save
          </Button>
          {isSuccess ? <p>Blogpost Saved!</p> : null}
        </Stack>
      </form>
    </Stack>
  )
}

export { BlogCreate }
