import React, { useState } from 'react'

import { useCategoryCreateMutation } from '../../../app/api'
import { ICategoryForm } from '../../../app/api'

import { TextField, Typography, Button } from '@mui/material'
import { Stack } from '@mui/material'

const CategoryCreate = () => {
  const initialState: ICategoryForm = {
    name: '',
    description: '',
    is_active: false,
  }

  const [postCategory, { isSuccess }] = useCategoryCreateMutation()
  const [blogData, setCategoryData] = useState(initialState)

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategoryData({ ...blogData, [name]: value })
  }

  const handlePostCategory = () => {
    postCategory(blogData)
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
      <Typography variant='h4'>Category Create Form</Typography>
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
          <TextField
            id='category-name'
            label='name'
            name='name'
            type='text'
            onChange={hangleChange}
            sx={{ width: '40%', alignSelf: 'center' }}
            variant='standard'
          />
          <TextField
            id='category-description'
            label='Description'
            name='description'
            type='text'
            onChange={hangleChange}
            sx={{ width: '40%', alignSelf: 'center' }}
            variant='standard'
          />
          <Button
            variant='contained'
            type='submit'
            onClick={handlePostCategory}
            sx={{ width: 120, alignSelf: 'center' }}
          >
            Save
          </Button>
          {isSuccess ? <p>Category Saved!</p> : null}
        </Stack>
      </form>
    </Stack>
  )
}

export { CategoryCreate }
