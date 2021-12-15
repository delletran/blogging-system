// import { useParams } from 'react-router-dom'
import { useCategoriesQuery } from '../../../app/api'

import Spinner from '../../../common/sharedComponents/Spinner'
import { Stack, Typography } from '@mui/material'

export interface ICategoryListProps {}

function CategoryList(props: ICategoryListProps) {
  // let param = useParams()
  const { data: categories, isFetching } = useCategoriesQuery()

  return (
    <>
      <Typography variant='h5'>From CategoryList</Typography>
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
        {!isFetching ? (
          categories?.map((category) => (
            <div key={category.id}>
              <Typography variant='body1'>{category.name}</Typography>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </Stack>
    </>
  )
}

export { CategoryList }
