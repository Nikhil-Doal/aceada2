import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NodeType } from '@/lib/types';
import { Keyboard, Globe, Sparkles, FileText } from 'lucide-react';

const Sidebar = () => {
    const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const nodeCards = [
        {
            type: 'input' as NodeType,
            icon: Keyboard,
            label: 'Input Node',
            description: 'Start your workflow',
            gradient: 'from-blue-600/20 to-cyan-600/20',
            hoverGradient: 'hover:from-blue-600/30 hover:to-cyan-600/30',
            iconColor: 'text-blue-400',
            borderColor: 'border-blue-500/30',
        },
        {
            type: 'api' as NodeType,
            icon: Globe,
            label: 'API Node',
            description: 'Fetch external data',
            gradient: 'from-green-600/20 to-emerald-600/20',
            hoverGradient: 'hover:from-green-600/30 hover:to-emerald-600/30',
            iconColor: 'text-green-400',
            borderColor: 'border-green-500/30',
        },
        {
            type: 'ai-agent' as NodeType,
            icon: Sparkles,
            label: 'AI Agent',
            description: 'Powered by Gemini',
            gradient: 'from-purple-600/20 to-pink-600/20',
            hoverGradient: 'hover:from-purple-600/30 hover:to-pink-600/30',
            iconColor: 'text-purple-400',
            borderColor: 'border-purple-500/30',
        },
        {
            type: 'output' as NodeType,
            icon: FileText,
            label: 'Output Node',
            description: 'View your results',
            gradient: 'from-orange-600/20 to-amber-600/20',
            hoverGradient: 'hover:from-orange-600/30 hover:to-amber-600/30',
            iconColor: 'text-orange-400',
            borderColor: 'border-orange-500/30',
        },
    ];

    return (
        <Card className="h-full w-72 border-r rounded-none bg-slate-900/50 backdrop-blur-sm border-white/10">
            <CardHeader className="border-b border-white/10">
                <CardTitle className="text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Nodes
                </CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                    Drag nodes to the canvas
                </p>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
                {nodeCards.map((node) => {
                    const Icon = node.icon;
                    return (
                        <div
                            key={node.type}
                            className={`
                group relative flex items-center gap-3 p-4 rounded-lg cursor-grab
                bg-gradient-to-br ${node.gradient} ${node.hoverGradient}
                border-2 ${node.borderColor}
                transition-all duration-300
                hover:shadow-lg hover:shadow-${node.iconColor}/20
                hover:scale-[1.02]
                active:scale-95
              `}
                            onDragStart={(event) => onDragStart(event, node.type)}
                            draggable
                        >
                            <div className={`p-2 rounded-lg bg-slate-900/50 border ${node.borderColor}`}>
                                <Icon className={`w-4 h-4 ${node.iconColor}`} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-100">{node.label}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{node.description}</p>
                            </div>
                            <div className={`
                w-2 h-2 rounded-full ${node.iconColor.replace('text-', 'bg-')}
                opacity-0 group-hover:opacity-100 transition-opacity
                animate-pulse
              `} />
                        </div>
                    );
                })}

                <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        💡 <span className="font-medium text-slate-300">Tip:</span> Connect nodes by dragging from the circle on the right to the circle on the left.
                    </p>
                </div>

                {/* Controls Legend */}
                <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 space-y-2.5">
                    <h3 className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-2">
                        <Keyboard className="w-3.5 h-3.5" />
                        Controls
                    </h3>

                    <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                            <kbd className="px-2 py-0.5 bg-slate-700/50 border border-slate-600 rounded text-xs font-mono text-slate-300 min-w-[60px] text-center">
                                Delete
                            </kbd>
                            <span className="text-slate-400 flex-1">Remove selected nodes/edges</span>
                        </div>

                        <div className="flex items-start gap-2">
                            <kbd className="px-2 py-0.5 bg-slate-700/50 border border-slate-600 rounded text-xs font-mono text-slate-300 min-w-[60px] text-center">
                                Shift
                            </kbd>
                            <span className="text-slate-400 flex-1">Multi-select nodes</span>
                        </div>

                        <div className="flex items-start gap-2">
                            <kbd className="px-2 py-0.5 bg-slate-700/50 border border-slate-600 rounded text-xs font-mono text-slate-300 min-w-[60px] text-center">
                                Drag
                            </kbd>
                            <span className="text-slate-400 flex-1">Connect nodes or move canvas</span>
                        </div>

                        <div className="flex items-start gap-2">
                            <kbd className="px-2 py-0.5 bg-slate-700/50 border border-slate-600 rounded text-xs font-mono text-slate-300 min-w-[60px] text-center">
                                Scroll
                            </kbd>
                            <span className="text-slate-400 flex-1">Zoom in/out on canvas</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Sidebar;
