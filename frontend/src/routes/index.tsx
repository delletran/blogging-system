import { Routes, Route } from 'react-router-dom'

import { Auth } from './../features/auth/auth-slice'

import AuthRequiredRoute from './AuthRequiredRoute'
import AdminRequiredRoute from './AdminRequiredRoute'

import { IProfile } from './../app/api'

import { UserSignup, UserSignin } from '../screens/auth'
import { UserManagement } from '../screens/admin'
import UserList from './../screens/user/UserList'
import UserProfile from '../screens/user/UserProfile'
import Homepage from '../screens/homepage/Homepage'
import Blog from '../screens/blog/Blog'
import {
  BlogDetails,
  BlogCreate,
  BlogUpdate,
  BlogDelete,
} from './../screens/blog'
import {
  Category,
  CategoryBlogList,
  CategoryCreate,
  CategoryList,
  CategoryUpdate,
  CategoryDelete,
} from './../screens/blog/category'

import CKEditorTest from '../screens/test/CKEditorTest'
import Tinymce from '../screens/test/Tinymce'
import Comment from '../screens/blog/comment/Comment'
import { CommentList } from '../screens/blog/comment'

export interface IAppRoutesProps {
  auth: Auth
  userData?: IProfile
}

const AppRoutes = ({ auth, userData }: IAppRoutesProps) => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/signin' element={<UserSignin auth={auth} />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/blog/create' element={<BlogCreate />} />
      <Route path='/blog/category' element={<Category />} />
      <Route path='/blog/category/:name' element={<CategoryBlogList />} />
      <Route path='/blog/:slug' element={<BlogDetails auth={auth} />} />
      <Route path='/blog/:slug/update' element={<BlogUpdate />} />
      <Route
        path='/blog/:slug/delete'
        element={
          <AdminRequiredRoute auth={auth}>
            <BlogDelete />
          </AdminRequiredRoute>
        }
      />
      <Route
        path='/category/create'
        element={
          <AdminRequiredRoute auth={auth}>
            <CategoryCreate />
          </AdminRequiredRoute>
        }
      />
      <Route
        path='/category/'
        element={
          <AdminRequiredRoute auth={auth}>
            <CategoryList />
          </AdminRequiredRoute>
        }
      />
      <Route path='/category/:name/update' element={<CategoryUpdate />} />
      <Route path='/category/:name/delete' element={<CategoryDelete />} />

      <Route
        path='/blog/create'
        element={
          <AdminRequiredRoute auth={auth}>
            <UserList auth={auth} />
          </AdminRequiredRoute>
        }
      />
      <Route path='/ck-test' element={<CKEditorTest />} />
      <Route path='/tinymce-test' element={<Tinymce />} />
      <Route path='/comment' element={<Comment />} />
      <Route path='/comment-list' element={<CommentList />} />
      <Route
        path='/profile'
        element={
          <AuthRequiredRoute auth={auth}>
            <UserProfile auth={auth} userData={userData} />
          </AuthRequiredRoute>
        }
      />
      <Route
        path='/admin'
        element={
          <AuthRequiredRoute auth={auth}>
            <UserManagement auth={auth} />
          </AuthRequiredRoute>
        }
      />
      <Route
        path='/user-list'
        element={
          <AdminRequiredRoute auth={auth}>
            <UserList auth={auth} />
          </AdminRequiredRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
