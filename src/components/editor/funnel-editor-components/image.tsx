'use client'
import { Badge } from '@/components/ui/badge'
import { EditorBtns, defaultStyles } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = { element: EditorElement }

const ImageComponent = ({ element }: Props) => {
  const { dispatch, state } = useEditor()
  const styles = element.styles

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  return (
    <div
      style={styles}
      draggable={!state.editor.previewMode && !state.editor.liveMode}
      onDragStart={!state.editor.previewMode && !state.editor.liveMode ? (e) => handleDragStart(e, 'image') : undefined}
      onClick={!state.editor.previewMode && !state.editor.liveMode ? handleOnClick : undefined}
      className={clsx(
        'w-full relative transition-all flex items-center justify-center',
        {
          'p-[2px] m-[5px]': !state.editor.previewMode && !state.editor.liveMode,
          'p-0 m-0': state.editor.previewMode || state.editor.liveMode,
          '!border-blue-500': state.editor.selectedElement.id === element.id && !state.editor.previewMode && !state.editor.liveMode,
          '!border-solid': state.editor.selectedElement.id === element.id && !state.editor.previewMode && !state.editor.liveMode,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode && !state.editor.previewMode,
          'border-0': state.editor.previewMode || state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && !state.editor.previewMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}
      {!Array.isArray(element.content) && (
        <img
          src={element.content.src || '/placeholder.svg'}
          alt="image"
          style={{
            width: styles.width ? styles.width : 150,
            height: styles.height ? styles.height : 150,
          }}
        />
      )}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && !state.editor.previewMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash className="cursor-pointer" size={16} onClick={handleDeleteElement} />
        </div>
      )}
    </div>
  )
}

export default ImageComponent

