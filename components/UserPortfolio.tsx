'use client';

import { useState } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { useEditMode } from '@/lib/useEditMode';
import WidgetGrid from './WidgetGrid';
import AddWidgetModal from './AddWidgetModal';
import FloatingActionButton from './FloatingActionButton';

interface UserPortfolioProps {
    profileOwner: {
        id: string;
        username: string;
    };
    isOwner: boolean;
}

/**
 * UserPortfolio - Main client component for user portfolio page
 * Manages edit mode, add widget modal, and overall layout
 */
export default function UserPortfolio({ profileOwner, isOwner }: UserPortfolioProps) {
    const { isEditMode, toggleEditMode, canEdit } = useEditMode(isOwner);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 mb-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Title and Status */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {profileOwner.username}'s Portfolio 🎨
                            </h1>
                            <p className="text-gray-300 text-sm md:text-base">
                                {isOwner ? (
                                    isEditMode ? (
                                        <span className="text-green-400 flex items-center gap-2">
                                            <Edit3 size={16} />
                                            Edit mode: Drag widgets to rearrange
                                        </span>
                                    ) : (
                                        <span className="text-blue-400 flex items-center gap-2">
                                            <Eye size={16} />
                                            View mode: Toggle edit to customize
                                        </span>
                                    )
                                ) : (
                                    <span>Viewing {profileOwner.username}'s portfolio</span>
                                )}
                            </p>
                        </div>

                        {/* Edit Mode Toggle (Owner Only) */}
                        {canEdit && (
                            <div className="flex items-center gap-3">
                                <span className="text-white/60 text-sm hidden md:block">
                                    Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Ctrl+E</kbd> to toggle
                                </span>
                                <button
                                    onClick={toggleEditMode}
                                    className={`
                    px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2
                    ${isEditMode
                                            ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
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
                    </div>
                </div>

                {/* Widget Grid */}
                <WidgetGrid userId={profileOwner.id} isEditable={isEditMode} />

                {/* Floating Action Button (Edit Mode Only) */}
                <FloatingActionButton
                    onClick={() => setIsAddModalOpen(true)}
                    isVisible={isEditMode}
                />

                {/* Add Widget Modal */}
                <AddWidgetModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    userId={profileOwner.id}
                />
            </div>
        </div>
    );
}
