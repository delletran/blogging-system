import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useBlogUpdateMutation, useBlogQuery } from '../../app/api'
import { IBlogForm } from '../../app/api'
import { string_to_slug } from '../../common/helper'

import Editor from '../../common/sharedComponents/Editor'

import { TextField, Typography, Button } from '@mui/material'
import { Stack } from '@mui/material'

const BlogUpdate = () => {
  let params = useParams()
  const navigate = useNavigate()

  const [updateBlog, { isSuccess: updateSuccess }] = useBlogUpdateMutation()
  const { data: blog = [] } = useBlogQuery(params?.slug || '')
  const initialState: IBlogForm = {
    title: '',
    description: '',
    body: '',
    tags: [],
    slug: '',
    ...blog,
  }
  const [blogData, setBlogData] = useState(initialState)

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBlogData({ ...blogData, [name]: value })
  }

  const handlePostBlog = (blogSlug: string | undefined) => {
    blogSlug !== undefined && updateBlog({ blogSlug, blogData })
  }

  useEffect(() => {
    updateSuccess &&
      setTimeout(() => navigate(`/blog/${string_to_slug(blogData.title)}`), 500)
  }, [updateSuccess, navigate, blogData])

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
            value={blogData.title || ''}
            onChange={hangleChange}
            sx={{ width: '40%', alignSelf: 'center' }}
            variant='standard'
          />
          <TextField
            id='blog-title'
            label='Description'
            name='description'
            type='text'
            value={blogData.description || ''}
            onChange={hangleChange}
            sx={{ width: '40%', alignSelf: 'center' }}
            variant='standard'
          />
          <br />
          <Typography variant='h5'>Body</Typography>
          <br />
          <Editor
            state={blogData}
            setState={setBlogData}
            property={'body'}
            _data={blogData.body || ''}
          />

          <Button
            variant='contained'
            type='submit'
            disabled={updateSuccess}
            onClick={() => handlePostBlog(params?.slug)}
            sx={{ width: 120, alignSelf: 'center' }}
          >
            Update
          </Button>
          {updateSuccess ? <p>Blogpost Saved!</p> : null}
        </Stack>
      </form>
    </Stack>
  )
}

export { BlogUpdate }
