'use client';

import { useState } from 'react';
import { GripIcon } from 'lucide-react';

interface ResizeHandleProps {
    onResizeStart: () => void;
    onResize: (deltaX: number, deltaY: number) => void;
    onResizeEnd: () => void;
}

/**
 * ResizeHandle - Manual drag handle for bento.me-style strict resizing
 * 
 * Features:
 * - Pointer events for precise control
 * - Visual feedback during drag
 * - Snap-to-grid behavior
 */
export default function ResizeHandle({ onResizeStart, onResize, onResizeEnd }: ResizeHandleProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handlePointerDown = (e: React.PointerEvent) => {
        e.stopPropagation();
        setIsDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        onResizeStart();

        // Capture pointer for smooth dragging
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;
        onResize(deltaX, deltaY);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!isDragging) return;

        setIsDragging(false);
        onResizeEnd();

        // Release pointer
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    return (
        <div
            className={`absolute bottom-1 right-1 w-6 h-6 cursor-se-resize z-10 
        flex items-center justify-center rounded
        ${isDragging ? 'bg-blue-500' : 'bg-gray-400 opacity-0 group-hover:opacity-100'}
        transition-opacity duration-200`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ touchAction: 'none' }} // Prevent scrolling on touch devices
        >
            <GripIcon size={12} className="text-white rotate-90" />
        </div>
    );
}
