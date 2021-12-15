import { useNavigate } from 'react-router-dom'

import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { CategoryList } from '.'
import { Stack } from '@mui/material'

export interface ICategoryProps {}

function Category(props: ICategoryProps) {
  const navigate = useNavigate()

  const handlCreateCategory = () => {
    navigate('create')
  }

  return (
    <Box sx={{ mx: 'auto', width: '80%', justifyContent: 'center' }}>
      <CategoryList />
      <Stack
        sx={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }}
      >
        <Fab color='primary' aria-label='add' onClick={handlCreateCategory}>
          <AddIcon />
        </Fab>
      </Stack>
    </Box>
  )
}

export { Category }
