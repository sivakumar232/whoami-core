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
        const width = defaults.w || 4;
        const height = defaults.h || 3;
        const position = findNextPosition(widgets, width, height);

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
            w: width,
            h: height,
            data: defaults.data || {},
        });
    };


    const handleLinkSubmit = async (url: string) => {
        const defaults = widgetDefaults[WidgetType.LINK];
        const width = defaults.w || 2;
        const height = defaults.h || 2;
        const position = findNextPosition(widgets, width, height);

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
            w: width,
            h: height,
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
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto max-w-2xl">
                <div className="bg-black/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl px-4 py-3">
                    <div className="flex items-center justify-center gap-2 overflow-x-auto">
                        {widgetIcons.map(({ type, icon: Icon, label }) => (
                            <button
                                key={type}
                                onClick={() => handleAddWidget(type)}
                                className="flex flex-col items-center gap-1 min-w-[60px] px-3 py-2 bg-white/5 hover:bg-neo-volt hover:text-black text-white rounded-xl transition-all border border-white/10 hover:border-black"
                                title={`Add ${label}`}
                            >
                                <Icon size={20} />
                                <span className="text-xs font-bold">
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
