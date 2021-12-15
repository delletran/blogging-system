import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Auth } from '../features/auth/auth-slice'




export const baseUrl = 'http://127.0.0.1:8000/api'
// const express = require('express')
// const app = express()
export interface IUser {
  id: number
  username: string
  email: string
  is_admin?: boolean
  is_superuser?: boolean
}
export interface IProfile {
  id: number
  user: number
  first_name: string | null
  last_name: string | null
  avatar?: File
}

export interface IBlog {
  id: number
  title: string
  description?: string
  body?: string
  author: IUser
  tags?: []
  slug: string
  published_at?: Date
  created_at?: Date
}
export interface IPaginatedBlog {
  next_page: number | null
  previous_page: number | null
  current_page: number
  total_data: number
  total_pages: number
  results: IBlog[];
}
export interface IBlogForm {
  title: string
  description?: string
  body?: string
  tags?: []
  slug: string
  published_at?: Date
}
export interface ICategory {
  id: string
  name: string
  is_active: boolean
  blog_posts?: IBlog[]
}
export interface ICategoryForm {
  name: string
  is_active: boolean
  blog_posts?: []
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
  tagTypes: ['User', 'Profile', 'Token', 'Blog', 'Categories'],
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
      }),
      blogs: builder.query<IBlog[], { search: string, slug: string[] }>({
        query: ({ search, slug }) => `/blogs/?search=${search}&slug__in=${slug.join("%2c")}`,
        providesTags: ['Blog']
      }),
      paginatedBlogs: builder.query<IPaginatedBlog, { page: number, search: string, slug: string[] }>({
        query: ({ page = 1, search, slug }) => `/blogs/?page=${page}&search=${search}&slug__in=${slug.join("%2c")}`,
        providesTags: ['Blog']
      }),
      blog: builder.query<IBlog, string>({
        query: (slug = '') => `/blogs/${slug}/`,
        providesTags: ['Blog']
      }),
      blogCreate: builder.mutation<IBlog, IBlogForm>({
        query: (blogData) => ({
          url: `/blogs/`,
          method: "POST",
          body: blogData
        }),
        invalidatesTags: ['Blog']
      }),
      blogUpdate: builder.mutation<IBlog, { blogSlug: string, blogData: IBlogForm }>({
        query: ({ blogSlug, blogData }) => ({
          url: `/blogs/${blogSlug}/`,
          method: "PUT",
          body: blogData
        }),
        invalidatesTags: ['Blog']
      }),
      blogDelete: builder.mutation<IBlog, string>({
        query: (blogSlug = '') => ({
          url: `/blogs/${blogSlug}/`,
          method: "DELETE",
        }),
        invalidatesTags: ['Blog']
      }),
      categories: builder.query<ICategory[], void | string>({
        query: (name = '') => `/categories/?name=${name}`,
        providesTags: ['Categories']
      }),
      category: builder.query<ICategory, string>({
        query: () => `categories/`,
        providesTags: ['Categories']
      }),
      categoryCreate: builder.mutation<ICategory, ICategoryForm>({
        query: (categoryData) => ({
          url: `/categories/`,
          method: "POST",
          body: categoryData
        }),
        invalidatesTags: ['Categories']
      }),
      categoryUpdate: builder.mutation<ICategory, { id: number, categoryData: ICategoryForm }>({
        query: ({ id, categoryData }) => ({
          url: `/categories/${id}/`,
          method: "PUT",
          body: categoryData
        }),
        invalidatesTags: ['Categories']
      }),
      categoryDelete: builder.mutation<ICategory, number>({
        query: (id = 0) => ({
          url: `/categories/${id}/`,
          method: "DELETE",
        }),
        invalidatesTags: ['Categories']
      }),
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

  useBlogsQuery,
  usePaginatedBlogsQuery,
  useBlogQuery,
  useBlogCreateMutation,
  useBlogUpdateMutation,
  useBlogDeleteMutation,

  useCategoriesQuery,
  useCategoryQuery,
  useCategoryCreateMutation,
  useCategoryUpdateMutation,
  useCategoryDeleteMutation,
} = appApi

export default appApi