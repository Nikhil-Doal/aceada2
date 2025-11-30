import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NodeType } from '@/lib/types';
import { FileInput, Server, FileOutput } from 'lucide-react';

const Sidebar = () => {
    const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Card className="h-full w-64 border-r rounded-none">
            <CardHeader>
                <CardTitle>Nodes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                    Drag these nodes to the canvas to build your workflow.
                </div>

                <div
                    className="flex items-center gap-2 p-3 border rounded-md cursor-grab hover:bg-accent transition-colors"
                    onDragStart={(event) => onDragStart(event, 'input')}
                    draggable
                >
                    <FileInput className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Input Node</span>
                </div>

                <div
                    className="flex items-center gap-2 p-3 border rounded-md cursor-grab hover:bg-accent transition-colors"
                    onDragStart={(event) => onDragStart(event, 'api')}
                    draggable
                >
                    <Server className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">API Node</span>
                </div>

                <div
                    className="flex items-center gap-2 p-3 border rounded-md cursor-grab hover:bg-accent transition-colors"
                    onDragStart={(event) => onDragStart(event, 'output')}
                    draggable
                >
                    <FileOutput className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Output Node</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default Sidebar;
