import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useCategoryDeleteMutation } from '../../../app/api'

import { Typography, Button } from '@mui/material'
import { Stack } from '@mui/material'

// TODO: Change to Modal

const CategoryDelete = () => {
  let params = useParams()
  const navigate = useNavigate()
  const [deleteCategory, { isSuccess }] = useCategoryDeleteMutation()

  const handleDeleteCategory = (categorySlug: string | undefined) => {
    categorySlug !== undefined && deleteCategory(categorySlug)
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
        <p>Categorypost Deleted!</p>
      ) : (
        <Button
          variant='contained'
          type='submit'
          onClick={() => handleDeleteCategory(params?.name)}
          sx={{ width: 120, alignSelf: 'center' }}
        >
          Delete
        </Button>
      )}
    </Stack>
  )
}

export { CategoryDelete }
