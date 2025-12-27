'use client';

import { Plus, Type, Image, Square, Minus, Briefcase, Tag, Link2, Layers } from 'lucide-react';
import { useElementStore } from '@/lib/builder/useElementStore';

interface ElementLibraryProps {
    userId: string;
    isVisible: boolean;
}

const ELEMENT_TYPES = [
    // Basic
    { type: 'heading', name: 'Heading', icon: Type, category: 'Basic', width: 300, height: 60 },
    { type: 'text_block', name: 'Text Block', icon: Type, category: 'Basic', width: 300, height: 100 },
    { type: 'button', name: 'Button', icon: Square, category: 'Basic', width: 150, height: 50 },
    { type: 'image', name: 'Image', icon: Image, category: 'Basic', width: 300, height: 200 },
    { type: 'divider', name: 'Divider', icon: Minus, category: 'Basic', width: 300, height: 10 },

    // Portfolio
    { type: 'project_card', name: 'Project Card', icon: Briefcase, category: 'Portfolio', width: 350, height: 400 },
    { type: 'skill_tag', name: 'Skill Tag', icon: Tag, category: 'Portfolio', width: 120, height: 40 },
    { type: 'social_links', name: 'Social Links', icon: Link2, category: 'Portfolio', width: 200, height: 50 },

    // Layout
    { type: 'container', name: 'Container', icon: Layers, category: 'Layout', width: 400, height: 300 },
];

/**
 * ElementLibrary - Clean sidebar with element types
 */
export function ElementLibrary({ userId, isVisible }: ElementLibraryProps) {
    const { addElement, elements } = useElementStore();

    const handleAddElement = async (type: string) => {
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
        <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-20 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Elements</h2>
                <p className="text-xs text-gray-500 mt-1">Click to add to canvas</p>
            </div>

            {['Basic', 'Portfolio', 'Layout'].map(category => (
                <div key={category} className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {category}
                    </h3>
                    <div className="space-y-2">
                        {ELEMENT_TYPES
                            .filter(el => el.category === category)
                            .map(({ type, name, icon: Icon }) => (
                                <button
                                    key={type}
                                    onClick={() => handleAddElement(type)}
                                    className="w-full text-left px-3 py-2.5 rounded-md border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group flex items-center gap-3"
                                >
                                    <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                                    <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-blue-700">
                                        {name}
                                    </span>
                                    <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                                </button>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
