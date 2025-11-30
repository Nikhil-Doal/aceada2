'use client';

import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    ReactFlowProvider,
    Connection,
    Edge,
    NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useWorkflowStore } from '@/lib/store';
import InputNode from './nodes/InputNode';
import APINode from './nodes/APINode';
import OutputNode from './nodes/OutputNode';
import { NodeType } from '@/lib/types';

const nodeTypes: NodeTypes = {
    input: InputNode,
    api: APINode,
    output: OutputNode,
};

const CanvasContent = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
    } = useWorkflowStore();

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow') as NodeType;
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowWrapper.current?.getBoundingClientRect();
            if (!position) return;

            const clientX = event.clientX - position.left;
            const clientY = event.clientY - position.top;

            addNode(type, { x: clientX, y: clientY });
        },
        [addNode]
    );

    return (
        <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onDragOver={onDragOver}
                onDrop={onDrop}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

const Canvas = () => {
    return (
        <ReactFlowProvider>
            <CanvasContent />
        </ReactFlowProvider>
    );
};

export default Canvas;
