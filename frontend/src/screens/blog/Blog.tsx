import { useNavigate } from 'react-router-dom'

import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { BlogList } from '.'
import { Stack } from '@mui/material'

export interface IBlogProps {}

function Blog(props: IBlogProps) {
  const navigate = useNavigate()

  const handlCreateBlog = () => {
    navigate('create')
  }

  return (
    <Box sx={{ mx: 'auto', width: '80%', justifyContent: 'center' }}>
      <BlogList />
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
        <Fab color='primary' aria-label='add' onClick={handlCreateBlog}>
          <AddIcon />
        </Fab>
      </Stack>
    </Box>
  )
}

export default Blog
