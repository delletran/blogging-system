import {
  IComment,
  useCommentUpdateMutation,
  useCommentDeleteMutation,
} from '../../../app/api'
import { Auth } from '../../../features/auth/auth-slice'

import {
  Stack,
  Divider,
  Avatar,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Popup } from 'reactjs-popup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export interface ICommentOptionProps {
  comment: IComment
  auth: Auth
}

export function CommentOption({ comment, auth }: ICommentOptionProps) {
  const [updateComment] = useCommentUpdateMutation()
  const [deleteComment] = useCommentDeleteMutation()
  return (
    <Stack sx={{ ml: 'auto' }}>
      {auth.username === comment.author?.username ? (
        <Popup
          trigger={
            <IconButton aria-label='comment-menu'>
              <MoreVertIcon />
            </IconButton>
          }
          closeOnDocumentClick
          mouseLeaveDelay={300}
          arrow={false}
          position='bottom right'
        >
          {(close: Function) => (
            <List dense>
              <ListItem
                button
                onClick={() => {
                  close()
                }}
              >
                <ListItemText>Edit</ListItemText>
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  deleteComment(comment.id)
                  close()
                }}
              >
                <ListItemText>Delete</ListItemText>
              </ListItem>
              <Divider />
            </List>
          )}
        </Popup>
      ) : (
        <Popup
          trigger={
            <IconButton aria-label='comment-menu'>
              <MoreVertIcon />
            </IconButton>
          }
          closeOnDocumentClick
          mouseLeaveDelay={300}
          arrow={false}
          position='bottom right'
        >
          {(close: Function) => (
            <List dense>
              <ListItem
                button
                onClick={() => {
                  close()
                }}
              >
                <ListItemText>Report this comment</ListItemText>
              </ListItem>
              <Divider />
            </List>
          )}
        </Popup>
      )}
    </Stack>
  )
}
