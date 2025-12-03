import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const ButtonPlaceholder = (props: Props) => {
    const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
        if (type === null) return
        e.dataTransfer.setData('componentType', type)
    }
    return (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'button')}
            className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
        >
            <div className='flex items-center ml-[-11px]'>
            <svg data-wf-icon="AddPanelButton64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 21C12.2386 21 10 23.2386 10 26V38C10 40.7614 12.2386 43 15 43H49C51.7614 43 54 40.7614 54 38V26C54 23.2386 51.7614 21 49 21H15ZM20 32H44V31H20V32Z" fill="currentColor"></path></svg>      </div>
        </div>
    )
}

export default ButtonPlaceholder



