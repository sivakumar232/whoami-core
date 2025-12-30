'use client';

import { useState, useEffect, useRef } from 'react';

interface UseDraggableProps {
    initialPosition: { x: number; y: number };
    onDragEnd?: (position: { x: number; y: number }) => void;
}

export function useDraggable({ initialPosition, onDragEnd }: UseDraggableProps) {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const elementStartPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition.x, initialPosition.y]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        elementStartPos.current = position;
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - dragStartPos.current.x;
            const deltaY = e.clientY - dragStartPos.current.y;

            const newX = elementStartPos.current.x + deltaX;
            const newY = elementStartPos.current.y + deltaY;

            // Constrain to viewport
            const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - 300));
            const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 100));

            setPosition({ x: constrainedX, y: constrainedY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            if (onDragEnd) {
                onDragEnd(position);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, position, onDragEnd]);

    return {
        position,
        isDragging,
        handleMouseDown,
    };
}
