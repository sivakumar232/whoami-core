'use client';

import { useState } from 'react';
import { User, Briefcase, Film, Link, Code, GraduationCap, Mail } from 'lucide-react';
import { useWidgetStore } from '@/lib/useWidgetStore';
import { WidgetType } from '@/lib/types';
import { widgetDefaults, findNextPosition } from '@/lib/widgetDefaults';
import LinkDialog from './LinkDialog';

interface WidgetBottomNavProps {
    userId: string;
    isVisible: boolean;
}

const widgetIcons = [
    { type: WidgetType.PROJECT, icon: Briefcase, label: 'Project' },
    { type: WidgetType.IMAGE, icon: Film, label: 'Media' },
    { type: WidgetType.LINK, icon: Link, label: 'Link' },
    { type: WidgetType.SKILLS, icon: Code, label: 'Skills' },
    { type: WidgetType.EXPERIENCE, icon: Briefcase, label: 'Work' },
    { type: WidgetType.EDUCATION, icon: GraduationCap, label: 'Education' },
];

/**
 * WidgetBottomNav - Bottom navigation bar for adding widgets
 */
export default function WidgetBottomNav({ userId, isVisible }: WidgetBottomNavProps) {
    const { widgets, addWidget } = useWidgetStore();
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

    const handleAddWidget = async (type: WidgetType) => {
        const defaults = widgetDefaults[type];
        const position = findNextPosition(widgets, defaults.w || 4);

        // For Link widget, show custom dialog
        if (type === WidgetType.LINK) {
            setIsLinkDialogOpen(true);
            return;
        }

        // For other widgets, use defaults
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

    const handleLinkSubmit = async (url: string) => {
        const defaults = widgetDefaults[WidgetType.LINK];
        const position = findNextPosition(widgets, defaults.w || 4);

        // Extract domain name for title
        let title = 'Link';
        try {
            const urlObj = new URL(url);
            title = urlObj.hostname.replace('www.', '');
        } catch (e) {
            // Use default if URL parsing fails
        }

        await addWidget({
            userId,
            type: WidgetType.LINK,
            x: position.x,
            y: position.y,
            w: defaults.w || 4,
            h: defaults.h || 3,
            data: {
                url,
                title,
                description: '',
                icon: '🔗',
            },
        });
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto">
                        {widgetIcons.map(({ type, icon: Icon, label }) => (
                            <button
                                key={type}
                                onClick={() => handleAddWidget(type)}
                                className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all group min-w-[60px]"
                                title={`Add ${label}`}
                            >
                                <Icon size={20} className="text-gray-600" />
                                <span className="text-xs text-gray-600">
                                    {label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Link Dialog */}
            <LinkDialog
                isOpen={isLinkDialogOpen}
                onClose={() => setIsLinkDialogOpen(false)}
                onSubmit={handleLinkSubmit}
            />
        </>
    );
}
