import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const HeadingPlaceholder = (props: Props) => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, 'heading')
      }}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
         <div className=' '>
        <svg data-wf-icon="AddPanelHeading64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 21V27.5M16.5 33V27.5M16.5 27.5H23.5V21V33" stroke="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="currentColor" fill-opacity="0.22"></path></svg>
        </div>
    </div>
  )
}

export default HeadingPlaceholder



