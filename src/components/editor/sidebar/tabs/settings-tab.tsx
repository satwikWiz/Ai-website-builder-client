'use client'
import React, { ChangeEventHandler } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify,
} from 'lucide-react'
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEditor } from '@/providers/editor/editor-provider'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {}

const SettingsTab = (props: Props) => {
  const { state, dispatch } = useEditor()

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id
    let value = e.target.value
    const styleObject = {
      [styleSettings]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    })
  }

  if (!state.editor.selectedElement.id) {
    return (
      <div className="p-6 text-center rounded-lg bg-muted/30 border border-dashed border-border/50">
        <p className="text-sm text-muted-foreground font-medium">
          No element selected
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Click on an element to edit its properties
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['Typography', 'Colors', 'Dimensions', 'Decorations']}
      >
        {/* Typography Section */}
        <AccordionItem value="Typography" className="border-none mb-3">
          <AccordionTrigger className="!no-underline font-semibold hover:no-underline text-sm py-3 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
            Typography
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-3">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Text Align</Label>
              <Tabs
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: 'textAlign',
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.textAlign || 'left'}
              >
                <TabsList className="flex items-center flex-row justify-between border border-border/50 rounded-lg bg-muted/30 h-fit gap-2 p-1">
                  <TabsTrigger
                    value="left"
                    className="w-10 h-10 p-0 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <AlignLeft size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="center"
                    className="w-10 h-10 p-0 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <AlignCenter size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="right"
                    className="w-10 h-10 p-0 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <AlignRight size={18} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="justify"
                    className="w-10 h-10 p-0 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <AlignJustify size={18} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Font Family</Label>
              <Input
                id="fontFamily"
                placeholder="e.g., Arial, sans-serif"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.fontFamily || ''}
                className="bg-background"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm font-medium text-foreground">Font Weight</Label>
                <Select
                  onValueChange={(e) =>
                    handleOnChanges({
                      target: {
                        id: 'fontWeight',
                        value: e,
                      },
                    })
                  }
                  value={String(state.editor.selectedElement.styles.fontWeight || 'normal')}
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Font Weights</SelectLabel>
                      <SelectItem value="100">Thin (100)</SelectItem>
                      <SelectItem value="300">Light (300)</SelectItem>
                      <SelectItem value="400">Normal (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semi Bold (600)</SelectItem>
                      <SelectItem value="700">Bold (700)</SelectItem>
                      <SelectItem value="900">Black (900)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-sm font-medium text-foreground">Font Size</Label>
                <Input
                  placeholder="16px"
                  id="fontSize"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.fontSize || ''}
                  className="bg-background"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors Section */}
        <AccordionItem value="Colors" className="border-none mb-3">
          <AccordionTrigger className="!no-underline font-semibold hover:no-underline text-sm py-3 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
            Colors & Background
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-3">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Text Color</Label>
              <div className="flex border border-border/50 rounded-lg overflow-clip bg-background">
                <div
                  className="w-12 h-10 flex-shrink-0 border-r border-border/50"
                  style={{
                    backgroundColor: state.editor.selectedElement.styles.color || '#000000',
                  }}
                />
                <Input
                  placeholder="#000000"
                  className="!border-0 rounded-none bg-transparent"
                  id="color"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.color || ''}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Background Color</Label>
              <div className="flex border border-border/50 rounded-lg overflow-clip bg-background">
                <div
                  className="w-12 h-10 flex-shrink-0 border-r border-border/50"
                  style={{
                    backgroundColor: state.editor.selectedElement.styles.backgroundColor || 'transparent',
                  }}
                />
                <Input
                  placeholder="#ffffff or transparent"
                  className="!border-0 rounded-none bg-transparent"
                  id="backgroundColor"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.backgroundColor || ''}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Background Image</Label>
              <div className="flex border border-border/50 rounded-lg overflow-clip bg-background">
                <div
                  className="w-12 h-10 flex-shrink-0 border-r border-border/50 bg-muted/50 flex items-center justify-center"
                  style={{
                    backgroundImage: state.editor.selectedElement.styles.backgroundImage || 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Input
                  placeholder="url('https://...') or none"
                  className="!border-0 rounded-none bg-transparent"
                  id="backgroundImage"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.backgroundImage || ''}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Dimensions Section */}
        <AccordionItem value="Dimensions" className="border-none mb-3">
          <AccordionTrigger className="!no-underline font-semibold hover:no-underline text-sm py-3 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
            Dimensions
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-3">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm font-medium text-foreground">Width</Label>
                <Input
                  id="width"
                  placeholder="auto, 100%, 200px"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.width || ''}
                  className="bg-background"
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm font-medium text-foreground">Height</Label>
                <Input
                  id="height"
                  placeholder="auto, 100%, 200px"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.height || ''}
                  className="bg-background"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Margin (px)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Top</Label>
                  <Input
                    id="marginTop"
                    placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginTop || ''}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Right</Label>
                  <Input
                    id="marginRight"
                    placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginRight || ''}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Bottom</Label>
                  <Input
                    id="marginBottom"
                    placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginBottom || ''}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Left</Label>
                  <Input
                    id="marginLeft"
                    placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginLeft || ''}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Padding (px)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Top</Label>
                  <Input
                    id="paddingTop"
                    placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingTop || ''}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Right</Label>
                  <Input
                    id="paddingRight"
                    placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingRight || ''}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Bottom</Label>
                  <Input
                    id="paddingBottom"
                    placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingBottom || ''}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Left</Label>
                  <Input
                    id="paddingLeft"
                    placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingLeft || ''}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Decorations Section */}
        <AccordionItem value="Decorations" className="border-none mb-3">
          <AccordionTrigger className="!no-underline font-semibold hover:no-underline text-sm py-3 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
            Decorations
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-foreground">Opacity</Label>
                <span className="text-xs text-muted-foreground">
                  {typeof state.editor.selectedElement.styles?.opacity === 'number'
                    ? state.editor.selectedElement.styles?.opacity
                    : parseFloat(
                        (state.editor.selectedElement.styles?.opacity || '100').replace('%', '')
                      ) || 100}
                  %
                </span>
              </div>
              <Slider
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: 'opacity',
                      value: `${e[0]}%`,
                    },
                  })
                }}
                defaultValue={[
                  typeof state.editor.selectedElement.styles?.opacity === 'number'
                    ? state.editor.selectedElement.styles?.opacity
                    : parseFloat(
                        (state.editor.selectedElement.styles?.opacity || '100').replace('%', '')
                      ) || 100,
                ]}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-foreground">Border Radius</Label>
                <span className="text-xs text-muted-foreground">
                  {typeof state.editor.selectedElement.styles?.borderRadius === 'number'
                    ? state.editor.selectedElement.styles?.borderRadius
                    : parseFloat(
                        (state.editor.selectedElement.styles?.borderRadius || '0').replace('px', '')
                      ) || 0}
                  px
                </span>
              </div>
              <Slider
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: 'borderRadius',
                      value: `${e[0]}px`,
                    },
                  })
                }}
                defaultValue={[
                  typeof state.editor.selectedElement.styles?.borderRadius === 'number'
                    ? state.editor.selectedElement.styles?.borderRadius
                    : parseFloat(
                        (state.editor.selectedElement.styles?.borderRadius || '0').replace('px', '')
                      ) || 0,
                ]}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Border</Label>
              <div className="flex gap-2">
                <Input
                  id="borderWidth"
                  placeholder="1px"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.borderWidth || ''}
                  className="bg-background flex-1"
                />
                <Input
                  id="borderColor"
                  placeholder="#000000"
                  onChange={handleOnChanges}
                  value={state.editor.selectedElement.styles.borderColor || ''}
                  className="bg-background flex-1"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default SettingsTab

