import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IBlog } from '../../app/api'
import { formatHtml } from '../../common/helper'

import {
  Stack,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Avatar,
  Button,
  Typography,
  IconButton,
} from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

export interface IBLogCardProps {
  blog: IBlog
}

const BLogCard = ({ blog }: IBLogCardProps) => {
  const navigate = useNavigate()

  const setHtml = (text: string | undefined) => (
    <div dangerouslySetInnerHTML={{ __html: formatHtml(text) }} />
  )

  const handleDetailView = (slug: string | undefined) => {
    slug !== undefined && navigate(`${slug}`)
  }

  return (
    <Card
      elevation={2}
      sx={{
        p: '0.5rem',
        borderRadius: '0.25rem',
        bgcolor: '#edf9ffb0',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#f0f0f0ff' }} aria-label='recipe'>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={blog.title}
        subheader={
          blog?.created_at ? new Date(blog?.created_at).toDateString() : ''
        }
        // subheader='September 14, 2016'
      />
      <CardMedia
        component='img'
        height='160'
        image='http://127.0.0.1:8000/media/images/cool-beach.gif'
        alt='icon'
        sx={{
          bgcolor: '#f0f0f0ff',
          borderRadius: '0.75rem 0.75rem 0 0 ',
        }}
      />
      <CardContent
        sx={{
          bgcolor: '#ffffff',
        }}
      >
        <Typography
          gutterBottom
          variant='h5'
          color='primary'
          component='div'
        ></Typography>
        <Typography variant='subtitle2' color='inherit'>
          {blog.description}
        </Typography>
        <Typography variant='subtitle2' color='inherit'>
          {setHtml(`${blog.body?.slice(0, 80)}...`)}
        </Typography>
      </CardContent>
      <Stack direction='row' spacing='2rem' sx={{ justifyContent: 'right' }}>
        <CardActions>
          <Button
            size='medium'
            variant='contained'
            color='primary'
            onClick={() => handleDetailView(blog.slug)}
          >
            View
          </Button>
        </CardActions>
      </Stack>
    </Card>
  )
}

export { BLogCard }
