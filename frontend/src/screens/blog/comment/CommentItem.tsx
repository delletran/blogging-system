import React, { Fragment, useEffect, useState } from 'react'

import {
  IComment,
  useRepliesQuery,
  useCommentUpdateMutation,
} from '../../../app/api'
import { ICommentForm } from './../../../app/api'
import { Auth } from '../../../features/auth/auth-slice'

import {
  Box,
  Stack,
  Divider,
  Avatar,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ClapButton from 'react-clap-button'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { ReplyCreate } from '.'
import { CommentOption } from './CommentOption'
import { ReplyList } from './ReplyList'
dayjs.extend(relativeTime)

export interface iCommentDetailProps {
  blogId: number
  comment: IComment
  auth: Auth
}

const CommentItem = ({ blogId, comment, auth }: iCommentDetailProps) => {
  const initialState = {
    content: comment.content,
    up_votes: comment.up_votes,
    is_active: comment.is_active,
    post_id: comment.post_id,
  } as ICommentForm
  const commentId = comment.id
  const replyTo = 13
  const [commentUpdate, setCommentUpdate] = useState(initialState)
  const [openCreateReply, setOpenCreateReply] = useState(false)
  const [openReplyList, setOpenReplyList] = useState(false)
  const { data = [], isFetching } = useRepliesQuery({
    commentId,
    replyTo,
  })
  const [upvoteUpdate, { isSuccess }] = useCommentUpdateMutation()

  const handleUpvote = (currentUpvote) => {
    setCommentUpdate({ ...commentUpdate, ['up_votes']: currentUpvote++ })
    upvoteUpdate({
      id: commentId,
      commentData: { ...commentUpdate, ['up_votes']: currentUpvote++ },
    })
  }

  return (
    <>
      <ListItem dense>
        <Avatar
          sx={{ mb: 'auto', bgcolor: '#f0f0f0ff' }}
          aria-label='user-avatar'
        >
          H
        </Avatar>
        <ListItemText
          primary={
            <Stack direction='row'>
              <Typography variant='subtitle1' color='secondary'>
                {comment?.author?.username}
              </Typography>
              <Typography variant='body2' color='#c0c0c0' m={'5px'}>
                {comment?.created_at ? dayjs(comment.created_at).fromNow() : ''}
              </Typography>
            </Stack>
          }
          secondary={
            <Typography variant='body1'>{comment?.content}</Typography>
          }
          sx={{ ml: '1.5rem', pr: '2rem', userSelect: 'none' }}
        />

        <Stack direction='column'>
          <CommentOption comment={comment} auth={auth} />
        </Stack>
      </ListItem>
      <Stack direction='row' justifyContent='space-between' sx={{ mx: '3rem' }}>
        <Stack direction='row'>
          <Typography variant='body1' mt={1}>
            {comment.up_votes}
          </Typography>
          <IconButton
            color='primary'
            onClick={() => handleUpvote(comment.up_votes)}
            sx={{ maxWidth: 120, justifyContent: 'center' }}
          >
            <img src={process.env.PUBLIC_URL + '/icons/clap.svg'} width={28} />
          </IconButton>
        </Stack>
        {data.length > 0 && (
          <ListItem
            button
            color='secondary'
            onClick={() => setOpenReplyList(!openReplyList)}
            sx={{ width: '10rem', justifyContent: 'center' }}
          >
            {openReplyList ? 'hide' : 'view'} {data.length}{' '}
            {data.length > 1 ? 'replies' : 'reply'}
          </ListItem>
        )}
        <ListItem
          button
          onClick={() => setOpenCreateReply(!openCreateReply)}
          sx={{ width: '5rem', justifyContent: 'center' }}
        >
          Reply
        </ListItem>
      </Stack>
      <Collapse in={openCreateReply}>
        <ReplyCreate
          blogId={comment?.post_id}
          replyTo={13}
          commentId={comment?.id}
        />
      </Collapse>
      <Collapse in={openReplyList}>
        <ReplyList commentId={comment.id} replyTo={13} />
      </Collapse>
    </>
  )
}

export { CommentItem }
