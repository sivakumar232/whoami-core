'use client';

import { Type, Image, Square, Minus, Briefcase, Tag, Link2, Layers } from 'lucide-react';
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
 * ElementLibrary - Collapsible sidebar with element types
 */
export function ElementLibrary({ userId, isVisible }: ElementLibraryProps) {
    const { addElement, elements } = useElementStore();

    if (!isVisible) return null;

    const handleAddElement = (elementType: any) => {
        const newElement = {
            id: `temp-${Date.now()}`,
            type: elementType.type,
            x: 100,
            y: 100,
            width: elementType.width,
            height: elementType.height,
            zIndex: elements.length,
            userId,
            props: getDefaultProps(elementType.type),
        };

        addElement(newElement);
    };

    const getDefaultProps = (type: string) => {
        const defaults: Record<string, any> = {
            heading: { text: 'Heading', level: 1, color: '#000000', align: 'left' },
            text_block: { content: 'Your text here...', fontSize: 16, color: '#000000', align: 'left' },
            button: { text: 'Button', variant: 'primary', size: 'md', url: '#' },
            image: { url: '', alt: 'Image', fit: 'cover' },
            divider: { style: 'solid', color: '#e5e7eb', thickness: 2 },
            project_card: { title: 'Project', description: 'Description', image: '' },
            skill_tag: { name: 'Skill', level: 'intermediate' },
            social_links: { github: '', linkedin: '', twitter: '' },
            container: { display: 'flex', gap: 16, padding: 16 },
        };
        return defaults[type] || {};
    };

    const categories = ['Basic', 'Portfolio', 'Layout'];

    return (
        <div className="p-4">
            {categories.map((category) => (
                <div key={category} className="mb-6">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{category}</h3>
                    <div className="space-y-2">
                        {ELEMENT_TYPES.filter((el) => el.category === category).map((element) => {
                            const Icon = element.icon;
                            return (
                                <button
                                    key={element.type}
                                    onClick={() => handleAddElement(element)}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                                >
                                    <Icon size={20} className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">{element.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
