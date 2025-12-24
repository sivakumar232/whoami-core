'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to manage edit mode state
 * Persists to localStorage and provides keyboard shortcut
 */
export function useEditMode(isOwner: boolean) {
    const [isEditMode, setIsEditMode] = useState(isOwner); // Default to true for owners

    // Load edit mode from localStorage on mount
    useEffect(() => {
        if (isOwner) {
            const saved = localStorage.getItem('editMode');
            if (saved !== null) {
                setIsEditMode(saved === 'true');
            }
        }
    }, [isOwner]);

    // Save to localStorage when changed
    useEffect(() => {
        if (isOwner) {
            localStorage.setItem('editMode', String(isEditMode));
        }
    }, [isEditMode, isOwner]);

    // Keyboard shortcut: Ctrl/Cmd + E
    useEffect(() => {
        if (!isOwner) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                setIsEditMode(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOwner]);

    const toggleEditMode = () => {
        if (isOwner) {
            setIsEditMode(prev => !prev);
        }
    };

    return {
        isEditMode: isOwner && isEditMode,
        toggleEditMode,
        canEdit: isOwner,
    };
}
