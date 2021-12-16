import { useParams } from 'react-router-dom'
import { useCategoryQuery } from '../../../app/api'

import Spinner from '../../../common/sharedComponents/Spinner'
import { Stack, Typography } from '@mui/material'
import { strToTitle } from '../../../common/helper'
import { BLogCard } from '../BLogCard'

export interface ICategoryListProps {}

function CategoryBlogList(props: ICategoryListProps) {
  let param = useParams()
  const { data: category, isSuccess } = useCategoryQuery(param?.name || '')

  return (
    <>
      <Typography color='secondary' variant='h5'>
        {strToTitle(param?.name)}{' '}
      </Typography>
      <Stack
        spacing={2}
        direction='column'
        sx={{
          mx: 'auto',
          width: '60%',
          minWidth: 600,
        }}
      >
        {isSuccess ? (
          <div>
            {category?.blog_posts !== undefined &&
            category?.blog_posts.length > 0 ? (
              category?.blog_posts.map((blog) => (
                <div key={blog.id}>
                  <Stack
                    spacing={2}
                    direction='column'
                    sx={{
                      my: 'auto',
                      p: 2,
                      maxWidth: '100%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <BLogCard blog={blog} />
                  </Stack>
                </div>
              ))
            ) : (
              <p>This Category has no content.</p>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </Stack>
    </>
  )
}

export { CategoryBlogList }
