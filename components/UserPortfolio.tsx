'use client';

import { useEffect } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { useEditMode } from '@/lib/useEditMode';
import { usePanelState } from '@/lib/hooks/usePanelState';
import { Canvas } from './builder/Canvas';
import { ElementLibrary } from './builder/ElementLibrary';
import { PropertiesPanel } from './builder/PropertiesPanel';
import { FloatingPanel } from './builder/FloatingPanel';
import { TopToolbar } from './builder/TopToolbar';
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
 * UserPortfolio - Visual builder with full-screen canvas and floating panels
 */
export default function UserPortfolio({ profileOwner, isOwner }: UserPortfolioProps) {
    const { isEditMode, toggleEditMode, canEdit } = useEditMode(isOwner);
    const { panels, togglePanel, updatePosition } = usePanelState();
    const { selectedId, setSelectedId, deleteElement, undo, redo, copyElement, pasteElement, duplicateElement } = useElementStore();
    const selectedElement = useElementStore(state =>
        state.elements.find(el => el.id === selectedId)
    );

    // Keyboard shortcuts
    useEffect(() => {
        if (!isEditMode) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Undo - Ctrl+Z
            if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                undo();
            }

            // Redo - Ctrl+Shift+Z
            if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
                e.preventDefault();
                redo();
            }

            // Copy - Ctrl+C
            if (e.ctrlKey && e.key === 'c' && selectedId) {
                e.preventDefault();
                copyElement(selectedId);
            }

            // Paste - Ctrl+V
            if (e.ctrlKey && e.key === 'v') {
                e.preventDefault();
                pasteElement(profileOwner.id);
            }

            // Duplicate - Ctrl+D
            if (e.ctrlKey && e.key === 'd' && selectedId) {
                e.preventDefault();
                duplicateElement(selectedId, profileOwner.id);
            }

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
            {/* Top Toolbar - Only in edit mode */}
            {canEdit && isEditMode && (
                <TopToolbar
                    onToggleElementLibrary={() => togglePanel('elementLibrary')}
                    onToggleProperties={() => togglePanel('properties')}
                    elementLibraryOpen={panels.elementLibrary.isOpen}
                    propertiesOpen={panels.properties.isOpen}
                />
            )}

            {/* Floating Element Library Panel */}
            {canEdit && isEditMode && (
                <FloatingPanel
                    title="Elements"
                    isOpen={panels.elementLibrary.isOpen}
                    onToggle={() => togglePanel('elementLibrary')}
                    position={panels.elementLibrary.position}
                    onPositionChange={(pos) => updatePosition('elementLibrary', pos)}
                    width={280}
                    height={600}
                >
                    <ElementLibrary userId={profileOwner.id} isVisible={true} />
                </FloatingPanel>
            )}

            {/* Floating Properties Panel */}
            {canEdit && isEditMode && selectedElement && (
                <FloatingPanel
                    title="Properties"
                    isOpen={panels.properties.isOpen}
                    onToggle={() => togglePanel('properties')}
                    position={panels.properties.position}
                    onPositionChange={(pos) => updatePosition('properties', pos)}
                    width={320}
                    height={600}
                >
                    <PropertiesPanel
                        element={selectedElement}
                        isVisible={true}
                        onClose={() => setSelectedId(null)}
                    />
                </FloatingPanel>
            )}

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

            {/* Full-Screen Canvas Container */}
            <div className={`w-full ${canEdit && isEditMode ? 'pt-16' : ''}`}>
                {/* CANVAS - Full-width, infinite vertical */}
                <Canvas userId={profileOwner.id} isEditMode={isEditMode} />
            </div>
        </div>
    );
}
