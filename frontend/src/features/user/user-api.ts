import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import baseUrl from '../../app/api'


export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_admin?: boolean;
  is_superuser?: boolean;
}

interface CounterState {
  value: number;
}

type UserProps = {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  password2: string;
}

const initialState: CounterState = {
  value: 0
}


const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state) {
      state.value++ //immer track mutation and covert it to proper immutable update
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload
    }
  }
})


export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const accessToken = localStorage.getItem("accessToken")
      accessToken &&
        headers.set('Authorization', `Bearer ${accessToken}`);

      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints(builder) {
    return {
      users: builder.query<User[], void>({
        query: () => `/users/`,
        providesTags: ['User']
      }),
      user: builder.query<User, number | void>({
        query: (id) => `/users/${id}/`,
        providesTags: ['User']
      }),
      signupUser: builder.mutation<User, Omit<User, 'id'>>({
        query: (userData) => ({
          url: `/users/`,
          method: "POST",
          body: userData
        }),
        invalidatesTags: ['User']
      }),
    }
  },
})

export const { useUsersQuery, useUserQuery, useSignupUserMutation } = userApi
export default userApi
