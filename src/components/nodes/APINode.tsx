import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useWorkflowStore } from '@/lib/store';
import { WorkflowNodeData } from '@/lib/types';
import { Loader2, Globe, Zap, CheckCircle2 } from 'lucide-react';

interface APINodeProps {
    id: string;
    data: WorkflowNodeData;
}

const APIS = [
    { value: 'https://jsonplaceholder.typicode.com/users/1', label: 'JSON Placeholder (User)', icon: '👤' },
    { value: 'https://catfact.ninja/fact', label: 'Cat Facts', icon: '🐱' },
    { value: 'https://randomuser.me/api/', label: 'Random User', icon: '🎲' },
    { value: 'https://api.adviceslip.com/advice', label: 'Advice Slip', icon: '💡' },
    { value: 'https://dog.ceo/api/breeds/image/random', label: 'Dog Images', icon: '🐕' },
];

const APINode = memo(({ id, data }: APINodeProps) => {
    const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

    const handleAPIChange = (value: string) => {
        updateNodeData(id, { apiUrl: value });
    };

    const isActive = data.isProcessing || data.value;
    const hasError = !!data.error;
    const hasApiSelected = !!data.apiUrl;

    return (
        <div className="relative">
            {isActive && !hasError && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl blur-xl opacity-50 animate-pulse" />
            )}

            <Card className={`
        relative w-[320px] border-2 shadow-2xl transition-all duration-300 hover:shadow-green-500/50
        ${hasError
                    ? 'border-red-500/50 bg-gradient-to-br from-red-950/20 to-red-900/10'
                    : 'border-green-500/30 bg-gradient-to-br from-green-950/40 via-slate-900/50 to-emerald-950/40'
                }
        backdrop-blur-sm
      `}>
                <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between space-y-0 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                        <div className={`
              p-2 rounded-lg transition-all duration-300
              ${isActive
                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 animate-pulse'
                                : 'bg-gradient-to-br from-green-600/30 to-emerald-600/30'
                            }
            `}>
                            <Globe className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                API Request
                            </CardTitle>
                            <p className="text-xs text-green-300/60 mt-0.5">Fetch external data</p>
                        </div>
                    </div>
                    {data.isProcessing && (
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-green-400" />
                            <span className="text-xs text-green-300 font-medium">Fetching...</span>
                        </div>
                    )}
                    {data.value && !data.isProcessing && !hasError && (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                    )}
                </CardHeader>

                <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-green-300/80 font-medium flex items-center gap-1.5">
                            <Zap className="w-3 h-3" />
                            Select Endpoint
                        </Label>
                        <Select onValueChange={handleAPIChange} value={data.apiUrl}>
                            <SelectTrigger className="nodrag h-9 text-xs bg-black/30 border-green-500/30 text-green-100 focus:border-green-500 focus:ring-green-500/20">
                                <SelectValue placeholder="Choose an API endpoint..." />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-green-500/30">
                                {APIS.map((api) => (
                                    <SelectItem
                                        key={api.value}
                                        value={api.value}
                                        className="text-xs text-green-100 focus:bg-green-500/20 focus:text-green-100"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{api.icon}</span>
                                            <span>{api.label}</span>
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {data.error && (
                        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 space-y-1 animate-in fade-in slide-in-from-top-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                <p className="text-xs font-semibold text-red-400">Error</p>
                            </div>
                            <p className="text-xs text-red-300/80 leading-relaxed">{data.error}</p>
                        </div>
                    )}

                    {!hasApiSelected && !data.error && (
                        <div className="flex items-center gap-2 text-xs text-green-400/60 px-3 py-2 bg-green-500/5 rounded-lg border border-green-500/20">
                            <Globe className="w-3 h-3" />
                            <span>Select an API to begin</span>
                        </div>
                    )}
                </CardContent>

                <Handle
                    type="target"
                    position={Position.Left}
                    className="w-3 h-3 !bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-white/30 shadow-lg shadow-green-500/50 transition-transform hover:scale-125"
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    className="w-3 h-3 !bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-white/30 shadow-lg shadow-green-500/50 transition-transform hover:scale-125"
                />
            </Card>
        </div>
    );
});

APINode.displayName = 'APINode';
export default APINode;
