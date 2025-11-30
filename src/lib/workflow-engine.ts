import { Edge, Node } from 'reactflow';
import { WorkflowNode, WorkflowNodeData } from './types';

export async function executeWorkflow(
    nodes: WorkflowNode[],
    edges: Edge[],
    updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void
) {
    // 1. Build adjacency list and in-degree map
    const adjacencyList = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    nodes.forEach((node) => {
        adjacencyList.set(node.id, []);
        inDegree.set(node.id, 0);
        // Reset status
        updateNodeData(node.id, { isProcessing: false, error: undefined });
    });

    edges.forEach((edge) => {
        if (adjacencyList.has(edge.source)) {
            adjacencyList.get(edge.source)?.push(edge.target);
        }
        inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    });

    // 2. Topological Sort (Kahn's Algorithm)
    const queue: string[] = [];
    nodes.forEach((node) => {
        if ((inDegree.get(node.id) || 0) === 0) {
            queue.push(node.id);
        }
    });

    const sortedExecutionOrder: string[] = [];
    while (queue.length > 0) {
        const nodeId = queue.shift()!;
        sortedExecutionOrder.push(nodeId);

        const neighbors = adjacencyList.get(nodeId) || [];
        neighbors.forEach((neighbor) => {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        });
    }

    if (sortedExecutionOrder.length !== nodes.length) {
        throw new Error('Cycle detected in workflow');
    }

    // 3. Execute Nodes in Order
    const nodeDataMap = new Map<string, any>();

    // Initialize with current node data
    nodes.forEach(node => {
        nodeDataMap.set(node.id, node.data);
    });

    for (const nodeId of sortedExecutionOrder) {
        const node = nodes.find((n) => n.id === nodeId);
        if (!node) continue;

        updateNodeData(nodeId, { isProcessing: true });

        try {
            // Get input data from incoming edges
            const incomingEdges = edges.filter((edge) => edge.target === nodeId);
            let inputData = null;

            if (incomingEdges.length > 0) {
                // For simplicity, take data from the first connection
                // In a more complex app, we might merge data
                const sourceNodeId = incomingEdges[0].source;
                const sourceData = nodeDataMap.get(sourceNodeId);
                inputData = sourceData?.value;
            }

            // Process Node
            let outputData = node.data.value; // Default to current value (for Input nodes)

            if (node.type === 'api') {
                if (!node.data.apiUrl) throw new Error('No API URL selected');
                const response = await fetch(node.data.apiUrl);
                if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
                outputData = await response.json();
            } else if (node.type === 'output') {
                outputData = inputData; // Output node just displays input
            }

            // Update state and local map
            updateNodeData(nodeId, { value: outputData, isProcessing: false });
            nodeDataMap.set(nodeId, { ...nodeDataMap.get(nodeId), value: outputData });

        } catch (error: any) {
            updateNodeData(nodeId, { isProcessing: false, error: error.message });
            throw error; // Stop execution on error
        }
    }
}
