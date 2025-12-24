'use client';

import { useState } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { useEditMode } from '@/lib/useEditMode';
import WidgetGrid from './WidgetGrid';
import ProfileHeader from './ProfileHeader';
import WidgetBottomNav from './WidgetBottomNav';

interface UserPortfolioProps {
    profileOwner: {
        id: string;
        username: string;
        email: string;
    };
    isOwner: boolean;
}

/**
 * UserPortfolio - Main client component for user portfolio page
 * Redesigned with fixed header, inline editing, and bottom nav
 */
export default function UserPortfolio({ profileOwner, isOwner }: UserPortfolioProps) {
    const { isEditMode, toggleEditMode, canEdit } = useEditMode(isOwner);
    const [bgColor, setBgColor] = useState('#ffffff');

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: bgColor }}>
            {/* Minimal Top Bar - Only Edit Toggle */}
            {canEdit && (
                <div className="fixed top-4 right-4 z-30 flex items-center gap-3">
                    <span className="text-gray-600 text-sm hidden md:block">
                        Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs border border-gray-300">Ctrl+E</kbd>
                    </span>
                    <button
                        onClick={toggleEditMode}
                        className={`
              px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg
              ${isEditMode
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                            }
            `}
                    >
                        {isEditMode ? (
                            <>
                                <Eye size={16} />
                                <span className="hidden sm:inline">View</span>
                            </>
                        ) : (
                            <>
                                <Edit3 size={16} />
                                <span className="hidden sm:inline">Edit</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Fixed Profile Header */}
                <ProfileHeader
                    profileOwner={profileOwner}
                    isEditable={isEditMode}
                />

                {/* Widget Grid */}
                <div className="mt-8">
                    <WidgetGrid userId={profileOwner.id} isEditable={isEditMode} />
                </div>
            </div>

            {/* Bottom Navigation for Adding Widgets */}
            <WidgetBottomNav userId={profileOwner.id} isVisible={isEditMode} />
        </div>
    );
}

