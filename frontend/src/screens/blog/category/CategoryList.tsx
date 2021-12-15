import { useNavigate } from 'react-router-dom'
import { useCategoriesQuery } from '../../../app/api'

import Spinner from '../../../common/sharedComponents/Spinner'
import { Stack, Typography, IconButton } from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'

export interface ICategoryListProps {}

function CategoryList(props: ICategoryListProps) {
  const navigate = useNavigate()
  const { data: categories, isFetching } = useCategoriesQuery()
  const handleEditCatergory = (slug) => {
    navigate(`${slug}/update`)
  }
  const handleDeleteCatergory = (slug) => {
    navigate(`${slug}/delete`)
  }

  return (
    <>
      <Typography variant='h5'>Categories</Typography>
      <Stack
        spacing={2}
        direction='column'
        sx={{
          my: 'auto',
          p: 4,
          maxWidth: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        {!isFetching ? (
          categories?.map((category) => (
            <div key={category.id}>
              <Typography variant='h5'>{category.name}</Typography>
              <Typography variant='body1'>{category.description}</Typography>

              <Stack
                direction='row'
                spacing='0.5rem'
                sx={{ justifyContent: 'center' }}
              >
                <IconButton onClick={() => handleEditCatergory(category.slug)}>
                  <Edit fontSize='medium' />
                </IconButton>
                <IconButton
                  color='secondary'
                  onClick={() => handleDeleteCatergory(category.slug)}
                >
                  <Delete fontSize='medium' />
                </IconButton>
              </Stack>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </Stack>
    </>
  )
}

export { CategoryList }
