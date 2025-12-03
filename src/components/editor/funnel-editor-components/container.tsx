'use client'
import { Badge } from '@/components/ui/badge'
import { EditorBtns, defaultStyles } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Recursive from './recursive'
import { Trash } from 'lucide-react'

type Props = { element: EditorElement }

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element
  const { dispatch, state } = useEditor()

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation()
    const componentType = e.dataTransfer.getData('componentType') as EditorBtns

    switch (componentType) {
      case 'text':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: 'This is some text inside of a div block.' },
              id: uuidv4(),
              name: 'Text',
              styles: {
                color: 'black',
                ...defaultStyles,
              },
              type: 'text',
            },
          },
        })
        break
      case 'heading':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: 'Heading' },
              id: uuidv4(),
              name: 'Heading',
              styles: {
                color: 'black',
                ...defaultStyles,
                fontSize: 36,
                fontWeight: 'bolder'
              },
              type: 'heading',
            },
          },
        })
        break
      case 'paragraph':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.' },
              id: uuidv4(),
              name: 'Paragraph',
              styles: {
                color: 'black',
                ...defaultStyles,
              },
            type: 'paragraph',
          },
        },
        })
        break
      case 'RichText':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: 'Rich text' },
              id: uuidv4(),
              name: 'Rich Text',
              styles: { ...defaultStyles },
              type: 'RichText',
            },
          },
        })
        break
      case 'input':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: '' },
              id: uuidv4(),
              name: 'Input',
              styles: { ...defaultStyles },
              type: 'input',
            },
          },
        })
        break
      case 'textarea':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: '' },
              id: uuidv4(),
              name: 'Text Area',
              styles: { ...defaultStyles },
              type: 'textarea',
            },
          },
        })
        break
      case 'checkbox':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: '' },
              id: uuidv4(),
              name: 'Checkbox',
              styles: { ...defaultStyles },
              type: 'checkbox',
            },
          },
        })
        break
      case 'radio':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: '' },
              id: uuidv4(),
              name: 'Radio',
              styles: { ...defaultStyles },
              type: 'radio',
            },
          },
        })
        break
      case 'select':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: '' },
              id: uuidv4(),
              name: 'Select',
              styles: { ...defaultStyles },
              type: 'select',
            },
          },
        })
        break
      case 'button':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: 'Button' },
              id: uuidv4(),
              name: 'Button',
              styles: { ...defaultStyles },
              type: 'button',
            },
          },
        })
        break
      case 'fileUpload':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: '' },
              id: uuidv4(),
              name: 'File Upload',
              styles: { ...defaultStyles },
              type: 'fileUpload',
            },
          },
        })
        break
      case 'link':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: 'Link Element',
                href: '#',
              },
              id: uuidv4(),
              name: 'Link',
              styles: {
                color: 'black',
                ...defaultStyles,
              },
              type: 'link',
            },
          },
        })
        break
      case 'video':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: 'https://res.cloudinary.com/df2m5kqib/video/upload/v1737025065/WizShop_product_dem_secreen_recording_video_compressed_fomunn.mp4'
              },
              id: uuidv4(),
              name: 'Video',
              styles: {},
              type: 'video',
            },
          },
        })
        break
      case 'image':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { src: '/placeholder.svg' },
              id: uuidv4(),
              name: 'Image',
              styles: { ...defaultStyles },
              type: 'image',
            },
          },
        })
        break
      case 'container':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: uuidv4(),
              name: 'Container',
              styles: { ...defaultStyles },
              type: 'container',
            },
          },
        })
        break
      case '2Col':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
              ],
              id: uuidv4(),
              name: 'Two Columns',
              styles: { ...defaultStyles, display: 'flex' },
              type: '2Col',
            },
          },
        })
        break
      case '3Col':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                }
              ],
              id: uuidv4(),
              name: 'Three Columns',
              styles: { ...defaultStyles, display: 'flex' },
              type: '3Col',
            },
          },
        })
        break
      case 'HFlex':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                }
              ],
              id: uuidv4(),
              name: 'H Flex',
              styles: { ...defaultStyles, display: 'flex' },
              type: 'HFlex',
            },
          },
        })
        break
      case 'VFlex':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                }
              ],
              id: uuidv4(),
              name: 'V Flex',
              styles: { ...defaultStyles, display: 'block' },
              type: 'VFlex',
            },
          },
        })
        break
      case 'Grid':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [
                    {
                      content: [],
                      id: uuidv4(),
                      name: 'Container 1',
                      styles: { ...defaultStyles, width: '50%' },
                      type: 'container',
                    },
                    {
                      content: [],
                      id: uuidv4(),
                      name: 'Container 2',
                      styles: { ...defaultStyles, width: '50%' },
                      type: 'container',
                    }
                  ],
                  id: uuidv4(),
                  name: 'Row 1',
                  styles: { ...defaultStyles, display: 'flex', width: '100%' },
                  type: 'VFlex',
                },
                {
                  content: [
                    {
                      content: [],
                      id: uuidv4(),
                      name: 'Container 3',
                      styles: { ...defaultStyles, width: '50%' },
                      type: 'container',
                    },
                    {
                      content: [],
                      id: uuidv4(),
                      name: 'Container 4',
                      styles: { ...defaultStyles, width: '50%' },
                      type: 'container',
                    }
                  ],
                  id: uuidv4(),
                  name: 'Row 2',
                  styles: { ...defaultStyles, display: 'flex', width: '100%' },
                  type: 'Grid',
                }
              ],
              id: uuidv4(),
              name: 'Grid',
              styles: { ...defaultStyles, display: 'block' },
              type: 'Grid',
            },
          },
        });
        break;
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === '__body') return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  // Check if container is empty
  const isEmpty = Array.isArray(content) && content.length === 0

  return (
    <div
      style={styles}
      className={clsx('relative transition-all group no-scrollbar overflow-hidden', {
        'p-4': !state.editor.previewMode && !state.editor.liveMode,
        'p-0': state.editor.previewMode || state.editor.liveMode,
        'max-w-full w-full': type === 'container' || type === '2Col' || type === '3Col' || type === 'HFlex' || type === 'VFlex' || type === 'Grid',
        'h-fit min-h-[120px]': type === 'container' && (!state.editor.previewMode && !state.editor.liveMode),
        'h-fit': type === 'container' && (state.editor.previewMode || state.editor.liveMode),
        'min-h-[120px]': type === 'container' && isEmpty && !state.editor.liveMode && !state.editor.previewMode,
        'h-full': type === '__body',
        'overflow-y-auto overflow-x-hidden': type === '__body',
        'flex flex-col md:!flex-row': type === '2Col' || type === '3Col' || type === 'HFlex' || type === 'VFlex' ||  type === 'Grid',
        '!border-blue-500':
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          !state.editor.previewMode &&
          state.editor.selectedElement.type !== '__body',
        '!border-yellow-400 !border-4':
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          !state.editor.previewMode &&
          state.editor.selectedElement.type === '__body',
        '!border-solid':
          state.editor.selectedElement.id === id && !state.editor.liveMode && !state.editor.previewMode,
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode && !state.editor.previewMode,
        'border-0': state.editor.previewMode || state.editor.liveMode,
      })}
      onDrop={!state.editor.previewMode && !state.editor.liveMode ? (e) => handleOnDrop(e, id) : undefined}
      onDragOver={!state.editor.previewMode && !state.editor.liveMode ? handleDragOver : undefined}
      draggable={type !== '__body' && !state.editor.previewMode && !state.editor.liveMode}
      onClick={!state.editor.previewMode && !state.editor.liveMode ? handleOnClickBody : undefined}
      onDragStart={!state.editor.previewMode && !state.editor.liveMode ? (e) => handleDragStart(e, 'container') : undefined}
    >
      {!state.editor.previewMode && !state.editor.liveMode && (
        <Badge
          className={clsx(
            'absolute -top-[23px] bg-[#2e4acd] hover:bg-[#2e4acd] -left-[1px] rounded-none rounded-t-lg hidden',
            {
              block:
                state.editor.selectedElement.id === element.id,
            }
          )}
        >
          {element.name}
        </Badge>
      )}

      {Array.isArray(content) && content.length > 0 ? (
        content.map((childElement) => (
          <Recursive
            key={childElement.id}
            element={childElement}
          />
        ))
      ) : (
        isEmpty && !state.editor.liveMode && !state.editor.previewMode && (
          <div className="flex items-center justify-center h-full min-h-[80px] text-muted-foreground/50 text-sm">
            <span className="text-center">Drop elements here</span>
          </div>
        )
      )}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        !state.editor.previewMode &&
        state.editor.selectedElement.type !== '__body' && (
          <div className="absolute bg-[#2e4acd] px-2.5 py-1 dark:text-white text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
            <Trash
              size={16}
              onClick={handleDeleteElement}
              className='text-white'
            />
          </div>
        )}
    </div>
  )
}

export default Container

