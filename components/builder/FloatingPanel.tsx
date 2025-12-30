'use client';

import { X, Minus, GripVertical } from 'lucide-react';
import { useDraggable } from '@/lib/hooks/useDraggable';

interface FloatingPanelProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    position: { x: number; y: number };
    onPositionChange: (position: { x: number; y: number }) => void;
    children: React.ReactNode;
    width?: number;
    height?: number;
}

export function FloatingPanel({
    title,
    isOpen,
    onToggle,
    position,
    onPositionChange,
    children,
    width = 300,
    height = 600,
}: FloatingPanelProps) {
    const { position: dragPosition, isDragging, handleMouseDown } = useDraggable({
        initialPosition: position,
        onDragEnd: onPositionChange,
    });

    if (!isOpen) return null;

    return (
        <div
            className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-40"
            style={{
                left: `${dragPosition.x}px`,
                top: `${dragPosition.y}px`,
                width: `${width}px`,
                height: `${height}px`,
                cursor: isDragging ? 'grabbing' : 'default',
            }}
        >
            {/* Header - Draggable */}
            <div
                className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2">
                    <GripVertical size={16} className="text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                </div>
                <button
                    onClick={onToggle}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Close panel"
                >
                    <X size={16} className="text-gray-600" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
