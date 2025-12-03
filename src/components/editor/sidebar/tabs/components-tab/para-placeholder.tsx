import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const ParaPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'paragraph')}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
        <div className='flex items-center ml-[-11px]'>
        <svg data-wf-icon="AddPanelParagraph64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M52 27H12V26H52V27ZM52 33H12V32H52V33ZM12 39L32 39V38L12 38V39Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default ParaPlaceholder



