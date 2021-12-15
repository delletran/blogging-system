import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'
import { Auth, signout } from '../../features/auth/auth-slice'
import { IProfile, useCategoriesQuery } from '../../app/api'

import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
} from '@mui/material'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Fragment } from 'react'

export interface IBSAppBarProps {
  appName: string
  auth: Auth
  userData: IProfile
}

const BSAppBar = ({ auth, appName, userData }: IBSAppBarProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { data: categories = [], isSuccess } = useCategoriesQuery()

  const handleProfile = () => {
    navigate('/profile')
  }

  const handleManagement = () => {
    navigate('/admin')
  }

  const handleSignout = () => {
    dispatch(signout())
    navigate('/signin')
  }

  const handleBlog = (category) => {
    navigate(`/blog/category/${category}`)
  }

  return (
    <Box color='primary' sx={{ flexGrow: 1 }}>
      <AppBar position='static' style={{ background: '#032b8a' }}>
        <Toolbar color='primary'>
          <IconButton
            size='medium'
            edge='start'
            color='inherit'
            sx={{ mr: 2 }}
            onClick={() => navigate(`/signin`)}
          >
            <HistoryEduIcon fontSize='large' />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, textAlign: 'left' }}
          >
            {appName}
          </Typography>
          <Stack direction='row' spacing={2} sx={{ mr: '5rem' }}>
            {auth.isAuthenticated ? (
              <>
                <Popup
                  trigger={
                    <Button
                      color='inherit'
                      endIcon={<ArrowDropDownIcon fontSize='medium' />}
                      onClick={() => navigate(`/blog`)}
                    >
                      Blog
                    </Button>
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
                          navigate('/blog')
                          close()
                        }}
                      >
                        <ListItemText>All</ListItemText>
                      </ListItem>
                      <Divider />
                      {isSuccess
                        ? categories?.map((category) => (
                            <Fragment key={category.id}>
                              <ListItem
                                button
                                onClick={() => {
                                  handleBlog(category.name)
                                  close()
                                }}
                              >
                                <ListItemText
                                  primary={category.name}
                                ></ListItemText>
                              </ListItem>
                              <Divider />
                            </Fragment>
                          ))
                        : null}
                    </List>
                  )}
                </Popup>
              </>
            ) : null}
          </Stack>
          {auth.isAuthenticated ? (
            <Popup
              trigger={
                <Button variant='outlined' color='inherit'>
                  <Avatar alt='Profile' src={`${userData?.avatar}`} />
                  <KeyboardArrowDownIcon fontSize='small' />
                </Button>
              }
              closeOnDocumentClick
              mouseLeaveDelay={300}
              arrow={false}
              position='bottom right'
            >
              {(close: Function) => (
                <List>
                  <Divider />
                  <ListItem
                    button
                    onClick={() => {
                      handleProfile()
                      close()
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </ListItem>
                  <Divider />
                  {auth.is_admin && (
                    <>
                      <ListItem
                        button
                        onClick={() => {
                          handleManagement()
                          close()
                        }}
                      >
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Admin</ListItemText>
                      </ListItem>
                      <Divider />
                    </>
                  )}
                  <ListItem
                    button
                    onClick={() => {
                      handleSignout()
                      close()
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Signout</ListItemText>
                  </ListItem>
                  <Divider />
                </List>
              )}
            </Popup>
          ) : (
            <Button
              variant='contained'
              endIcon={<LoginIcon />}
              color='secondary'
              sx={{ mr: 2 }}
              onClick={() => navigate(`/signin`)}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export { BSAppBar }
