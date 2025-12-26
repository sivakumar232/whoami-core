'use client';

import { useEffect } from 'react';
import { useElementStore } from '@/lib/builder/useElementStore';
import { DraggableElement } from './DraggableElement';

interface CanvasProps {
    userId: string;
    isEditMode: boolean;
}

/**
 * Canvas - Free-form canvas where elements can be positioned anywhere
 */
export function Canvas({ userId, isEditMode }: CanvasProps) {
    const { elements, selectedId, setSelectedId, fetchElements } = useElementStore();

    useEffect(() => {
        fetchElements(userId);
    }, [userId, fetchElements]);

    const handleCanvasClick = (e: React.MouseEvent) => {
        // Deselect when clicking empty canvas
        if (e.target === e.currentTarget) {
            setSelectedId(null);
        }
    };

    return (
        <div
            className="relative w-full min-h-[800px] bg-white"
            onClick={handleCanvasClick}
        >
            {/* Empty state */}
            {elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                        <p className="text-lg">Empty Canvas</p>
                        {isEditMode && (
                            <p className="text-sm mt-2">Add elements from the sidebar</p>
                        )}
                    </div>
                </div>
            )}

            {/* Render all elements */}
            {elements.map((element) => (
                <DraggableElement
                    key={element.id}
                    element={element}
                    isSelected={selectedId === element.id}
                    isEditMode={isEditMode}
                    onSelect={() => setSelectedId(element.id)}
                />
            ))}
        </div>
    );
}
