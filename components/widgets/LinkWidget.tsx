'use client';

import { LinkWidgetData } from '@/lib/types';
import { ExternalLink } from 'lucide-react';

interface LinkWidgetProps {
    data: LinkWidgetData;
}

/**
 * LinkWidget - Displays a clickable link card with icon and description
 */
export default function LinkWidget({ data }: LinkWidgetProps) {
    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col h-full justify-center space-y-3 p-2 hover:bg-white/5 rounded-lg transition-all duration-200 group"
        >
            {/* Icon and Title */}
            <div className="flex items-center gap-3">
                {data.icon && (
                    <div className="text-3xl">{data.icon}</div>
                )}
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {data.title}
                    </h3>
                </div>
                <ExternalLink className="text-white/40 group-hover:text-white/80 transition-colors" size={18} />
            </div>

            {/* Description */}
            {data.description && (
                <p className="text-white/60 text-sm">
                    {data.description}
                </p>
            )}
        </a>
    );
}
