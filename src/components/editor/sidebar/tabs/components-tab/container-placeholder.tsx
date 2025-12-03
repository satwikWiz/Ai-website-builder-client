import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const ContainerPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'container')}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
      <div className=' flex items-center ml-[-11px]'>
      <svg data-wf-icon="AddPanelContainer64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13H53C54.1046 13 55 13.8954 55 15V49C55 50.1046 54.1046 51 53 51H11C9.89543 51 9 50.1046 9 49V15C9 13.8954 9.89543 13 11 13ZM8 15C8 13.3431 9.34315 12 11 12H53C54.6569 12 56 13.3431 56 15V49C56 50.6569 54.6569 52 53 52H11C9.34315 52 8 50.6569 8 49V15ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17ZM19 16C19 16.5523 18.5523 17 18 17C17.4477 17 17 16.5523 17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16Z" fill="currentColor" fill-opacity="0.22"></path><rect x="17.5" y="19.5" width="29" height="29" rx="0.5" stroke="currentColor"></rect></svg>
      </div>
    </div>
  )
}

export default ContainerPlaceholder



