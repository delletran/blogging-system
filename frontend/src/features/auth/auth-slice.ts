import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

import { baseUrl } from '../../app/api'

export interface Auth {
  isAuthenticated?: boolean;
  userEmail?: string | null;
  refresh: string | null;
  access: string | null;
  is_admin: boolean | null,
  status?: string | null
}


const timeout = {
  access: 600,
  refresh: 21600,
  accessTimer: setTimeout(() => { }, 10000),
  refreshTimer: setTimeout(() => { }, 10000)
}


const initialState: Auth = {
  isAuthenticated: false,
  userEmail: null,
  access: null,
  refresh: null,
  is_admin: null,
  status: null
}

const renewAccess = createAsyncThunk(
  'token/refresh',
  async () => {
    const refresh = JSON.parse(localStorage.getItem("userCredentials") as string).refresh
    const response = await axios.post(`${baseUrl}/token/refresh/`, { refresh })
    return response.data
  }
)

const getUserDetails = createAsyncThunk(
  'user/details',
  async (id: number) => {
    const response = await axios.get(`${baseUrl}/token/${id}/`)
    return response.data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<Auth>) {
      setCredentials(state, payload)
      state.status = 'fulfilled'
    },
    signout(state) {
      state.isAuthenticated = false
      localStorage.removeItem("userCredentials")
      console.log("signout...")
      state.status = null
    },
    refresh(state, { payload }: PayloadAction<{ access: string }>) {
      console.log(payload)
      const accessExpiration = new Date(new Date().getTime() + timeout.access * 1000)
      const data = JSON.parse(localStorage.getItem("userCredentials") as string)
      localStorage.setItem("userCredentials", JSON.stringify({
        ...data,
        ...payload,
        accessExpiration
      }))
    }
  },
  extraReducers: builder => {
    builder
      .addCase(renewAccess.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(renewAccess.fulfilled, (state, { payload }: PayloadAction<{}, string>) => {
        const accessExpiration = new Date(new Date().getTime() + timeout.access * 1000)
        const refreshExpiration = new Date(new Date().getTime() + timeout.refresh * 1000)

        const oldCredentials = JSON.parse(localStorage.getItem("userCredentials") as string)
        const userCredentials = { ...oldCredentials, ...payload, accessExpiration, refreshExpiration }
        localStorage.setItem("userCredentials", JSON.stringify(userCredentials))
        state.isAuthenticated = true
        state.userEmail = userCredentials.userEmail
        state.access = userCredentials.access
        state.refresh = userCredentials.refresh
        state.status = 'fulfilled'
      })
      .addCase(renewAccess.rejected, (state, { payload }) => {
        state.status = 'rejected'
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.is_admin = payload.is_admin
      })
  }
});


const setCredentials = (state: Auth, { userEmail, access, refresh }: Auth) => {
  const accessExpiration = new Date(new Date().getTime() + timeout.access * 1000)
  const refreshExpiration = new Date(new Date().getTime() + timeout.refresh * 1000)
  const userCredentials = { userEmail, access, refresh, accessExpiration, refreshExpiration }

  localStorage.setItem("userCredentials", JSON.stringify(userCredentials))
  state.isAuthenticated = true
  state.userEmail = userEmail
  state.access = access
  state.refresh = refresh
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


export const { setToken, signout, refresh, } = authSlice.actions;
export { authCheckState, renewAccess }
export default authSlice.reducer
