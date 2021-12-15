import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useCategoryUpdateMutation } from '../../../app/api'
import { ICategoryForm } from '../../../app/api'

import { TextField, Typography, Button } from '@mui/material'
import { Stack } from '@mui/material'

const CategoryUpdate = () => {
  const initialState: ICategoryForm = {
    name: '',
    description: '',
    is_active: false,
  }
  let params = useParams()
  let navigate = useNavigate()

  const [updateCategory, { isSuccess }] = useCategoryUpdateMutation()
  const [categoryData, setCategoryData] = useState(initialState)

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategoryData({ ...categoryData, [name]: value })
  }

  const handleUpdateCategory = (slug) => {
    updateCategory({ slug, categoryData })
  }

  useEffect(() => {
    isSuccess && setTimeout(() => navigate('/category'), 1000)
  }, [isSuccess, navigate])

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
      <Typography variant='h4'>Category Update Form</Typography>
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
            onClick={() => handleUpdateCategory(params?.name)}
            sx={{ width: 120, alignSelf: 'center' }}
          >
            Save
          </Button>
          {isSuccess ? <p>Category Updated!</p> : null}
        </Stack>
      </form>
    </Stack>
  )
}

export { CategoryUpdate }
