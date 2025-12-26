'use client';

import { Plus } from 'lucide-react';
import { useElementStore } from '@/lib/builder/useElementStore';

interface ElementLibraryProps {
    userId: string;
    isVisible: boolean;
}

const ELEMENT_TYPES = [
    // Basic
    { type: 'heading', name: 'Heading', icon: '📰', category: 'Basic', width: 300, height: 60 },
    { type: 'text_block', name: 'Text Block', icon: '📝', category: 'Basic', width: 300, height: 100 },
    { type: 'button', name: 'Button', icon: '🔘', category: 'Basic', width: 150, height: 50 },
    { type: 'image', name: 'Image', icon: '🖼️', category: 'Basic', width: 300, height: 200 },
    { type: 'divider', name: 'Divider', icon: '➖', category: 'Basic', width: 300, height: 10 },

    // Portfolio
    { type: 'project_card', name: 'Project Card', icon: '💼', category: 'Portfolio', width: 350, height: 400 },
    { type: 'skill_tag', name: 'Skill Tag', icon: '🏷️', category: 'Portfolio', width: 120, height: 40 },
    { type: 'social_links', name: 'Social Links', icon: '🔗', category: 'Portfolio', width: 200, height: 50 },

    // Layout
    { type: 'container', name: 'Container', icon: '📦', category: 'Layout', width: 400, height: 300 },
];

/**
 * ElementLibrary - Sidebar with draggable element types
 */
export function ElementLibrary({ userId, isVisible }: ElementLibraryProps) {
    const { addElement, elements } = useElementStore();

    const handleAddElement = async (type: string) => {
        // Add element at a staggered position
        const offset = elements.length * 20;
        const elementType = ELEMENT_TYPES.find(el => el.type === type);

        await addElement({
            userId,
            type,
            x: 100 + offset,
            y: 100 + offset,
            width: elementType?.width || 200,
            height: elementType?.height || 100,
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

            {['Basic', 'Portfolio', 'Layout'].map(category => (
                <div key={category} className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{category}</h3>
                    <div className="space-y-2">
                        {ELEMENT_TYPES.filter(el => el.category === category).map(({ type, name, icon }) => (
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
            ))}
        </div>
    );
}
