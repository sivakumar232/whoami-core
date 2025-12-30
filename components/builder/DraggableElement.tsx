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

            {/* Floating toolbar above element - Sleek black design */}
            {isSelected && isEditMode && (
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/90 backdrop-blur-sm rounded-lg shadow-2xl px-2 py-2 z-30">
                    {/* Duplicate */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Duplicate functionality
                        }}
                        className="p-2 text-white hover:bg-white/20 rounded transition-colors"
                        title="Duplicate"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-white/20"></div>

                    {/* Bring Forward */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const { elements } = useElementStore.getState();
                            const currentIndex = elements.findIndex((el: ElementData) => el.id === element.id);
                            if (currentIndex < elements.length - 1) {
                                const nextElement = elements[currentIndex + 1];
                                updateElement(element.id, { zIndex: nextElement.zIndex });
                                updateElement(nextElement.id, { zIndex: element.zIndex });
                            }
                        }}
                        className="p-2 text-white hover:bg-white/20 rounded transition-colors"
                        title="Bring Forward"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>

                    {/* Send Backward */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const { elements } = useElementStore.getState();
                            const currentIndex = elements.findIndex((el: ElementData) => el.id === element.id);
                            if (currentIndex > 0) {
                                const prevElement = elements[currentIndex - 1];
                                updateElement(element.id, { zIndex: prevElement.zIndex });
                                updateElement(prevElement.id, { zIndex: element.zIndex });
                            }
                        }}
                        className="p-2 text-white hover:bg-white/20 rounded transition-colors"
                        title="Send Backward"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-white/20"></div>

                    {/* Delete */}
                    <button
                        onClick={handleDelete}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
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
