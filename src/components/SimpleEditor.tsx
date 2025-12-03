'use client'

import { useEffect } from 'react'
import { useEditor, DeviceTypes } from '@/providers/editor/editor-provider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Eye, EyeOff, Save, Laptop, Tablet, Smartphone } from 'lucide-react'
import { toast } from 'sonner'
import clsx from 'clsx'
import FunnelEditor from './editor'
import EditorSidebar from './editor/sidebar'

const API_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001'

export default function SimpleEditor({ 
  variantId, 
  initialElements,
  previewMode: initialPreviewMode = false
}: { 
  variantId: string
  initialElements: any[]
  previewMode?: boolean
}) {
  const { dispatch, state } = useEditor()

  useEffect(() => {
    if (initialElements) {
      dispatch({
        type: 'LOAD_DATA',
        payload: {
          elements: initialElements,
          withLive: false,
        },
      })
    }
  }, [initialElements, dispatch])

  useEffect(() => {
    if (initialPreviewMode) {
      dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
      dispatch({ type: 'TOGGLE_LIVE_MODE' })
    }
  }, [initialPreviewMode, dispatch])

  const handleSave = async () => {
    try {
      await fetch(`${API_URL}/api/variant/${variantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          elements: state.editor.elements,
        }),
      })
      toast.success('Saved successfully!')
    } catch (error) {
      console.error('Failed to save:', error)
      toast.error('Failed to save')
    }
  }

  return (
    <div className="h-screen flex flex-col relative bg-gradient-to-br from-background via-background to-muted/20">
      {/* Modern Header with Glass Effect - Hidden in preview mode */}
      {!state.editor.previewMode && (
      <div className="bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5 p-4 flex justify-between items-center z-50 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Editor
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Visual Website Builder
              </p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-8 bg-border/50" />
          <div className="px-3 py-1.5 rounded-md bg-muted/50 border border-border/50">
            <span className="text-xs font-medium text-muted-foreground">
              Variant Editor
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Device Switcher */}
          <TooltipProvider>
            <Tabs
              value={state.editor.device}
              onValueChange={(value) => {
                dispatch({
                  type: 'CHANGE_DEVICE',
                  payload: { device: value as DeviceTypes },
                })
              }}
              className="w-fit"
            >
              <TabsList className="grid grid-cols-3 bg-muted/50 p-1 rounded-lg border border-border/30 h-fit gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="Desktop"
                      className="w-10 h-10 p-0 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      <Laptop className="w-4 h-4" />
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Desktop</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="Tablet"
                      className="w-10 h-10 p-0 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      <Tablet className="w-4 h-4" />
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tablet</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="Mobile"
                      className="w-10 h-10 p-0 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      <Smartphone className="w-4 h-4" />
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mobile</p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>
            </Tabs>
          </TooltipProvider>

          <Separator orientation="vertical" className="h-6 bg-border/50" />

          <div className="flex gap-3">
            <Button
              onClick={() => dispatch({ type: 'TOGGLE_PREVIEW_MODE' })}
              variant="outline"
              size="sm"
              className="gap-2 border-border/50 hover:bg-accent/50 hover:border-primary/50 transition-all duration-200"
            >
              {state.editor.previewMode ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Preview
                </>
              )}
            </Button>
            <Button 
              onClick={handleSave}
              size="sm"
              className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      )}

      <div className="flex-1 overflow-hidden bg-gradient-to-br from-muted/20 via-background to-muted/10 flex relative">
        {/* Editor Canvas Area - Shrinks when sidebar is open */}
        <div className={clsx(
          "overflow-auto p-8 transition-all duration-300 flex items-start justify-center",
          !state.editor.previewMode ? "w-[calc(100%-420px)]" : "w-full"
        )}>
          <FunnelEditor />
        </div>
        
        {/* Modern Sidebar */}
        {!state.editor.previewMode && (
          <div className="w-[420px] border-l border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden flex-shrink-0 animate-in slide-in-from-right duration-300">
            <EditorSidebar />
          </div>
        )}
      </div>
    </div>
  )
}

