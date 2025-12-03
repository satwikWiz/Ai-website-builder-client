import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EditorBtns } from '@/lib/constants'
import React from 'react'
import TextPlaceholder from './text-placeholder'
import ContainerPlaceholder from './container-placeholder'
import HeadingPlaceholder from './heading-placeholder'
import ImagePlaceholder from './image-placeholder'
import ParaPlaceholder from './para-placeholder'
import RichPlaceholder from './richtext-placeholder'
import ButtonPlaceholder from './button-placeholder'
import InputPlaceholder from './input-placeholder'

type Props = {}

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'elements' | 'structure' | 'media' | 'typography' | 'forms'
  }[] = [
      {
        Component: <TextPlaceholder />,
        label: 'Text',
        id: 'text',
        group: 'typography',
      },
      {
        Component: <HeadingPlaceholder />,
        label: 'Heading',
        id: 'heading',
        group: 'typography',
      },
      {
        Component: <ParaPlaceholder />,
        label: 'Paragraph',
        id: 'paragraph',
        group: 'typography',
      },
      {
        Component: <RichPlaceholder />,
        label: 'Rich Text',
        id: 'RichText',
        group: 'typography',
      },
      {
        Component: <ContainerPlaceholder />,
        label: 'Container',
        id: 'container',
        group: 'structure',
      },
      {
        Component: <ButtonPlaceholder/>,
        label: 'Button',
        id: 'button',
        group: 'typography',
      },
      {
        Component: <InputPlaceholder/>,
        label: 'Input',
        id: 'input',
        group: 'elements',
      },
      {
        Component: <ImagePlaceholder />,
        label: 'Image',
        id: 'image',
        group: 'media',
      },
    ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Typography', 'Structure', 'Elements', 'Media']}
    >
      <AccordionItem value="Structure" className="border-none mb-2">
        <AccordionTrigger className="!no-underline font-semibold hover:no-underline text-sm py-3 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
          Structure
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-3 pt-3">
          {elements
            .filter((element) => element.group === 'structure')
            .map((element) => (
              <div
                key={element.id}
                className="group flex-col items-center justify-center border border-border/50 bg-gradient-to-br from-card to-card/50 hover:from-accent/50 hover:to-accent/30 hover:border-primary/60 rounded-xl p-4 transition-all duration-300 cursor-grab active:cursor-grabbing flex shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {element.Component}
                </div>
                <span className="text-xs text-muted-foreground mt-3 font-semibold group-hover:text-foreground transition-colors">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Media" className="border-none mb-2">
        <AccordionTrigger className="!no-underline font-semibold hover:no-underline text-sm py-3 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
          Media
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-3 pt-3">
          {elements
            .filter((element) => element.group === 'media')
            .map((element) => (
              <div
                key={element.id}
                className="group flex-col items-center justify-center border border-border/50 bg-gradient-to-br from-card to-card/50 hover:from-accent/50 hover:to-accent/30 hover:border-primary/60 rounded-xl p-4 transition-all duration-300 cursor-grab active:cursor-grabbing flex shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {element.Component}
                </div>
                <span className="text-xs text-muted-foreground mt-3 font-semibold group-hover:text-foreground transition-colors">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="border-none mb-2">
        <AccordionTrigger className="!no-underline font-semibold hover:no-underline text-sm py-3 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
          Typography
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-3 pt-3">
          {elements
            .filter((element) => element.group === 'typography')
            .map((element) => (
              <div
                key={element.id}
                className="group flex-col items-center justify-center border border-border/50 bg-gradient-to-br from-card to-card/50 hover:from-accent/50 hover:to-accent/30 hover:border-primary/60 rounded-xl p-4 transition-all duration-300 cursor-grab active:cursor-grabbing flex shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {element.Component}
                </div>
                <span className="text-xs text-muted-foreground mt-3 font-semibold group-hover:text-foreground transition-colors text-center">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="border-none mb-2">
        <AccordionTrigger className="!no-underline font-semibold hover:no-underline text-sm py-3 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
          Elements
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-3 pt-3">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="group flex-col items-center justify-center border border-border/50 bg-gradient-to-br from-card to-card/50 hover:from-accent/50 hover:to-accent/30 hover:border-primary/60 rounded-xl p-4 transition-all duration-300 cursor-grab active:cursor-grabbing flex shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {element.Component}
                </div>
                <span className="text-xs text-muted-foreground mt-3 font-semibold group-hover:text-foreground transition-colors">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ComponentsTab

