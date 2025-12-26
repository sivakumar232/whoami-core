'use client';

import { Plus } from 'lucide-react';
import { useElementStore } from '@/lib/builder/useElementStore';

interface ElementLibraryProps {
    userId: string;
    isVisible: boolean;
}

const ELEMENT_TYPES = [
    { type: 'text_block', name: 'Text Block', icon: '📝' },
    { type: 'heading', name: 'Heading', icon: '📰' },
    { type: 'button', name: 'Button', icon: '🔘' },
    { type: 'image', name: 'Image', icon: '🖼️' },
];

/**
 * ElementLibrary - Sidebar with draggable element types
 */
export function ElementLibrary({ userId, isVisible }: ElementLibraryProps) {
    const { addElement, elements } = useElementStore();

    const handleAddElement = async (type: string) => {
        // Add element at a staggered position
        const offset = elements.length * 20;

        await addElement({
            userId,
            type,
            x: 100 + offset,
            y: 100 + offset,
            width: 200,
            height: 100,
            zIndex: elements.length,
            props: {},
        });
    };

    if (!isVisible) return null;

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg z-20 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Elements</h2>
                <p className="text-xs text-gray-600 mt-1">Click to add to canvas</p>
            </div>

            <div className="p-4 space-y-2">
                {ELEMENT_TYPES.map(({ type, name, icon }) => (
                    <button
                        key={type}
                        onClick={() => handleAddElement(type)}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group flex items-center gap-3"
                    >
                        <span className="text-2xl">{icon}</span>
                        <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900 group-hover:text-blue-600">
                                {name}
                            </div>
                        </div>
                        <Plus size={16} className="text-gray-400 group-hover:text-blue-600" />
                    </button>
                ))}
            </div>
        </div>
    );
}
