'use client';

import { User, Briefcase, Github, Image, Link, Share2, Code, GraduationCap, BookOpen, Mail } from 'lucide-react';
import { useWidgetStore } from '@/lib/useWidgetStore';
import { WidgetType } from '@/lib/types';
import { widgetDefaults, findNextPosition } from '@/lib/widgetDefaults';

interface WidgetBottomNavProps {
    userId: string;
    isVisible: boolean;
}

const widgetIcons = [
    { type: WidgetType.BIO, icon: User, label: 'Bio' },
    { type: WidgetType.PROJECT, icon: Briefcase, label: 'Project' },
    { type: WidgetType.GITHUB, icon: Github, label: 'GitHub' },
    { type: WidgetType.IMAGE, icon: Image, label: 'Image' },
    { type: WidgetType.LINK, icon: Link, label: 'Link' },
    { type: WidgetType.SOCIAL, icon: Share2, label: 'Social' },
    { type: WidgetType.SKILLS, icon: Code, label: 'Skills' },
    { type: WidgetType.EXPERIENCE, icon: Briefcase, label: 'Work' },
    { type: WidgetType.EDUCATION, icon: GraduationCap, label: 'Education' },
    { type: WidgetType.CONTACT, icon: Mail, label: 'Contact' },
];

/**
 * WidgetBottomNav - Bottom navigation bar for adding widgets
 * Replaces the FAB with a clean icon bar
 */
export default function WidgetBottomNav({ userId, isVisible }: WidgetBottomNavProps) {
    const { widgets, addWidget } = useWidgetStore();

    const handleAddWidget = async (type: WidgetType) => {
        const defaults = widgetDefaults[type];
        const position = findNextPosition(widgets, defaults.w || 4);

        await addWidget({
            userId,
            type,
            x: position.x,
            y: position.y,
            w: defaults.w || 4,
            h: defaults.h || 3,
            data: defaults.data || {},
        });
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto">
                    {widgetIcons.map(({ type, icon: Icon, label }) => (
                        <button
                            key={type}
                            onClick={() => handleAddWidget(type)}
                            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group min-w-[60px]"
                            title={`Add ${label}`}
                        >
                            <Icon size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                            <span className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
