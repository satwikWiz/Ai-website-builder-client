'use client'
import { Button } from '@/components/ui/button'
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { EyeOff } from 'lucide-react'
import React, { useEffect } from 'react'
import Recursive from './funnel-editor-components/recursive'

type Props = { liveMode?: boolean; hidePreviewIcon?: boolean }

const FunnelEditor = ({ liveMode, hidePreviewIcon = false }: Props) => {
  const { dispatch, state } = useEditor()

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: 'TOGGLE_LIVE_MODE',
        payload: { value: true },
      })
    }
  }, [liveMode])

  const handleClick = () => {
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {},
    })
  }

  const handleUnpreview = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }
  return (
    <div
      className={clsx(
        'use-automation-zoom-in h-full overflow-x-hidden overflow-y-auto no-scrollbar dark:text-white gap-5 bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 rounded-2xl shadow-2xl shadow-black/5 backdrop-blur-sm transition-all duration-300 p-8 min-h-full break-words',
        {
          '!p-0 !border-0 !shadow-none !bg-transparent':
            state.editor.previewMode === true || state.editor.liveMode === true,
          'w-full max-w-full': state.editor.device === 'Desktop',
          '!w-[850px] max-w-[850px]': state.editor.device === 'Tablet',
          '!w-[420px] max-w-[420px]': state.editor.device === 'Mobile',
        }
      )}
      style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && !hidePreviewIcon && (
        <Button
          variant={'ghost'}
          size={'icon'}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive
            key={childElement.id}
            element={childElement}
          />
        ))}
    </div>
  )
}

export default FunnelEditor

