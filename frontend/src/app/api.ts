import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Auth } from '../features/auth/auth-slice'
export const baseUrl = 'http://127.0.0.1:8000/api'

export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_admin?: boolean;
  is_superuser?: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}
// export interface Auth {
//   isAusthenticated: boolean;
//   userEmail?: string | null;
//   refresh: string | null;
//   access: string | null;
//   accessExpiration?: string | null,
//   refreshExpiration?: string | null
// }


export const appApi = createApi({
  reducerPath: 'app',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const accessToken = localStorage.getItem("access")
      accessToken &&
        headers.set('Authorization', `Bearer ${accessToken}`);
      return headers
    },
  }),
  tagTypes: ['User', 'Token'],
  endpoints(builder) {
    return {
      users: builder.query<User[], void>({
        query: () => `/users/`,
        providesTags: ['User']
      }),
      user: builder.query<User, number>({
        query: (id) => `/users/${id}/`,
        providesTags: ['User']
      }),
      signup: builder.mutation<User, Omit<User, 'id'>>({
        query: (userData) => ({
          url: `/users/`,
          method: "POST",
          body: userData
        }),
        invalidatesTags: ['User']
      }),
      signin: builder.mutation<Auth, Credentials>({
        query: (credentials) => ({
          url: `/token/`,
          method: "POST",
          body: credentials
        }),
      })
    }
  },
})


export const { useUsersQuery, useUserQuery, useSignupMutation, useSigninMutation } = appApi

export default appApi