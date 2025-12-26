'use client';

import { useEffect } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { useEditMode } from '@/lib/useEditMode';
import ProfileHeader from './ProfileHeader';
import { Canvas } from './builder/Canvas';
import { ElementLibrary } from './builder/ElementLibrary';
import { PropertiesPanel } from './builder/PropertiesPanel';
import { useElementStore } from '@/lib/builder/useElementStore';

interface UserPortfolioProps {
    profileOwner: {
        id: string;
        username: string;
        email: string;
    };
    isOwner: boolean;
}

/**
 * UserPortfolio - Visual builder with Canvas
 */
export default function UserPortfolio({ profileOwner, isOwner }: UserPortfolioProps) {
    const { isEditMode, toggleEditMode, canEdit } = useEditMode(isOwner);
    const { selectedId, setSelectedId, deleteElement } = useElementStore();
    const selectedElement = useElementStore(state =>
        state.elements.find(el => el.id === selectedId)
    );

    // Keyboard shortcuts
    useEffect(() => {
        if (!isEditMode) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Delete key
            if (e.key === 'Delete' && selectedId) {
                deleteElement(selectedId);
                setSelectedId(null);
            }

            // Escape key - deselect
            if (e.key === 'Escape') {
                setSelectedId(null);
            }

            // Arrow keys - nudge position (10px)
            if (selectedElement && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                const { updateElement } = useElementStore.getState();
                const nudge = 10;

                switch (e.key) {
                    case 'ArrowUp':
                        updateElement(selectedId!, { y: selectedElement.y - nudge });
                        break;
                    case 'ArrowDown':
                        updateElement(selectedId!, { y: selectedElement.y + nudge });
                        break;
                    case 'ArrowLeft':
                        updateElement(selectedId!, { x: selectedElement.x - nudge });
                        break;
                    case 'ArrowRight':
                        updateElement(selectedId!, { x: selectedElement.x + nudge });
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isEditMode, selectedId, selectedElement, deleteElement, setSelectedId]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Element Library - Left Sidebar */}
            <ElementLibrary userId={profileOwner.id} isVisible={canEdit && isEditMode} />

            {/* Properties Panel - Right Sidebar */}
            <PropertiesPanel
                element={selectedElement || null}
                isVisible={canEdit && isEditMode && !!selectedId}
                onClose={() => setSelectedId(null)}
            />

            {/* Edit Mode Toggle - Top Right */}
            {canEdit && (
                <div className="fixed top-4 right-4 z-30">
                    <button
                        onClick={toggleEditMode}
                        className={`
                            px-5 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl 
                            transition-all duration-300 flex items-center gap-2 border-2
                            ${isEditMode
                                ? 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                            }
                        `}
                    >
                        {isEditMode ? (
                            <>
                                <Eye size={18} />
                                <span>View Mode</span>
                            </>
                        ) : (
                            <>
                                <Edit3 size={18} />
                                <span>Edit Mode</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            <div className={`container mx-auto px-4 py-8 max-w-5xl transition-all duration-300 ${canEdit && isEditMode ? 'ml-64' : ''
                }`}>
                {/* Profile Header - Fixed Section */}
                <ProfileHeader
                    profileOwner={profileOwner}
                    isEditable={isEditMode}
                />

                {/* CANVAS - Visual builder area */}
                <div className="mt-8">
                    <Canvas userId={profileOwner.id} isEditMode={isEditMode} />
                </div>
            </div>
        </div>
    );
}
