'use client';

import { BioWidgetData } from '@/lib/types';
import Image from 'next/image';

interface BioWidgetProps {
    data: BioWidgetData;
}

/**
 * BioWidget - Displays user bio with avatar, title, and description
 */
export default function BioWidget({ data }: BioWidgetProps) {
    return (
        <div className="flex flex-col items-center text-center h-full justify-center space-y-4">
            {/* Avatar */}
            {data.avatar && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/20">
                    <Image
                        src={data.avatar}
                        alt={data.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            {/* Title */}
            <h3 className="text-2xl font-bold text-white">
                {data.title}
            </h3>

            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed">
                {data.description}
            </p>
        </div>
    );
}
