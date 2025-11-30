import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkflowNodeData } from '@/lib/types';
import { FileText, Copy, Check, Download, Eye, Code } from 'lucide-react';

interface OutputNodeProps {
    id: string;
    data: WorkflowNodeData;
}

const OutputNode = memo(({ data }: OutputNodeProps) => {
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState<'text' | 'json'>('text');

    const isValidJSON = (value: any): boolean => {
        if (typeof value === 'object') return true;
        if (typeof value !== 'string') return false;
        try {
            JSON.parse(value);
            return true;
        } catch {
            return false;
        }
    };

    const formatOutput = (value: any, mode: 'text' | 'json'): string => {
        if (mode === 'json' && isValidJSON(value)) {
            if (typeof value === 'object') {
                return JSON.stringify(value, null, 2);
            }
            try {
                return JSON.stringify(JSON.parse(value), null, 2);
            } catch {
                return String(value);
            }
        }
        return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
    };

    const handleCopy = async () => {
        if (data.value) {
            await navigator.clipboard.writeText(formatOutput(data.value, viewMode));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (data.value) {
            const content = formatOutput(data.value, viewMode);
            const blob = new Blob([content], { type: viewMode === 'json' ? 'application/json' : 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `workflow-output.${viewMode === 'json' ? 'json' : 'txt'}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const hasValue = !!data.value;
    const canShowJSON = hasValue && isValidJSON(data.value);

    return (
        <div className="relative">
            {hasValue && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-xl blur-xl opacity-40 animate-pulse" />
            )}

            <Card className={`
        relative w-[380px] border-2 shadow-2xl transition-all duration-300 hover:shadow-orange-500/50
        border-orange-500/30 bg-gradient-to-br from-orange-950/40 via-slate-900/50 to-amber-950/40
        backdrop-blur-sm
      `}>
                <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between space-y-0 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-600/30 to-amber-600/30">
                            <FileText className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Output
                            </CardTitle>
                            <p className="text-xs text-orange-300/60 mt-0.5">View results</p>
                        </div>
                    </div>
                    {hasValue && (
                        <div className="flex items-center gap-1.5">
                            {canShowJSON && (
                                <div className="flex items-center gap-0.5 bg-slate-800/50 rounded-md p-0.5 mr-1">
                                    <button
                                        onClick={() => setViewMode('text')}
                                        className={`px-2 py-1 rounded text-xs transition-all ${viewMode === 'text'
                                                ? 'bg-orange-500/20 text-orange-300'
                                                : 'text-orange-400/60 hover:text-orange-400'
                                            }`}
                                        title="Text view"
                                    >
                                        <Eye className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('json')}
                                        className={`px-2 py-1 rounded text-xs transition-all ${viewMode === 'json'
                                                ? 'bg-orange-500/20 text-orange-300'
                                                : 'text-orange-400/60 hover:text-orange-400'
                                            }`}
                                        title="JSON view"
                                    >
                                        <Code className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={handleCopy}
                                className="p-1.5 hover:bg-orange-500/20 rounded transition-colors"
                                title="Copy to clipboard"
                            >
                                {copied ? (
                                    <Check className="w-3.5 h-3.5 text-green-400" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5 text-orange-400/60" />
                                )}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="p-1.5 hover:bg-orange-500/20 rounded transition-colors"
                                title="Download output"
                            >
                                <Download className="w-3.5 h-3.5 text-orange-400/60" />
                            </button>
                        </div>
                    )}
                </CardHeader>

                <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs text-orange-300/80 font-medium flex items-center gap-1.5">
                            {viewMode === 'json' ? <Code className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            {viewMode === 'json' ? 'JSON Format' : 'Text Format'}
                        </label>
                        {hasValue && (
                            <span className="text-xs text-orange-400/60">
                                {formatOutput(data.value, viewMode).split('\n').length} lines
                            </span>
                        )}
                    </div>

                    <div className="rounded-lg bg-black/40 border border-orange-500/30 p-3" style={{ touchAction: 'pan-y' }}>
                        <ScrollArea className="h-52 w-full">
                            {hasValue ? (
                                <pre className="text-xs font-mono leading-relaxed">
                                    <code style={{
                                        display: 'block',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                    }}>
                                        {viewMode === 'json' && isValidJSON(data.value)
                                            ? formatOutput(data.value, 'json').split('\n').map((line, i) => (
                                                <div key={i} className="hover:bg-orange-500/5 px-2 -mx-2 rounded transition-colors">
                                                    <span className="text-orange-400/40 select-none inline-block w-8 text-right mr-3">
                                                        {i + 1}
                                                    </span>
                                                    <span className={
                                                        line.includes(':') && line.includes('"') ? 'text-amber-300' :
                                                            line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']') ? 'text-orange-400' :
                                                                line.includes('"') ? 'text-yellow-300' :
                                                                    line.match(/\d+/) ? 'text-green-400' :
                                                                        'text-orange-200'
                                                    }>
                                                        {line}
                                                    </span>
                                                </div>
                                            ))
                                            : <span className="text-orange-100">{formatOutput(data.value, 'text')}</span>
                                        }
                                    </code>
                                </pre>
                            ) : (
                                <div className="h-52 flex items-center justify-center">
                                    <div className="text-center space-y-2">
                                        <FileText className="w-8 h-8 text-orange-400/30 mx-auto" />
                                        <p className="text-xs text-orange-400/60 italic">
                                            No output data yet...
                                        </p>
                                        <p className="text-xs text-orange-400/40">
                                            Run the workflow to see results
                                        </p>
                                    </div>
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    {hasValue && (
                        <div className="flex items-center gap-2 text-xs text-orange-300/70 px-3 py-2 bg-orange-500/10 rounded-lg border border-orange-500/30">
                            <Check className="w-3 h-3 text-green-400" />
                            <span>Output ready • {formatOutput(data.value, viewMode).length} characters</span>
                        </div>
                    )}
                </CardContent>

                <Handle
                    type="target"
                    position={Position.Left}
                    className="w-3 h-3 !bg-gradient-to-r from-orange-500 to-amber-500 border-2 border-white/30 shadow-lg shadow-orange-500/50 transition-transform hover:scale-125"
                />
            </Card>
        </div>
    );
});

OutputNode.displayName = 'OutputNode';
export default OutputNode;
