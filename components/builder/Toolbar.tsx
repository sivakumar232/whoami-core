'use client';

import { Undo, Redo } from 'lucide-react';
import { useElementStore } from '@/lib/builder/useElementStore';

interface ToolbarProps {
    userId: string;
}

/**
 * Toolbar - Top toolbar with undo/redo
 */
export function Toolbar({ userId }: ToolbarProps) {
    const { undo, redo, canUndo, canRedo } = useElementStore();

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
            {/* Undo/Redo */}
            <button
                onClick={undo}
                disabled={!canUndo()}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Undo (Ctrl+Z)"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={redo}
                disabled={!canRedo()}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Redo (Ctrl+Shift+Z)"
            >
                <Redo size={18} />
            </button>
        </div>
    );
}
