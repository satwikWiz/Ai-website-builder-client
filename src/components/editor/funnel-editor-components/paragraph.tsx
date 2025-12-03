'use client'
import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
  element: EditorElement
}

const ParagraphComponent = (props: Props) => {
  const { dispatch, state } = useEditor()

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }
  const styles = props.element.styles

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  return (
    <div
      style={styles}
      className={clsx(
        'w-full relative text-[16px] transition-all break-words overflow-wrap-anywhere',
        {
          'p-[2px] m-[5px]': !state.editor.previewMode && !state.editor.liveMode,
          'p-0 m-0': state.editor.previewMode || state.editor.liveMode,
          '!border-blue-500':
            state.editor.selectedElement.id === props.element.id &&
            !state.editor.previewMode &&
            !state.editor.liveMode,
          '!border-solid': state.editor.selectedElement.id === props.element.id && !state.editor.previewMode && !state.editor.liveMode,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode && !state.editor.previewMode,
          'border-0': state.editor.previewMode || state.editor.liveMode,
        }
      )}
      onClick={!state.editor.previewMode && !state.editor.liveMode ? handleOnClickBody : undefined}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode &&
        !state.editor.previewMode && (
          <Badge className="absolute -top-[23px] bg-[#2e4acd] hover:bg-[#2e4acd] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <p
        className="w-full break-words overflow-wrap-anywhere"
        contentEditable={!state.editor.liveMode && !state.editor.previewMode}
        onBlur={(e) => {
          if (state.editor.previewMode || state.editor.liveMode) return
          const spanElement = e.target as HTMLSpanElement
          dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  innerText: spanElement.innerText,
                },
              },
            },
          })
        }}
      >
        {!Array.isArray(props.element.content) &&
          props.element.content.innerText}
      </p>
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode &&
        !state.editor.previewMode && (
          <div className="absolute bg-[#2e4acd] px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              size={16}
              onClick={handleDeleteElement}
              className ="text-white cursor-pointer"
            />
          </div>
        )}
    </div>
  )
}

export default ParagraphComponent

