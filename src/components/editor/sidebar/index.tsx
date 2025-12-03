'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import { Plus, Settings } from 'lucide-react'
import ComponentsTab from './tabs/components-tab'
import SettingsTab from './tabs/settings-tab'

type Props = {}

const EditorSidebar = (props: Props) => {
  const { state } = useEditor()

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-card/95 to-card/80">
      <Tabs
        className="w-full h-full flex flex-col"
        defaultValue="Components"
      >
        {/* Modern Tab Header */}
        <div className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10 p-4 backdrop-blur-sm">
          <TabsList className="w-full grid grid-cols-2 bg-muted/50 p-1 rounded-lg border border-border/30">
            <TabsTrigger
              value="Components"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground transition-all duration-200 rounded-md"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Components</span>
            </TabsTrigger>
            <TabsTrigger
              value="Settings"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground transition-all duration-200 rounded-md"
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="Components" className="h-full m-0 p-0">
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Components</h2>
                    <p className="text-xs text-muted-foreground font-medium">
                      Drag and drop onto canvas
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="bg-border/30" />
              <ComponentsTab />
            </div>
          </TabsContent>
          <TabsContent value="Settings" className="h-full m-0 p-0">
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Settings</h2>
                    <p className="text-xs text-muted-foreground font-medium">
                      Customize element properties
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="bg-border/30" />
              {state.editor.selectedElement.id && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border/30 mb-4">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Selected Element</div>
                  <div className="text-sm font-semibold text-foreground">
                    {state.editor.selectedElement.name}
                  </div>
                </div>
              )}
              <SettingsTab />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default EditorSidebar

