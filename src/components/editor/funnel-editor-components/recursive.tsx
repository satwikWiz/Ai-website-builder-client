import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import TextComponent from './text'
import ParagraphComponent from './paragraph'
import Container from './container'
import VideoComponent from './video'
import LinkComponent from './link-component'
import ImageComponent from './image'
import RichTextComponent from './rich-text'
import InputField from './input-field'
import TextAreaField from './textarea-field'
import CheckboxField from './checkbox-field'
import RadioField from './radio-field'
import SelectField from './select-field'
import ButtonElement from './button-element'
import FileUpload from './file-upload'

type Props = {
  element: EditorElement
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case 'text':
      return <TextComponent element={element} />
    case 'heading':
      return <TextComponent element={element} />
    case 'container':
      return <Container element={element} />
    case 'video':
      return <VideoComponent element={element} />
    case 'image':
      return <ImageComponent element={element} />
    case 'paragraph':
      return <ParagraphComponent element={element}/>
    case 'RichText':
      return <RichTextComponent element={element} />
    case 'input':
      return <InputField element={element} />
    case 'textarea':
      return <TextAreaField element={element} />
    case 'checkbox':
      return <CheckboxField element={element} />
    case 'radio':
      return <RadioField element={element} />
    case 'select':
      return <SelectField element={element} />
    case 'button':
      return <ButtonElement element={element} />
    case 'fileUpload':
      return <FileUpload element={element} />
    case '2Col':
      return <Container element={element} />
    case 'pageSlot':
      return <Container element={element} />
    case '3Col':
      return <Container element={element} />
    case 'Grid':
      return <Container element={element} />
    case 'HFlex':
      return <Container element={element} />
    case 'VFlex':
      return <Container element={element} />
    case '__body':
      return <Container element={element} />
    case 'link':
      return <LinkComponent element={element} />
    default:
      return null
  }
}

export default Recursive




