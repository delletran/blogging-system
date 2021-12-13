import React, { Dispatch, SetStateAction } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export interface IEditorProps {
  state: object
  setState: Dispatch<SetStateAction<any>>
  property: string
}

function Editor({ state, setState, property }: IEditorProps) {
  const inintialData = ''

  return (
    <CKEditor
      editor={ClassicEditor}
      data={inintialData}
      onChange={(event, editor) => {
        const data = editor.getData()
        setState({ ...state, [property]: data || '' })
      }}
    />
  )
}

export default Editor
