import { useState } from 'react'
import { IBlog, useCommentsQuery } from '../../../app/api'

import Spinner from '../../../common/sharedComponents/Spinner'

import { Stack, List } from '@mui/material'
import { CommentItem } from '.'
import { useAppSelector } from '../../../app/hooks'
import { selectAuth } from '../../../features/auth/auth-slice'

export interface ICommentListProps {
  blog?: IBlog
}

function CommentList({ blog }: ICommentListProps) {
  const { data, isSuccess } = useCommentsQuery(blog?.id || 1)
  const auth = useAppSelector(selectAuth)

  return (
    <>
      <Stack
        direction='column'
        sx={{
          maxWidth: '100%',
        }}
      >
        {isSuccess ? (
          data !== undefined && data.length > 0 ? (
            data.map((comment) => (
              <List key={comment.id}>
                <CommentItem
                  blogId={blog?.id || 1}
                  comment={comment}
                  auth={auth}
                />
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
export { CommentList }
