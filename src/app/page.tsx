'use client';

import React from 'react';
import Canvas from '@/components/Canvas';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useWorkflowStore } from '@/lib/store';
import { Play, Trash2, Save, Upload, Sparkles } from 'lucide-react';
import { executeWorkflow } from '@/lib/workflow-engine';
import { toast } from 'sonner';

export default function Home() {
  const { nodes, edges, setExecutionStatus, executionStatus, clearCanvas, saveWorkflow, loadWorkflow } = useWorkflowStore();

  const handleRun = async () => {
    setExecutionStatus('running');
    try {
      await executeWorkflow(nodes, edges, useWorkflowStore.getState().updateNodeData);
      setExecutionStatus('completed');
      toast.success('Workflow completed successfully!');
    } catch (error: any) {
      setExecutionStatus('error');
      console.error(error);
      toast.error(`Workflow failed: ${error.message}`);
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      clearCanvas();
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-950">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-slate-900 to-blue-950/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] pointer-events-none" />

      <header className="relative flex h-16 items-center justify-between border-b border-white/10 px-6 bg-slate-900/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/30 to-pink-600/30">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              AceFlow Builder
            </h1>
            <p className="text-xs text-slate-400">Visual Workflow Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={nodes.length === 0}
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={saveWorkflow}
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={loadWorkflow}
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
          >
            <Upload className="mr-2 h-4 w-4" />
            Load
          </Button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={nodes.length === 0 || executionStatus === 'running'}
            className={`
              bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
              border-0 text-white shadow-lg shadow-purple-500/50 transition-all
              ${executionStatus === 'running' ? 'animate-pulse' : ''}
            `}
          >
            <Play className="mr-2 h-4 w-4" />
            {executionStatus === 'running' ? 'Running...' : 'Run Workflow'}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <main className="flex-1 relative">
          <Canvas />
        </main>
      </div>
    </div>
  );
}
