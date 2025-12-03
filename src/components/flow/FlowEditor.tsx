'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  BackgroundVariant,
  ConnectionMode,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import ScrapeNode from './nodes/ScrapeNode'
import DomainNode from './nodes/DomainNode'
import { Button } from '@/components/ui/button'
import { Plus, CheckCircle2, AlertCircle, Loader2, Trash2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { isValidUrl, isValidDomain } from '@/lib/validations'
import { cn } from '@/lib/utils'

const API_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001'

const nodeTypes = {
  scrapeNode: ScrapeNode,
  domainNode: DomainNode,
}

const initialNodes: Node[] = [
  {
    id: 'scrape-1',
    type: 'scrapeNode',
    position: { x: 250, y: 100 },
    data: { url: '', label: 'Website to Scrape' },
  },
]

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const router = useRouter()

  // Validate connection - only allow scrape -> domain connections
  const isValidConnection = useCallback((connection: Connection): boolean => {
    if (!connection.source || !connection.target) return false
    
    const sourceNode = nodes.find(n => n.id === connection.source)
    const targetNode = nodes.find(n => n.id === connection.target)
    
    if (!sourceNode || !targetNode) return false
    
    // Only allow scrapeNode -> domainNode connections
    if (sourceNode.type === 'scrapeNode' && targetNode.type === 'domainNode') {
      // Check if connection already exists
      const existingEdge = edges.find(
        (e: Edge) => e.source === (connection.source as string) && e.target === (connection.target as string)
      )
      return !existingEdge
    }
    
    return false
  }, [nodes, edges])

  const onConnect = useCallback(
    (params: Connection) => {
      if (isValidConnection(params)) {
        setEdges((eds) => addEdge(params, eds))
        toast.success('Connection established')
      } else {
        if (params.source && params.target) {
          const sourceNode = nodes.find(n => n.id === params.source)
          const targetNode = nodes.find(n => n.id === params.target)
          
          if (sourceNode?.type !== 'scrapeNode' || targetNode?.type !== 'domainNode') {
            toast.error('Only Scrape nodes can connect to Domain nodes')
          } else {
            toast.error('Connection already exists')
          }
        }
      }
    },
    [setEdges, isValidConnection, nodes]
  )

  const addDomainNode = useCallback(() => {
    const domainCount = nodes.filter(n => n.type === 'domainNode').length
    const newNode: Node = {
      id: `domain-${Date.now()}`,
      type: 'domainNode',
      position: { 
        x: 250 + (domainCount * 320), 
        y: 300 
      },
      data: { 
        domain: '', 
        label: 'Domain',
        status: 'pending',
        variantId: null,
      },
    }
    setNodes((nds) => [...nds, newNode])
    toast.success('Domain node added')
  }, [nodes, setNodes])

  const deleteNode = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId)
    if (node?.type === 'scrapeNode') {
      toast.error('Cannot delete the scrape node')
      return
    }
    
    setNodes((nds) => nds.filter(n => n.id !== nodeId))
    setEdges((eds) => eds.filter((e: Edge) => e.source !== nodeId && e.target !== nodeId))
    toast.success('Node deleted')
  }, [nodes, setNodes, setEdges])

  const updateNodeData = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      )
    )
  }, [setNodes])

  // Expose updateNodeData to child components via React Flow context
  // The nodes use useReactFlow().updateNodeData which works automatically

  // Comprehensive validation before generate
  const validateWorkflow = useCallback((): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    const scrapeNode = nodes.find(n => n.type === 'scrapeNode')
    const domainNodes = nodes.filter(n => n.type === 'domainNode')

    // Validate scrape node
    if (!scrapeNode) {
      errors.push('Scrape node is missing')
    } else {
      const url = (scrapeNode.data as any).url
      if (!url || !url.trim()) {
        errors.push('Please enter a website URL in the scrape node')
      } else if (!isValidUrl(url)) {
        errors.push('Please enter a valid URL in the scrape node')
      }
    }

    // Validate domain nodes
    if (domainNodes.length === 0) {
      errors.push('Please add at least one domain node')
    } else {
      const validDomains = domainNodes.filter(n => {
        const domain = (n.data as any).domain
        return domain && typeof domain === 'string' && domain.trim() && isValidDomain(domain)
      })
      
      if (validDomains.length === 0) {
        errors.push('Please enter valid domain names in the domain nodes')
      } else {
        // Check for duplicate domains
        const domainValues = validDomains.map(n => (n.data as any).domain.trim().toLowerCase())
        const uniqueDomains = new Set(domainValues)
        if (uniqueDomains.size !== domainValues.length) {
          errors.push('Duplicate domain names are not allowed')
        }
      }
    }

    // Validate connections
    if (domainNodes.length > 0 && edges.length === 0) {
      errors.push('Please connect the scrape node to at least one domain node')
    }

    return { isValid: errors.length === 0, errors }
  }, [nodes, edges])

  const handleGenerate = useCallback(async () => {
    const validation = validateWorkflow()
    setValidationErrors(validation.errors)

    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error))
      return
    }

    const scrapeNode = nodes.find(n => n.type === 'scrapeNode')
    const domainNodes = nodes.filter(n => n.type === 'domainNode')

    if (!scrapeNode) return

    const domainsWithNames = domainNodes.filter(n => {
      const domain = (n.data as any).domain
      return domain && typeof domain === 'string' && domain.trim() && isValidDomain(domain)
    })

    setIsGenerating(true)
    setValidationErrors([])

    try {
      // Step 1: Scrape the website
      toast.loading('Scraping website...', { id: 'scraping' })
      const scrapeResponse = await fetch(`${API_URL}/api/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: (scrapeNode.data as any).url }),
      })

      if (!scrapeResponse.ok) {
        const errorData = await scrapeResponse.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to scrape website')
      }

      const scrapeData = await scrapeResponse.json()
      toast.success('Website scraped successfully', { id: 'scraping' })

      // Step 2: Generate variants for each domain
      const generationPromises = domainsWithNames.map(async (domainNode) => {
        // Set generating status
        updateNodeData(domainNode.id, {
          status: 'generating',
        })

        try {
          const variantsResponse = await fetch(`${API_URL}/api/variants/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              html: scrapeData.html,
              styles: scrapeData.styles,
              subdomain: (domainNode.data as any).domain,
            }),
          })

          if (!variantsResponse.ok) {
            const errorData = await variantsResponse.json().catch(() => ({}))
            throw new Error(errorData.message || `Failed to generate variants for ${domainNode.data.domain}`)
          }

          const variantsData = await variantsResponse.json()
          
          // Update node with success status and variant IDs
          updateNodeData(domainNode.id, {
            status: 'success',
            variants: variantsData.variants || [],
            variantId: variantsData.variants?.[0]?.id || null,
          })

          return { domain: (domainNode.data as any).domain, success: true }
        } catch (error: any) {
          updateNodeData(domainNode.id, {
            status: 'error',
            error: error.message,
          })
          return { domain: (domainNode.data as any).domain, success: false, error: error.message }
        }
      })

      const results = await Promise.all(generationPromises)
      const successCount = results.filter(r => r.success).length
      const failCount = results.length - successCount

      if (successCount > 0) {
        toast.success(`Successfully generated variants for ${successCount} domain(s)!`)
      }
      if (failCount > 0) {
        toast.error(`Failed to generate variants for ${failCount} domain(s)`)
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during generation')
    } finally {
      setIsGenerating(false)
    }
  }, [nodes, updateNodeData, validateWorkflow])

  // Auto-fit view when nodes change
  useEffect(() => {
    const timer = setTimeout(() => {
      const flowElement = document.querySelector('.react-flow')
      if (flowElement) {
        // Trigger fit view
        window.dispatchEvent(new Event('resize'))
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [nodes.length])

  // Clear validation errors when user starts fixing issues
  useEffect(() => {
    const scrapeNode = nodes.find(n => n.type === 'scrapeNode')
    const domainNodes = nodes.filter(n => n.type === 'domainNode')
    
    // Check if all nodes are valid
    const scrapeValid = scrapeNode && (scrapeNode.data as any).url && isValidUrl((scrapeNode.data as any).url)
    const domainsValid = domainNodes.length > 0 && domainNodes.every(n => {
      const domain = (n.data as any).domain
      return domain && isValidDomain(domain)
    })
    const hasConnections = edges.length > 0
    
    if (scrapeValid && domainsValid && hasConnections && validationErrors.length > 0) {
      setValidationErrors([])
    }
  }, [nodes, edges, validationErrors.length])

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm px-6 py-5 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(129,85,217,0.2)]">
            <Sparkles className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              WizCommerce AI Website Builder
            </h1>
            <p className="text-xs font-medium text-muted-foreground mt-1 tracking-wide">
              Visual Workflow Editor • {nodes.filter(n => n.type === 'domainNode').length} domain{nodes.filter(n => n.type === 'domainNode').length !== 1 ? 's' : ''} • {edges.length} connection{edges.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={addDomainNode}
            variant="outline"
            size="sm"
            className="gap-2 font-medium border hover:bg-muted transition-all duration-200"
            disabled={isGenerating}
          >
            <Plus className="w-4 h-4" />
            Add Domain
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            size="sm"
            className="gap-2 font-medium transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Generate Variants
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Validation Errors Banner */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-5 z-40">
          <div className="flex items-start gap-4 max-w-7xl mx-auto">
            <div className="p-2 rounded-md bg-red-100 shrink-0">
              <AlertCircle className="w-4 h-4 text-red-600" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800 mb-3">
                Please fix the following issues:
              </p>
              <ul className="text-sm font-medium text-red-700 space-y-2">
                {validationErrors.map((error, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="leading-relaxed">{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* React Flow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          connectionMode={ConnectionMode.Loose}
          // className="bg-background"
          defaultEdgeOptions={{
            style: { 
              // strokeWidth: 2.5,
              stroke: 'hsl(var(--primary))',
            },
            animated: true,
            type: 'smoothstep',
          }}
          connectionLineStyle={{ 
            // strokeWidth: 2.5,
            stroke: 'hsl(var(--primary))',
          }}
          deleteKeyCode={['Backspace', 'Delete']}
          onNodesDelete={(nodesToDelete) => {
            nodesToDelete.forEach(node => {
              if (node.type !== 'scrapeNode') {
                deleteNode(node.id)
              }
            })
          }}
          onEdgesDelete={(edgesToDelete) => {
            setEdges((eds) => eds.filter((e: Edge) => !edgesToDelete.some((ed: Edge) => ed.id === e.id)))
          }}
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            // className="opacity-30"
            color="hsl(var(--muted-foreground))"
          />
          <Controls 
            position="top-left"
            className="bg-card border border-border rounded-lg shadow-md"
            showInteractive={false}
          />
          <MiniMap
            position="bottom-right"
            className="bg-card border border-border rounded-lg shadow-md"
            nodeColor={(node) => {
              if (node.type === 'scrapeNode') return 'hsl(var(--primary))'
              if (node.type === 'domainNode') {
                const status = (node.data as any)?.status
                if (status === 'success') return 'hsl(142 76% 36%)'
                if (status === 'error') return 'hsl(0 84% 60%)'
                if (status === 'generating') return 'hsl(217 91% 60%)'
              }
              return 'hsl(var(--muted-foreground))'
            }}
            maskColor="hsl(var(--background) / 0.8)"
          />
        </ReactFlow>
      </div>
    </div>
  )
}

