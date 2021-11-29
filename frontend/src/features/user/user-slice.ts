import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

import { baseUrl } from '../../app/api'
import { RootState } from '../../app/store';

export interface IUserProfileProps {
  id?: number,
  user: number | null,
  first_name: string | null,
  last_name: string | null,
  avatar?: File;
  status: string | null,
}

export interface IUserAvatarProps {
  user: number | null,
  avatar?: File;
}

const initialState: IUserProfileProps = {
  user: 0,
  first_name: null,
  last_name: null,
  status: null
}

const updateUserProfile = createAsyncThunk(
  'update/user-profile',
  async (userData: Omit<IUserProfileProps, 'status'>) => {
    const url = `${baseUrl}/user-profiles/${userData.user}/`
    const formData = new FormData()
    formData.set('user', `${userData.user}`)
    formData.append('first_name', `${userData.first_name}`);
    formData.append('last_name', `${userData.last_name}`);
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials") as string)
    const response = await axios.put(url, formData, {
      headers: {
        "Authorization": `Bearer ${userCredentials.access}`,
        'content-type': 'multipart/form-data'
      }
    })
    return response.data
  }
)

const updateUserAvatar = createAsyncThunk(
  'update/avatar',
  async (userData: IUserAvatarProps) => {
    const url = `${baseUrl}/user-profiles/${userData.user}/`
    const formData = new FormData()
    formData.set('user', `${userData.user}`)
    userData.avatar && formData.append('avatar', userData.avatar);
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials") as string)
    const response = await axios.put(url, formData, {
      headers: {
        "Authorization": `Bearer ${userCredentials.access}`,
        'content-type': 'multipart/form-data'
      }
    })
    return response.data
  }
)

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, {

    }: PayloadAction<IUserProfileProps>) {
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }: PayloadAction<IUserProfileProps, string>) => {
        updateProfile(state, payload)
        state.status = 'fulfilled'
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }: PayloadAction<IUserProfileProps, string>) => {
        updateProfile(state, payload)
        state.status = 'fulfilled'
      })
      .addCase(updateUserAvatar.rejected, (state) => {
        state.status = 'rejected'
      })
  }
});


const updateProfile = (state: IUserProfileProps, { id, user, first_name, last_name, avatar }: IUserProfileProps) => {
  state.id = id
  state.user = user
  state.first_name = first_name
  state.last_name = last_name
  state.avatar = avatar
}


export const { setUserData } = userSlice.actions;
export const selectUser = (state: RootState) => state.user
export { updateUserProfile, updateUserAvatar }
export default userSlice.reducer
