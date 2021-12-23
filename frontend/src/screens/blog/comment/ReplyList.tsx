import { useState } from 'react'
import { useRepliesQuery } from '../../../app/api'

import Spinner from '../../../common/sharedComponents/Spinner'

import { Stack, List } from '@mui/material'
import { ReplyItem } from '.'
import { useAppSelector } from '../../../app/hooks'
import { selectAuth } from '../../../features/auth/auth-slice'

export interface ICommentListProps {
  commentId: number
  replyTo: number
}

function ReplyList({ commentId, replyTo }: ICommentListProps) {
  const { data, isSuccess } = useRepliesQuery({ commentId, replyTo })
  const auth = useAppSelector(selectAuth)

  return (
    <>
      <Stack
        direction='column'
        sx={{
          maxWidth: '100%',
        }}
      >
        {isSuccess && commentId ? (
          data !== undefined && data.length > 0 ? (
            data.map((comment) => (
              <List key={comment.id}>
                <ReplyItem comment={comment} auth={auth} />
              </List>
            ))
          ) : (
            <p>Be the first one to comment</p>
          )
        ) : null}
      </Stack>
    </>
  )
}
export { ReplyList }
