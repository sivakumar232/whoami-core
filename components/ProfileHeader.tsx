'use client';

import { useState } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
    profileOwner: {
        id: string;
        username: string;
        email: string;
    };
    isEditable: boolean;
}

/**
 * ProfileHeader - Fixed header with contentEditable inline editing
 */
export default function ProfileHeader({ profileOwner, isEditable }: ProfileHeaderProps) {
    const [profileData, setProfileData] = useState({
        name: profileOwner.username,
        bio: 'Add your bio here...',
        title: 'Your Title',
        avatar: 'https://i.pravatar.cc/150',
    });

    const handleBlur = async (field: string, value: string) => {
        // TODO: Save to database
        console.log('Saving:', field, value);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Profile Picture */}
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                        <Image
                            src={profileData.avatar}
                            alt={profileData.name}
                            width={128}
                            height={128}
                            className="object-cover"
                        />
                    </div>
                    {isEditable && (
                        <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <Camera size={18} className="text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Profile Info - ContentEditable */}
                <div className="flex-1 space-y-2">
                    {/* Name - editable */}
                    <h1
                        className={`text-3xl font-bold text-gray-900 ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                        style={{ outline: 'none', border: 'none' }}
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur('name', e.currentTarget.textContent || '')}
                    >
                        {profileData.name}
                    </h1>

                    {/* Title - editable */}
                    <p
                        className={`text-lg text-gray-600 ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                        style={{ outline: 'none', border: 'none' }}
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur('title', e.currentTarget.textContent || '')}
                    >
                        {profileData.title}
                    </p>

                    {/* Bio - editable */}
                    <p
                        className={`text-gray-700 max-w-2xl ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                        style={{ outline: 'none', border: 'none' }}
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur('bio', e.currentTarget.textContent || '')}
                    >
                        {profileData.bio}
                    </p>

                    {isEditable && (
                        <p className="text-xs text-gray-400 mt-2">
                            💡 Click on any text to edit
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
