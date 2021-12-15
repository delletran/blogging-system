import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

import { baseUrl } from '../../app/api'
import { RootState } from '../../app/store';

export interface Auth {
  isAuthenticated?: boolean
  id: number | undefined
  username?: string | undefined
  userEmail?: string | undefined
  refresh: string | null
  access: string | null
  is_admin: boolean | null
  status?: string | null
}

const timeout = {
  access: 600,
  refresh: 21600,
  getAuth: 1,
  accessTimer: setTimeout(() => { }, 1000),
  refreshTimer: setTimeout(() => { }, 1000),
  getAuthTimer: setTimeout(() => { }, 1000),
}

const initialState: Auth = {
  isAuthenticated: false,
  id: undefined,
  username: undefined,
  userEmail: undefined,
  access: null,
  refresh: null,
  is_admin: null,
  status: null,
}

const getAuthData = createAsyncThunk(
  'auth/data',
  async () => {
    const data = JSON.parse(localStorage.getItem("userCredentials") as string)
    const response = await axios.get(`${baseUrl}/auth/`, {
      headers: {
        "Authorization": `Bearer ${data.access}`
      }
    })
    return response.data
  }
)


const renewAccess = createAsyncThunk(
  'token/refresh',
  async (obj, { dispatch }) => {
    const data = JSON.parse(localStorage.getItem("userCredentials") as string) as Auth
    const refresh = data.refresh
    const response = await axios.post(`${baseUrl}/token/refresh/`, { refresh })
    return response.data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<Auth>) {
      setCredentials(state, payload)
    },
    signout(state) {
      localStorage.removeItem("userCredentials")
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(renewAccess.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(renewAccess.fulfilled, (state, { payload }: PayloadAction<Auth, string>) => {
        updateCredentials(state, payload)
        state.status = 'fulfilled'
      })
      .addCase(renewAccess.rejected, (state) => {
        state.status = 'rejected'
      })
      .addCase(getAuthData.fulfilled, (state, { payload }: PayloadAction<{ is_admin: boolean, username: string }, string>) => {
        state.is_admin = payload.is_admin
        state.username = payload.username
      })
  }
});


const setCredentials = (state: Auth, { id, username, userEmail, access, refresh, is_admin }: Auth) => {
  const accessExpiration = new Date(new Date().getTime() + timeout.access * 1000)
  const refreshExpiration = new Date(new Date().getTime() + timeout.refresh * 1000)
  const userCredentials = { id, username, userEmail, access, refresh, accessExpiration, refreshExpiration }

  localStorage.setItem("userCredentials", JSON.stringify(userCredentials))
  state.isAuthenticated = true
  state.userEmail = userEmail
  state.id = id
  state.access = access
  state.refresh = refresh
  state.is_admin = is_admin
  state.username = username
}

const updateCredentials = (state: Auth, payload: Auth) => {
  const accessExpiration = new Date(new Date().getTime() + timeout.access * 1000)
  const oldCredentials = JSON.parse(localStorage.getItem("userCredentials") as string)
  const userCredentials = { ...oldCredentials, ...payload, accessExpiration }

  localStorage.setItem("userCredentials", JSON.stringify(userCredentials))
  state.isAuthenticated = true
  state.id = userCredentials.id
  state.access = userCredentials.access
  state.refresh = userCredentials.refresh
}

const authCheckState = () => {
  return (dispatch: any) => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials") as string)

    if (userCredentials) {
      if (userCredentials.refresh === undefined) {
        dispatch(signout())
      }
      else {
        if (userCredentials.refreshExpiration <= new Date()) {
          dispatch(signout())
        } else {
          resetAccessTimeout(dispatch)
          setRefreshTimeout(dispatch)
        }
      }
    }
  }
}

const getAuthUserData = () => {
  return (dispatch: any) => {
    clearTimeout(timeout.getAuthTimer)
    timeout.getAuthTimer = setTimeout(() => {
      dispatch(getAuthData())
    }, timeout.getAuth * 0)
  }
}

const resetAccessTimeout = (dispatch: any, accessExpiration = timeout.access) => {
  clearTimeout(timeout.accessTimer)
  timeout.accessTimer = setTimeout(() => {
    dispatch(renewAccess())
  }, accessExpiration * 1000)
}

const setRefreshTimeout = (dispatch: any, refreshExpiration = timeout.refresh) => {
  clearTimeout(timeout.refreshTimer)
  timeout.refreshTimer = setTimeout(() => {
    dispatch(signout())
  }, refreshExpiration * 1000)
}


export const { setToken, signout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth
export { authCheckState, renewAccess, getAuthUserData }
export default authSlice.reducer
