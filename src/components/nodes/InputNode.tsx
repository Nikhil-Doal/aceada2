import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWorkflowStore } from '@/lib/store';
import { WorkflowNodeData } from '@/lib/types';

interface InputNodeProps {
    id: string;
    data: WorkflowNodeData;
}

const InputNode = memo(({ id, data }: InputNodeProps) => {
    const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData(id, { value: e.target.value });
    };

    return (
        <Card className="w-64 border-2 border-primary/20 shadow-lg">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Input Node</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor={`input-${id}`} className="text-xs text-muted-foreground">
                        Enter Value
                    </Label>
                    <Input
                        id={`input-${id}`}
                        value={data.value || ''}
                        onChange={handleChange}
                        placeholder="Type something..."
                        className="nodrag"
                    />
                </div>
            </CardContent>
            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 bg-primary border-2 border-background"
            />
        </Card>
    );
});

InputNode.displayName = 'InputNode';
export default InputNode;
