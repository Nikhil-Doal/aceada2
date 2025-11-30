import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkflowNodeData } from '@/lib/types';

interface OutputNodeProps {
    id: string;
    data: WorkflowNodeData;
}

const OutputNode = memo(({ data }: OutputNodeProps) => {
    return (
        <Card className="w-80 border-2 border-green-500/20 shadow-lg">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-green-600">Output Node</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="bg-muted/50 rounded-md p-2">
                    <ScrollArea className="h-32 w-full rounded-md border p-2">
                        {data.value ? (
                            <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                                {typeof data.value === 'object'
                                    ? JSON.stringify(data.value, null, 2)
                                    : String(data.value)}
                            </pre>
                        ) : (
                            <span className="text-xs text-muted-foreground italic">
                                No output data yet...
                            </span>
                        )}
                    </ScrollArea>
                </div>
            </CardContent>
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-green-500 border-2 border-background"
            />
        </Card>
    );
});

OutputNode.displayName = 'OutputNode';
export default OutputNode;
