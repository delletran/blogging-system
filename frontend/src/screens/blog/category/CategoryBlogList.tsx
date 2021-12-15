// import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCategoriesQuery } from '../../../app/api'

import Spinner from '../../../common/sharedComponents/Spinner'
import { Stack, Typography } from '@mui/material'
import { strToTitle } from '../../../common/helper'
import { BLogCard } from '../BLogCard'

export interface ICategoryListProps {}

function CategoryBlogList(props: ICategoryListProps) {
  let param = useParams()
  const { data: categories, isSuccess } = useCategoriesQuery(param?.name || '')

  // useEffect(() => {
  //   categories && console.log(categories)
  // }, [isSuccess, categories])

  return (
    <>
      <Typography color='secondary' variant='h5'>
        {strToTitle(param?.name)}{' '}
      </Typography>
      <Stack
        spacing={2}
        direction='column'
        sx={{
          my: 'auto',
          p: 4,
          maxWidth: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        {isSuccess ? (
          categories?.map((category) => (
            <div key={category.id}>
              {category?.blog_posts !== undefined
                ? category?.blog_posts.map((blog) => (
                    <div key={blog.id}>
                      <BLogCard blog={blog} />
                    </div>
                  ))
                : null}
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </Stack>
    </>
  )
}

export { CategoryBlogList }
