import React, { useState, useCallback, useEffect } from 'react';
import TopMenu from './TopMenu';
import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState } from 'reactflow';
import NodePanel from '../ChatbotFlow/NodePanel';
import SettingsPanel from '../ChatbotFlow/SettingsPanel';
import { BiMessageAdd } from 'react-icons/bi';

const nodeTypes = {
    textNode: ({ data, selected }) => (
        <div className={`w-60 shadow-lg ${selected ? 'border-2 border-blue-500 shadow-2xl' : 'border-2'}`}>
            <div className='bg-blue-300 text-sm font-medium flex items-center p-1'>
                <span className='me-1'><BiMessageAdd size={20} /></span>
                Send Message
            </div>
            <div className='bg-white p-2'>
                {data.label}
            </div>
        </div>
    ),
};


function LayoutIndex() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null);

    // Load nodes and edges from local storage on mount
    useEffect(() => {
        const savedNodes = JSON.parse(localStorage.getItem('nodes'));
        const savedEdges = JSON.parse(localStorage.getItem('edges'));
        if (savedNodes) setNodes(savedNodes);
        if (savedEdges) setEdges(savedEdges);
    }, []);

    // Save nodes and edges to local storage whenever they change
    useEffect(() => {
        if (nodes.length > 0) {
            localStorage.setItem('nodes', JSON.stringify(nodes));
        }
        if (edges.length > 0) {
            localStorage.setItem('edges', JSON.stringify(edges));
        }
    }, [nodes, edges]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onCreateNode = (type) => {
        const newNode = {
            id: `${nodes.length + 1}`,
            type,
            position: {
                x: 250,
                y: 150,
            },
            data: { label: 'New Message' },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const saveChanges = (nodeId, newLabel) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
            )
        );
    };

    return (
        <div className="flex overflow-hidden">
            <div className='bg-slate-100 px-5 py-5 min-h-screen w-full'>
                <TopMenu />
                <div className='h-[80vh]'>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        onNodeClick={(event, node) => setSelectedNode(node)}
                    >
                        <Background />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>
            </div>
            <div className="w-[300px] xl:w-[380px] px-5 py-5 overflow-x-hidden z-50">
                {!selectedNode ? <NodePanel onCreateNode={onCreateNode} /> : <SettingsPanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} saveChanges={saveChanges} />}
                <div className='mt-16'>
                    <span className='text-red-500'>Note:</span>
                    <hr />
                    <div className='text-sm'>
                        <p className='mb-1 mt-1'>1) We can create Multiple Text Nodes.</p>
                        <p className='mb-1 mt-1'>2) We can edit the Message of the Text Nodes in settings panel.</p>
                        <p className='mb-1 mt-1'>3) We can save the changes.</p>
                        <p className='mb-1 mt-1'>4) We can't save the changes if the input is empty. (It will throw error!)</p>
                        <p className='mb-1 mt-1'>5) changes are stored in local storage.</p>
                        <p className='mb-1 mt-1'>6)Failed to Implement DND, instead i tried in onClick.</p>
                        <p className='mb-1 mt-1'>7)Failed to connect edges.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutIndex;
