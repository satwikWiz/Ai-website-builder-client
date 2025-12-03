import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const InputPlaceholder = (props: Props) => {
    const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
        if (type === null) return
        e.dataTransfer.setData('componentType', type)
    }
    return (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'input')}
            className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
        >
            <div className='flex items-center ml-[-11px]'>
            <svg data-wf-icon="AddPanelFormInput64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 25C8 22.7909 9.79086 21 12 21H52C54.2091 21 56 22.7909 56 25V38C56 40.2091 54.2091 42 52 42H12C9.79086 42 8 40.2091 8 38V25Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22H52C53.6569 22 55 23.3431 55 25V38C55 39.6569 53.6569 41 52 41H12C10.3431 41 9 39.6569 9 38V25C9 23.3431 10.3431 22 12 22ZM8 25C8 22.7909 9.79086 21 12 21H52C54.2091 21 56 22.7909 56 25V38C56 40.2091 54.2091 42 52 42H12C9.79086 42 8 40.2091 8 38V25ZM13 26L13 37H14L14 26H13Z" fill="currentColor"></path></svg>        </div>
        </div>
    )
}

export default InputPlaceholder



