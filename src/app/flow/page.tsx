'use client'

import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from '@/components/flow/FlowEditor'

export default function FlowPage() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  )
}

