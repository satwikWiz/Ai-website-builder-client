'use client'

import { memo, useState, useEffect } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from '@/components/base-node'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useReactFlow } from '@xyflow/react'
import { Globe, AlertCircle, CheckCircle2 } from 'lucide-react'
import { isValidUrl, getUrlValidationError } from '@/lib/validations'
import { cn } from '@/lib/utils'

interface ScrapeNodeData {
  url?: string
  label?: string
  validationError?: string | null
}

function ScrapeNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow()
  const nodeData = data as ScrapeNodeData
  const [isTouched, setIsTouched] = useState(false)
  const [localUrl, setLocalUrl] = useState(nodeData.url || '')

  useEffect(() => {
    setLocalUrl(nodeData.url || '')
    setIsTouched(false) // Reset touched state when data changes externally
  }, [nodeData.url, nodeData.validationError])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalUrl(value)
    setIsTouched(true)
    
    const error = getUrlValidationError(value)
    updateNodeData(id, { 
      url: value,
      validationError: error,
      isValid: !error && value.trim().length > 0
    })
  }

  const handleBlur = () => {
    setIsTouched(true)
  }

  const validationError = nodeData.validationError || (isTouched ? getUrlValidationError(localUrl) : null)
  const isValid = localUrl && isValidUrl(localUrl)
  const showError = isTouched && validationError

  return (
    <BaseNode className={cn(
      "w-80",
      showError ? "border-red-500" : 
      isValid ? "border-green-500" :
      ""
    )}>
      <BaseNodeHeader className="border-b">
        <div className={cn(
          showError ? "bg-red-50" :
          isValid ? "bg-green-50" :
          "bg-muted"
        )}>
          {showError ? (
            <AlertCircle className="w-4 h-4 text-red-600" />
          ) : isValid ? (
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          ) : (
            <Globe className="w-4 h-4 text-primary" />
          )}
        </div>
        <BaseNodeHeaderTitle>
          {nodeData.label || 'Website to Scrape'}
        </BaseNodeHeaderTitle>
      </BaseNodeHeader>
      
      <BaseNodeContent className="space-y-2">
        <Label htmlFor={`url-${id}`}>
          Website URL
        </Label>
        <div className="relative">
          <Input
            id={`url-${id}`}
            type="url"
            placeholder="https://example.com"
            value={localUrl}
            onChange={handleUrlChange}
            onBlur={handleBlur}
            className={cn(
              "nodrag",
              showError && "border-red-500",
              isValid && "border-green-500"
            )}
          />
          {isValid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
          )}
        </div>
        {showError && (
          <div className="flex items-start gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>{validationError}</p>
          </div>
        )}
        {isValid && !showError && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <p>Valid URL</p>
          </div>
        )}
      </BaseNodeContent>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={cn(
          isValid ? "!bg-green-500" : "!bg-primary"
        )} 
      />
    </BaseNode>
  )
}

export default memo(ScrapeNode)
