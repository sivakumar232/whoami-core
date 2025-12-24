'use client';

import { useState, useRef } from 'react';
import { User, Trash2 } from 'lucide-react';
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
 * ProfileHeader - Clean header with click-to-upload profile picture
 */
export default function ProfileHeader({ profileOwner, isEditable }: ProfileHeaderProps) {
    const [profileData, setProfileData] = useState({
        name: profileOwner.username,
        bio: 'Add your bio here...',
        title: 'Your Title',
        avatar: '', // Empty by default
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBlur = async (field: string, value: string) => {
        // TODO: Save to database
        console.log('Saving:', field, value);
    };

    const handleAvatarClick = () => {
        if (isEditable && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileData(prev => ({
                ...prev,
                avatar: reader.result as string,
            }));
            // TODO: Upload to server
        };
        reader.readAsDataURL(file);
    };

    const handleDeleteAvatar = (e: React.MouseEvent) => {
        e.stopPropagation();
        setProfileData(prev => ({
            ...prev,
            avatar: '',
        }));
        // TODO: Delete from server
    };

    return (
        <div className="bg-white rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Profile Picture - Click to upload */}
                <div className="relative group">
                    <div
                        className={`w-32 h-32 rounded-full overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center ${isEditable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                            }`}
                        onClick={handleAvatarClick}
                    >
                        {profileData.avatar ? (
                            <Image
                                src={profileData.avatar}
                                alt={profileData.name}
                                width={128}
                                height={128}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <User size={48} className="text-gray-400" />
                        )}
                    </div>

                    {/* Delete button - only show when image exists and in edit mode */}
                    {isEditable && profileData.avatar && (
                        <button
                            onClick={handleDeleteAvatar}
                            className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                            title="Remove picture"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}

                    {/* Hidden file input */}
                    {isEditable && (
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
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
                </div>
            </div>
        </div>
    );
}
