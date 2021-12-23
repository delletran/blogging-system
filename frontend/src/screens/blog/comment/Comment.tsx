import { useNavigate } from 'react-router-dom'

import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { CommentList } from './CommentList'
import { Stack } from '@mui/material'

export interface IBlogProps {}

function Comment(props: IBlogProps) {
  const navigate = useNavigate()

  const handlCreateBlog = () => {
    navigate('create')
  }

  return <CommentList />
}

export default Comment
