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

    const handleResize = (position: string, deltaX: number, deltaY: number) => {
        let newX = element.x;
        let newY = element.y;
        let newWidth = element.width;
        let newHeight = element.height;

        // Handle horizontal resize
        if (position.includes('e')) {
            newWidth = Math.max(MIN_WIDTH, element.width + deltaX);
        } else if (position.includes('w')) {
            const widthChange = -deltaX;
            if (element.width + widthChange >= MIN_WIDTH) {
                newX = element.x + deltaX;
                newWidth = element.width + widthChange;
            }
        }

        // Handle vertical resize
        if (position.includes('s')) {
            newHeight = Math.max(MIN_HEIGHT, element.height + deltaY);
        } else if (position.includes('n')) {
            const heightChange = -deltaY;
            if (element.height + heightChange >= MIN_HEIGHT) {
                newY = element.y + deltaY;
                newHeight = element.height + heightChange;
            }
        }

        updateElement(element.id, {
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
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
                    <ResizeHandle position="n" onResize={handleResize} />
                    <ResizeHandle position="s" onResize={handleResize} />
                    <ResizeHandle position="e" onResize={handleResize} />
                    <ResizeHandle position="w" onResize={handleResize} />
                    <ResizeHandle position="ne" onResize={handleResize} />
                    <ResizeHandle position="nw" onResize={handleResize} />
                    <ResizeHandle position="se" onResize={handleResize} />
                    <ResizeHandle position="sw" onResize={handleResize} />
                </>
            )}
        </div>
    );
}
