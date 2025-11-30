import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWorkflowStore } from '@/lib/store';
import { WorkflowNodeData } from '@/lib/types';
import { Keyboard, Send } from 'lucide-react';

interface InputNodeProps {
    id: string;
    data: WorkflowNodeData;
}

const InputNode = memo(({ id, data }: InputNodeProps) => {
    const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData(id, { value: e.target.value });
    };

    const hasValue = !!data.value;

    return (
        <div className="relative">
            {hasValue && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl blur-xl opacity-40 animate-pulse" />
            )}

            <Card className={`
        relative w-[300px] border-2 shadow-2xl transition-all duration-300 hover:shadow-blue-500/50
        border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-slate-900/50 to-cyan-950/40
        backdrop-blur-sm
      `}>
                <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between space-y-0 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600/30 to-cyan-600/30">
                            <Keyboard className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Input
                            </CardTitle>
                            <p className="text-xs text-blue-300/60 mt-0.5">Start here</p>
                        </div>
                    </div>
                    {hasValue && (
                        <Send className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                    )}
                </CardHeader>

                <CardContent className="p-4 space-y-2">
                    <div className="space-y-2">
                        <Label htmlFor={`input-${id}`} className="text-xs text-blue-300/80 font-medium flex items-center gap-1.5">
                            <Keyboard className="w-3 h-3" />
                            Enter Your Data
                        </Label>
                        <Input
                            id={`input-${id}`}
                            value={data.value || ''}
                            onChange={handleChange}
                            placeholder="Type your message or data..."
                            className="nodrag text-sm bg-black/30 border-blue-500/30 text-blue-100 placeholder:text-blue-400/40 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                    </div>

                    {!hasValue && (
                        <div className="flex items-center gap-2 text-xs text-blue-400/60 px-3 py-2 bg-blue-500/5 rounded-lg border border-blue-500/20">
                            <Keyboard className="w-3 h-3" />
                            <span>Enter text to begin workflow</span>
                        </div>
                    )}

                    {hasValue && (
                        <div className="text-xs text-blue-300/70 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                            <span className="font-medium">Ready:</span> {data.value.toString().substring(0, 40)}{data.value.toString().length > 40 ? '...' : ''}
                        </div>
                    )}
                </CardContent>

                <Handle
                    type="source"
                    position={Position.Right}
                    className="w-3 h-3 !bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-white/30 shadow-lg shadow-blue-500/50 transition-transform hover:scale-125"
                />
            </Card>
        </div>
    );
});

InputNode.displayName = 'InputNode';
export default InputNode;
