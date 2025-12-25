'use client';

import { WidgetType } from '@/lib/types';
import { widgetMetadata } from '@/lib/widgetDefaults';

interface WidgetTypeCardProps {
    type: WidgetType;
    onClick: () => void;
}

export default function WidgetTypeCard({ type, onClick }: WidgetTypeCardProps) {
    const metadata = widgetMetadata[type];

    // Assign different neon colors to different widget types
    const colorClasses = [
        'neo-card-volt',
        'neo-card-cyan',
        'neo-card-orange',
        'neo-card-pink',
        'neo-card-purple',
    ];
    const colorClass = colorClasses[Object.values(WidgetType).indexOf(type) % colorClasses.length];

    return (
        <button
            onClick={onClick}
            className={`neo-card neo-card-interactive ${colorClass} text-left`}
        >
            {/* Icon */}
            <div className="text-4xl mb-3">
                {metadata.icon}
            </div>

            {/* Name */}
            <h3 className="neo-text-heading text-white mb-2">
                {metadata.name}
            </h3>

            {/* Description */}
            <p className="neo-text-body text-sm text-white/70">
                {metadata.description}
            </p>
        </button>
    );
}
