'use client';

import { WidgetType } from '@/lib/types';
import { widgetMetadata } from '@/lib/widgetDefaults';

interface WidgetTypeCardProps {
    type: WidgetType;
    onClick: () => void;
}

/**
 * WidgetTypeCard - Individual card for selecting a widget type
 */
export default function WidgetTypeCard({ type, onClick }: WidgetTypeCardProps) {
    const metadata = widgetMetadata[type];

    return (
        <button
            onClick={onClick}
            className="group relative p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left"
        >
            {/* Icon */}
            <div className="text-4xl mb-3">
                {metadata.icon}
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-white mb-2">
                {metadata.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/70">
                {metadata.description}
            </p>

            {/* Hover indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
        </button>
    );
}
