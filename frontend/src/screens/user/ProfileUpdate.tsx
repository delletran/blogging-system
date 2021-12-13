import React, { useEffect, useState } from 'react'

import {
  updateUserProfile,
  updateUserAvatar,
  selectUser,
} from '../../features/user/user-slice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { Avatar, Button } from '@mui/material'
import { IUserProfileProps } from './UserProfile'
// TODO: Change to drag and drop image upload
// import Dropzone from 'react-dropzone'
export interface IUpdateFormProps {
  user: number
  first_name: string
  last_name: string
}

export interface IUpdateAvatarProps {
  user: number
  avatar: File
}

const ProfileUpdateForm = ({ auth, userData: data }: IUserProfileProps) => {
  const { status } = useAppSelector(selectUser)
  const [userData, setData] = useState({
    user: auth.id,
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
  } as IUpdateFormProps)
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setData({ ...userData, [name]: value })
  }

  const handleSubmit = (event: React.MouseEvent): void => {
    updateUserProfile(userData)
    dispatch(updateUserProfile(userData))
  }

  useEffect(() => {
    setData({
      user: auth?.id || 0,
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
    })
  }, [data, auth])

  return (
    <div className='App'>
      <form onSubmit={(e) => e.preventDefault()}>
        <p>
          <input
            type='text'
            placeholder='First Name'
            name='first_name'
            value={userData.first_name}
            onChange={(e) => handleChange(e)}
            required
          />
        </p>
        <p>
          <input
            type='text'
            placeholder='Last Name'
            name='last_name'
            value={userData.last_name}
            onChange={(e) => handleChange(e)}
          />
        </p>
        <Button
          variant='contained'
          component='span'
          disabled={status === 'pending' && true}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </form>
    </div>
  )
}

const ProfileUpdateImage = ({ auth, userData: data }: IUserProfileProps) => {
  const [userAvatar, setUserAvatar] = useState({
    user: 1,
  } as IUpdateAvatarProps)
  const [preview, setPreview] = useState('')
  const { status } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { files }: { files: any } = event.target
    setUserAvatar({ ...userAvatar, avatar: files[0] })
  }

  const handleSubmit = (event: React.MouseEvent): void => {
    dispatch(updateUserAvatar(userAvatar))
  }

  useEffect(() => {
    const url = userAvatar.avatar && URL.createObjectURL(userAvatar.avatar)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [userAvatar])

  return (
    <div className='App'>
      {/* TODO: Change to drag and drop image upload */}
      {/* <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone> */}
      <Avatar
        alt='avatar'
        src={`${userAvatar.avatar ? preview : data?.avatar}`}
        sx={{ m: 'auto', height: 250, width: 250 }}
      />

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='file'
          name='avatar'
          accept='image/png, image/jpeg, image/gif'
          onChange={handleImageChange}
          required
        />
        <br />
        <br />
        <Button
          variant='contained'
          component='span'
          disabled={status === 'pending' && true}
          onClick={handleSubmit}
        >
          Upload
        </Button>
      </form>
    </div>
  )
}

export { ProfileUpdateForm, ProfileUpdateImage }
