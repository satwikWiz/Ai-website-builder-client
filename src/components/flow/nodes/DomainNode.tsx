'use client'

import { memo, useState, useEffect } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from '@/components/base-node'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useReactFlow } from '@xyflow/react'
import { Globe, Edit, ExternalLink, CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react'
import { isValidDomain, getDomainValidationError } from '@/lib/validations'
import { cn } from '@/lib/utils'

interface DomainNodeData {
  domain?: string
  label?: string
  status?: 'pending' | 'success' | 'error' | 'generating'
  variantId?: string | null
  variants?: Array<{ id: string; variantNumber: number; name: string }>
  error?: string
  validationError?: string | null
}

function DomainNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow()
  const nodeData = data as DomainNodeData
  const [isTouched, setIsTouched] = useState(false)
  const [localDomain, setLocalDomain] = useState(nodeData.domain || '')

  useEffect(() => {
    setLocalDomain(nodeData.domain || '')
    // Don't reset touched state if status is generating to preserve user input
    if (nodeData.status !== 'generating') {
      setIsTouched(false)
    }
  }, [nodeData.domain, nodeData.status, nodeData.validationError])

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalDomain(value)
    setIsTouched(true)
    
    const error = getDomainValidationError(value)
    updateNodeData(id, { 
      domain: value,
      validationError: error,
      isValid: !error && value.trim().length > 0
    })
  }

  const handleBlur = () => {
    setIsTouched(true)
  }

  const handleEdit = () => {
    if (nodeData.variantId) {
      window.open(`/editor/${nodeData.variantId}`, '_blank')
    }
  }

  const handleView = () => {
    if (nodeData.variantId) {
      window.open(`/editor/${nodeData.variantId}?preview=true`, '_blank')
    }
  }

  const validationError = nodeData.validationError || (isTouched ? getDomainValidationError(localDomain) : null)
  const isValid = localDomain && isValidDomain(localDomain)
  const showError = isTouched && validationError && nodeData.status !== 'generating'
  const isDisabled = nodeData.status === 'generating'

  const getStatusIcon = () => {
    if (nodeData.status === 'success') {
      return <CheckCircle2 className="w-4 h-4 text-green-600" />
    } else if (nodeData.status === 'error') {
      return <XCircle className="w-4 h-4 text-red-600" />
    } else if (nodeData.status === 'generating') {
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
    } else if (showError) {
      return <AlertCircle className="w-4 h-4 text-red-600" />
    } else if (isValid) {
      return <CheckCircle2 className="w-4 h-4 text-green-600" />
    }
    return <Globe className="w-4 h-4 text-primary" />
  }

  const getBorderColor = () => {
    if (nodeData.status === 'success') return 'border-green-500'
    if (nodeData.status === 'error') return 'border-red-500'
    if (nodeData.status === 'generating') return 'border-blue-500'
    if (showError) return 'border-red-500'
    if (isValid) return 'border-green-500'
    return ''
  }

  const getIconBg = () => {
    if (nodeData.status === 'success') return 'bg-green-50'
    if (nodeData.status === 'error') return 'bg-red-50'
    if (nodeData.status === 'generating') return 'bg-blue-50'
    if (showError) return 'bg-red-50'
    if (isValid) return 'bg-green-50'
    return 'bg-muted'
  }


  return (
    <BaseNode className={cn(
      "w-80 border shadow-md transition-all duration-200 hover:shadow-lg",
      getBorderColor()
    )}>
      <BaseNodeHeader className="border-b border-border px-5 py-4 bg-card">
        <div className={cn(
          "p-2 rounded-md transition-all duration-200",
          getIconBg()
        )}>
          {getStatusIcon()}
        </div>
        <BaseNodeHeaderTitle className="font-semibold text-base">
          {nodeData.label || 'Domain'}
        </BaseNodeHeaderTitle>
        {nodeData.status === 'generating' && (
          <span className="text-xs font-semibold text-blue-600 animate-pulse ml-auto tracking-wide">
            Processing...
          </span>
        )}
      </BaseNodeHeader>
        
        <BaseNodeContent className="space-y-4 p-5">
          <Label htmlFor={`domain-${id}`} className="text-sm font-medium text-foreground">
            Domain Name
          </Label>
          <div className="relative">
            <Input
              id={`domain-${id}`}
              type="text"
              placeholder="my-domain"
              value={localDomain}
              onChange={handleDomainChange}
              onBlur={handleBlur}
              disabled={isDisabled}
              className={cn(
                "nodrag h-11 text-sm font-medium border transition-all duration-200",
                showError && "border-red-400 focus:ring-1 focus:ring-red-300 focus:border-red-400",
                isValid && !showError && "border-green-400 focus:ring-1 focus:ring-green-300 focus:border-green-400",
                !showError && !isValid && "border-border focus:ring-1 focus:ring-foreground/20 focus:border-foreground",
                isDisabled && "opacity-60 cursor-not-allowed bg-muted/50"
              )}
            />
            {isValid && !showError && !isDisabled && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="p-1 rounded-full bg-green-100">
                  <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={2} />
                </div>
              </div>
            )}
          </div>
          {showError && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" strokeWidth={2} />
              <p className="text-sm font-medium text-red-700 leading-relaxed">
                {validationError}
              </p>
            </div>
          )}
          
        </BaseNodeContent>

        {nodeData.status === 'success' && nodeData.variantId && (
          <BaseNodeFooter>
            <div className="flex gap-2 w-full">
              <Button
                onClick={handleEdit}
                size="sm"
                variant="default"
                className="flex-1 gap-2 nodrag"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                onClick={handleView}
                size="sm"
                variant="outline"
                className="flex-1 gap-2 nodrag"
              >
                <ExternalLink className="w-4 h-4" />
                View
              </Button>
            </div>
            {nodeData.variants && Array.isArray(nodeData.variants) && nodeData.variants.length > 0 && (
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <p>
                  {nodeData.variants.length} variant{nodeData.variants.length !== 1 ? 's' : ''} generated
                </p>
              </div>
            )}
          </BaseNodeFooter>
        )}

        {nodeData.status === 'error' && (
          <BaseNodeFooter className="border-t">
            <div className="flex items-start gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold mb-1">
                  Generation Failed
                </p>
                <p>
                  {nodeData.error || 'An error occurred during generation'}
                </p>
              </div>
            </div>
          </BaseNodeFooter>
        )}
        
        <Handle 
          type="target" 
          position={Position.Top} 
          className={cn(
            isValid && nodeData.status !== 'error' ? "!bg-green-500" : "!bg-primary"
          )} 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className={cn(
            nodeData.status === 'success' ? "!bg-green-500" : "!bg-primary"
          )} 
        />
      </BaseNode>
  )
}

export default memo(DomainNode)

