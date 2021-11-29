import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Auth } from '../features/auth/auth-slice'
import axios from 'axios';




export const baseUrl = 'http://127.0.0.1:8000/api'
// const express = require('express')
// const app = express()
export interface IUser {
  id: number;
  username: string;
  email: string;
  is_admin?: boolean;
  is_superuser?: boolean;
}
export interface IProfile {
  id: number;
  user: number;
  first_name: string | null;
  last_name: string | null;
  avatar?: File;
}

export interface IUpdateFormProps {
  user: number
  first_name: string
  last_name: string
  // avatar: File
}


export interface Credentials {
  email: string;
  password: string;
}

export const appApi = createApi({
  reducerPath: 'app',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const data = JSON.parse(localStorage.getItem("userCredentials") as string) as Auth
      data?.access &&
        headers.set('Authorization', `Bearer ${data.access}`)
      headers.set('Content-type', `application/json`)
      return headers
    },
  }),
  tagTypes: ['User', 'Profile', 'Token'],
  endpoints(builder) {
    return {
      users: builder.query<IUser[], void>({
        query: () => `/users/`,
        providesTags: ['User']
      }),
      user: builder.query<IUser, string>({
        query: (username) => `/users/${username}/`,
        providesTags: ['User']
      }),
      userProfiles: builder.query<IProfile, void>({
        query: () => `/user-profiles/`,
        providesTags: ['Profile']
      }),
      userProfile: builder.query<IProfile, number>({
        query: (id) => `/user-profiles/${id}/`,
        providesTags: ['Profile']
      }),
      updateProfile: builder.mutation<IUpdateFormProps, any>({
        query: ({ userId, profileData }) => ({
          url: `/user-profiles/${1}/`,
          headers: {
            'Accept': 'application/json',
            'content-type': 'multipart/form-data',
          },
          method: "PUT",
          body: profileData
        }),
        invalidatesTags: ['Profile']
      }),
      _updateUserProfile: builder.mutation({
        async queryFn(userData, _queryApi, _extraOptions, fetchWithBQ) {
          const formData = new FormData();
          formData.set('user', userData.user);
          userData.avatar && formData.append('avatar', userData.avatar);
          formData.append('first_name', userData.first_name);
          formData.append('last_name', userData.last_name);
          const response: any = await axios.put(
            `${baseUrl}/user-profiles/${userData.user}/`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          if (response.error) throw response.error;
          return response.data ? { data: response.data } : { error: response.error };
        },
        invalidatesTags: ['Profile']
      }),
      updateUserProfile: builder.mutation({
        async queryFn(userData, _queryApi, _extraOptions, fetchWithBQ) {
          const formData = new FormData();
          formData.set('user', userData.user);
          userData.avatar && formData.append('avatar', userData.avatar);
          formData.append('first_name', userData.first_name);
          formData.append('last_name', userData.last_name);
          const response = await fetchWithBQ({
            url: `${baseUrl}/user-profiles/${1}/`,
            method: 'PUT',
            body: formData,
          });
          if (response.error) throw response.error;
          return response.data ? { data: response.data } : { error: response.error };
        },
        invalidatesTags: ['Profile']
      }),
      signup: builder.mutation<IUser, Omit<IUser, 'id'>>({
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

export const {
  useUsersQuery,
  useUserQuery,
  useUserProfileQuery,
  useUserProfilesQuery,
  useSignupMutation,
  useSigninMutation,
  useUpdateProfileMutation,
  use_updateUserProfileMutation
} = appApi

export default appApi