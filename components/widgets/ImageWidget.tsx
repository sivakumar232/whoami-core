'use client';

import { ImageWidgetData } from '@/lib/types';
import Image from 'next/image';

interface ImageWidgetProps {
    data: ImageWidgetData;
}

/**
 * ImageWidget - Displays an image with optional caption
 */
export default function ImageWidget({ data }: ImageWidgetProps) {
    return (
        <div className="flex flex-col h-full space-y-2">
            {/* Image */}
            <div className="relative flex-grow rounded-lg overflow-hidden bg-white/5">
                <Image
                    src={data.url}
                    alt={data.alt}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Caption */}
            {data.caption && (
                <p className="text-white/70 text-sm text-center">
                    {data.caption}
                </p>
            )}
        </div>
    );
}
