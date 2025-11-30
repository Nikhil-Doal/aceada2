import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useWorkflowStore } from '@/lib/store';
import { WorkflowNodeData } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface APINodeProps {
    id: string;
    data: WorkflowNodeData;
}

const APIS = [
    { value: 'https://jsonplaceholder.typicode.com/users/1', label: 'JSON Placeholder (User)' },
    { value: 'https://catfact.ninja/fact', label: 'Cat Facts' },
    { value: 'https://randomuser.me/api/', label: 'Random User' },
    { value: 'https://api.adviceslip.com/advice', label: 'Advice Slip' },
    { value: 'https://dog.ceo/api/breeds/image/random', label: 'Dog Images' },
];

const APINode = memo(({ id, data }: APINodeProps) => {
    const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

    const handleAPIChange = (value: string) => {
        updateNodeData(id, { apiUrl: value });
    };

    return (
        <Card className={`w-72 border-2 shadow-lg ${data.error ? 'border-destructive' : 'border-blue-500/20'}`}>
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-blue-600">API Node</CardTitle>
                {data.isProcessing && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-3">
                <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Select API</Label>
                    <Select onValueChange={handleAPIChange} value={data.apiUrl}>
                        <SelectTrigger className="nodrag">
                            <SelectValue placeholder="Choose an API" />
                        </SelectTrigger>
                        <SelectContent>
                            {APIS.map((api) => (
                                <SelectItem key={api.value} value={api.value}>
                                    {api.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {data.error && (
                    <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                        Error: {data.error}
                    </div>
                )}
            </CardContent>
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-blue-500 border-2 border-background"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 bg-blue-500 border-2 border-background"
            />
        </Card>
    );
});

APINode.displayName = 'APINode';
export default APINode;
