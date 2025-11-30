import { Edge, Node, OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';

export type NodeType = 'input' | 'api' | 'output';

export interface WorkflowNodeData {
    label: string;
    value?: any;
    type: NodeType;
    isProcessing?: boolean;
    isValid?: boolean;
    error?: string;
    [key: string]: any;
}

export type WorkflowNode = Node<WorkflowNodeData>;

export interface WorkflowState {
    nodes: WorkflowNode[];
    edges: Edge[];
    executionStatus: 'idle' | 'running' | 'completed' | 'error';

    // Actions
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (type: NodeType, position: { x: number; y: number }) => void;
    updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
    deleteNode: (id: string) => void;
    setExecutionStatus: (status: 'idle' | 'running' | 'completed' | 'error') => void;
    clearCanvas: () => void;
    saveWorkflow: () => void;
    loadWorkflow: () => void;
}
