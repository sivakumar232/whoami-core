'use client';

import { X, Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react';
import { useElementStore } from '@/lib/builder/useElementStore';
import { ElementData } from '@/lib/builder/types';

interface PropertiesPanelProps {
    element: ElementData | null;
    isVisible: boolean;
    onClose: () => void;
}

/**
 * PropertiesPanel - Right sidebar for editing element properties
 */
export function PropertiesPanel({ element, isVisible, onClose }: PropertiesPanelProps) {
    const { updateElement, deleteElement, elements, duplicateElement } = useElementStore();

    if (!isVisible || !element) return null;

    const handleUpdate = (updates: Partial<ElementData>) => {
        updateElement(element.id, updates);
    };

    const handlePropUpdate = (key: string, value: any) => {
        updateElement(element.id, {
            props: { ...element.props, [key]: value },
        });
    };

    const handleDuplicate = () => {
        duplicateElement(element.id, element.userId);
    };

    const handleBringForward = () => {
        // Find element with next higher z-index
        const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
        const currentIndex = sortedElements.findIndex(el => el.id === element.id);

        if (currentIndex < sortedElements.length - 1) {
            const nextElement = sortedElements[currentIndex + 1];
            const currentZ = element.zIndex;
            const nextZ = nextElement.zIndex;

            // Swap z-indices
            updateElement(element.id, { zIndex: nextZ });
            updateElement(nextElement.id, { zIndex: currentZ });
        }
    };

    const handleSendBackward = () => {
        // Find element with next lower z-index
        const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
        const currentIndex = sortedElements.findIndex(el => el.id === element.id);

        if (currentIndex > 0) {
            const prevElement = sortedElements[currentIndex - 1];
            const currentZ = element.zIndex;
            const prevZ = prevElement.zIndex;

            // Swap z-indices
            updateElement(element.id, { zIndex: prevZ });
            updateElement(prevElement.id, { zIndex: currentZ });
        }
    };

    return (
        <div key={element.id} className="fixed right-0 top-0 h-screen w-80 bg-white border-l border-gray-200 shadow-lg z-20 overflow-y-auto">{/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Properties</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                </button>
            </div>

            <div className="p-4 space-y-6">
                {/* Element Type */}
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Type</label>
                    <p className="text-sm text-gray-900 mt-1 capitalize">{element.type.replace('_', ' ')}</p>
                </div>

                {/* Position & Size */}
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Position & Size</label>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-gray-600">X</label>
                            <input
                                type="number"
                                value={Math.round(element.x)}
                                onChange={(e) => handleUpdate({ x: Number(e.target.value) })}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-600">Y</label>
                            <input
                                type="number"
                                value={Math.round(element.y)}
                                onChange={(e) => handleUpdate({ y: Number(e.target.value) })}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-600">Width</label>
                            <input
                                type="number"
                                value={Math.round(element.width)}
                                onChange={(e) => handleUpdate({ width: Number(e.target.value) })}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-600">Height</label>
                            <input
                                type="number"
                                value={Math.round(element.height)}
                                onChange={(e) => handleUpdate({ height: Number(e.target.value) })}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Color (for text elements) */}
                {(element.type === 'text_block' || element.type === 'heading') && (
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Text Color</label>
                        <input
                            type="color"
                            value={element.props.color || '#000000'}
                            onChange={(e) => handlePropUpdate('color', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                )}

                {/* Font Size (for text elements) */}
                {element.type === 'text_block' && (
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                            Font Size: {element.props.fontSize || 16}px
                        </label>
                        <input
                            type="range"
                            min="12"
                            max="72"
                            value={element.props.fontSize || 16}
                            onChange={(e) => handlePropUpdate('fontSize', Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                )}

                {/* Alignment (for text elements) */}
                {(element.type === 'text_block' || element.type === 'heading') && (
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Alignment</label>
                        <div className="flex gap-2">
                            {['left', 'center', 'right'].map((align) => (
                                <button
                                    key={align}
                                    onClick={() => handlePropUpdate('align', align)}
                                    className={`flex-1 px-3 py-2 text-sm rounded border ${element.props.align === align
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                                        }`}
                                >
                                    {align}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Button Variant */}
                {element.type === 'button' && (
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Variant</label>
                        <div className="flex flex-col gap-2">
                            {['primary', 'secondary', 'outline'].map((variant) => (
                                <button
                                    key={variant}
                                    onClick={() => handlePropUpdate('variant', variant)}
                                    className={`px-3 py-2 text-sm rounded border capitalize ${element.props.variant === variant
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                                        }`}
                                >
                                    {variant}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Layer Controls */}
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Layer</label>
                    <div className="flex gap-2">
                        <button
                            onClick={handleBringForward}
                            className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:border-blue-500 flex items-center justify-center gap-2"
                        >
                            <ArrowUp size={14} />
                            Forward
                        </button>
                        <button
                            onClick={handleSendBackward}
                            className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:border-blue-500 flex items-center justify-center gap-2"
                        >
                            <ArrowDown size={14} />
                            Backward
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Z-index: {element.zIndex}</p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button
                        onClick={handleDuplicate}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                        <Copy size={16} />
                        Duplicate
                    </button>
                    <button
                        onClick={() => deleteElement(element.id)}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
