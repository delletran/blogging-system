import React, { useState, useEffect } from 'react'

import { TextField, Typography, Button } from '@mui/material'
import { Stack } from '@mui/material'
import { IBlog, IReplyForm, useReplyCreateMutation } from './../../../app/api'

export interface IReplyCreateProps {
  blogId?: number
  replyTo?: number
  commentId?: number
}

const ReplyCreate = ({
  blogId,
  replyTo = 13,
  commentId,
}: IReplyCreateProps) => {
  const initialState: IReplyForm = {
    content: '',
    post_id: blogId || 0,
    up_votes: 0,
    object_id: null,
    is_active: true,
    reply_to: replyTo,
  }
  const [commentData, setCommentData] = useState(initialState)
  const [postComment, { isSuccess }] = useReplyCreateMutation()

  const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCommentData({ ...commentData, [name]: value })
  }

  const handlePostComment = () => {
    commentData !== undefined && postComment(commentData)
  }

  useEffect(() => {
    blogId !== undefined && setCommentData({ ...commentData, post_id: blogId })
  }, [blogId])

  useEffect(() => {
    setCommentData({
      ...commentData,
      object_id: commentId !== undefined ? commentId : null,
    })
  }, [commentId])

  useEffect(() => {
    isSuccess && setCommentData({ ...commentData, content: '' })
  }, [isSuccess])

  return (
    <Stack
      spacing={4}
      direction='column'
      sx={{
        m: 'auto',
        maxWidth: '100%',
      }}
    >
      <form action='/' method='POST' onSubmit={(e) => e.preventDefault()}>
        <Stack
          spacing={4}
          direction='row'
          sx={{
            mx: 'auto',
            maxWidth: '100%',
            justifyContent: 'center',
          }}
        >
          <TextField
            id='comment-content'
            label='Reply'
            name='content'
            type='text'
            value={commentData.content || ''}
            onChange={hangleChange}
            sx={{ width: '60%', alignSelf: 'center' }}
            variant='outlined'
          />
          <Button
            variant='contained'
            type='submit'
            onClick={() => handlePostComment()}
            sx={{ width: 80, alignSelf: 'center' }}
          >
            Post
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export { ReplyCreate }
