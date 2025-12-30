'use client';

import { useState } from 'react';

interface ProfileHeaderProps {
    profileOwner: {
        id: string;
        username: string;
        email: string;
    };
    isEditable: boolean;
}

/**
 * ProfileHeader - Clean header with name, title, and bio
 */
export default function ProfileHeader({ profileOwner, isEditable }: ProfileHeaderProps) {
    const [profileData, setProfileData] = useState({
        name: profileOwner.username,
        bio: 'Add your bio here...',
        title: 'Your Title',
    });

    const handleBlur = async (field: string, value: string) => {
        // TODO: Save to database
        console.log('Saving:', field, value);
    };


    return (
        <div
            className="rounded-2xl p-8"
            style={{
                backgroundColor: 'var(--theme-widget-bg, #ffffff)',
                color: 'var(--theme-text-color, #000000)',
            }}
        >
            {/* Profile Info - ContentEditable */}
            <div className="space-y-2">
                {/* Name - editable */}
                <h1
                    className={`text-3xl font-bold ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                    style={{
                        outline: 'none',
                        border: 'none',
                        color: 'inherit'
                    }}
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur('name', e.currentTarget.textContent || '')}
                >
                    {profileData.name}
                </h1>

                {/* Title - editable */}
                <p
                    className={`text-lg opacity-80 ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                    style={{
                        outline: 'none',
                        border: 'none',
                        color: 'inherit'
                    }}
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur('title', e.currentTarget.textContent || '')}
                >
                    {profileData.title}
                </p>

                {/* Bio - editable */}
                <p
                    className={`max-w-2xl opacity-70 ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                    style={{
                        outline: 'none',
                        border: 'none',
                        color: 'inherit'
                    }}
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur('bio', e.currentTarget.textContent || '')}
                >
                    {profileData.bio}
                </p>
            </div>
        </div>
    );
}
