'use client';

import { Edit3, Eye } from 'lucide-react';
import { useEditMode } from '@/lib/useEditMode';
import ProfileHeader from './ProfileHeader';
import { Canvas } from './builder/Canvas';
import { ElementLibrary } from './builder/ElementLibrary';

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Element Library - Left Sidebar */}
            <ElementLibrary userId={profileOwner.id} isVisible={canEdit && isEditMode} />

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
