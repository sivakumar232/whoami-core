'use client';

import { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useElementStore } from '@/lib/builder/useElementStore';
import { ElementData } from '@/lib/builder/types';
import { ElementRenderer } from './ElementRenderer';
import { ResizeHandle } from './ResizeHandle';

interface DraggableElementProps {
    element: ElementData;
    isSelected: boolean;
    isEditMode: boolean;
    onSelect: () => void;
}

const MIN_WIDTH = 50;
const MIN_HEIGHT = 30;

/**
 * DraggableElement - Wrapper that makes elements draggable and resizable
 */
export function DraggableElement({ element, isSelected, isEditMode, onSelect }: DraggableElementProps) {
    const { updateElement, deleteElement } = useElementStore();
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0, elementX: 0, elementY: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isEditMode) return;
        e.stopPropagation();

        onSelect();
        setIsDragging(true);

        dragStartPos.current = {
            x: e.clientX,
            y: e.clientY,
            elementX: element.x,
            elementY: element.y,
        };
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - dragStartPos.current.x;
            const deltaY = e.clientY - dragStartPos.current.y;

            const newX = Math.max(0, dragStartPos.current.elementX + deltaX);
            const newY = Math.max(0, dragStartPos.current.elementY + deltaY);

            updateElement(element.id, { x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, element.id, updateElement]);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteElement(element.id);
    };

    const handlePropsChange = (newProps: Record<string, any>) => {
        updateElement(element.id, { props: newProps });
    };

    const handleResize = (position: string, newWidth: number, newHeight: number, newX: number, newY: number) => {
        updateElement(element.id, {
            x: newX,
            y: newY,
            width: Math.max(MIN_WIDTH, newWidth),
            height: Math.max(MIN_HEIGHT, newHeight),
        });
    };

    return (
        <div
            className={`
        absolute group
        ${isEditMode ? 'cursor-move' : 'cursor-default'}
        ${isSelected ? 'border-2 border-dashed border-blue-500' : ''}
        ${isEditMode && !isSelected ? 'hover:border-2 hover:border-dashed hover:border-blue-300' : ''}
      `}
            style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                zIndex: element.zIndex,
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
        >
            {/* Render actual element */}
            <ElementRenderer
                element={element}
                isEditable={isEditMode && isSelected}
                onPropsChange={handlePropsChange}
            />

            {/* Delete button */}
            {isSelected && isEditMode && (
                <button
                    onClick={handleDelete}
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors z-10"
                    title="Delete element"
                >
                    <Trash2 size={14} />
                </button>
            )}

            {/* Resize handles - 8 directions */}
            {isSelected && isEditMode && (
                <>
                    <ResizeHandle position="n" onResize={handleResize} elementX={element.x} elementY={element.y} elementWidth={element.width} elementHeight={element.height} />
                    <ResizeHandle position="s" onResize={handleResize} elementX={element.x} elementY={element.y} elementWidth={element.width} elementHeight={element.height} />
                    <ResizeHandle position="e" onResize={handleResize} elementX={element.x} elementY={element.y} elementWidth={element.width} elementHeight={element.height} />
                    <ResizeHandle position="w" onResize={handleResize} elementX={element.x} elementY={element.y} elementWidth={element.width} elementHeight={element.height} />
                    <ResizeHandle position="ne" onResize={handleResize} elementX={element.x} elementY={element.y} elementWidth={element.width} elementHeight={element.height} />
                    <ResizeHandle position="nw" onResize={handleResize} elementX={element.x} elementY={element.y} elementWidth={element.width} elementHeight={element.height} />
                    <ResizeHandle position="se" onResize={handleResize} elementX={element.x} elementY={element.y} elementWidth={element.width} elementHeight={element.height} />
                    <ResizeHandle position="sw" onResize={handleResize} elementX={element.x} elementY={element.y} elementWidth={element.width} elementHeight={element.height} />
                </>
            )}
        </div>
    );
}
