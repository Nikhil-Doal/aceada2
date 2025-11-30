'use client';

import React from 'react';
import Canvas from '@/components/Canvas';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useWorkflowStore } from '@/lib/store';
import { Play, Trash2, Save, Upload } from 'lucide-react';
import { executeWorkflow } from '@/lib/workflow-engine';
import { toast } from 'sonner';

export default function Home() {
  const { nodes, edges, setExecutionStatus, executionStatus, clearCanvas, saveWorkflow, loadWorkflow } = useWorkflowStore();

  const handleRun = async () => {
    setExecutionStatus('running');
    try {
      await executeWorkflow(nodes, edges, useWorkflowStore.getState().updateNodeData);
      setExecutionStatus('completed');
      // toast.success('Workflow completed successfully!');
    } catch (error: any) {
      setExecutionStatus('error');
      console.error(error);
      // toast.error(`Workflow failed: ${error.message}`);
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      clearCanvas();
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <header className="flex h-14 items-center justify-between border-b px-4 bg-background z-10">
        <div className="font-bold text-lg">AceFlow Builder</div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={nodes.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={saveWorkflow}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={loadWorkflow}
          >
            <Upload className="mr-2 h-4 w-4" />
            Load
          </Button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={nodes.length === 0 || executionStatus === 'running'}
            className={executionStatus === 'running' ? 'animate-pulse' : ''}
          >
            <Play className="mr-2 h-4 w-4" />
            {executionStatus === 'running' ? 'Running...' : 'Run Workflow'}
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 relative">
          <Canvas />
        </main>
      </div>
    </div>
  );
}
