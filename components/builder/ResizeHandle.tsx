'use client';

import { useState, useRef, useEffect } from 'react';

interface ResizeHandleProps {
    position: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
    onResize: (position: string, deltaX: number, deltaY: number) => void;
}

/**
 * ResizeHandle - Individual resize handle for 8 directions
 */
export function ResizeHandle({ position, onResize }: ResizeHandleProps) {
    const [isResizing, setIsResizing] = useState(false);
    const startPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsResizing(true);
        startPos.current = { x: e.clientX, y: e.clientY };
    };

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startPos.current.x;
            const deltaY = e.clientY - startPos.current.y;
            onResize(position, deltaX, deltaY);
            startPos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, position, onResize]);

    const positionStyles = {
        n: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize w-3 h-3',
        s: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize w-3 h-3',
        e: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize w-3 h-3',
        w: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize w-3 h-3',
        ne: 'top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize w-3 h-3',
        nw: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize w-3 h-3',
        se: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize w-3 h-3',
        sw: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize w-3 h-3',
    };

    return (
        <div
            className={`absolute bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500 transition-colors z-20 ${positionStyles[position]}`}
            onMouseDown={handleMouseDown}
        />
    );
}
