'use client';

import { ImageWidgetData } from '@/lib/types';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { useRef } from 'react';
import { useWidgetStore } from '@/lib/useWidgetStore';

interface ImageWidgetProps {
    data: ImageWidgetData;
    isEditable?: boolean;
    widgetId?: string;
    size?: 'square' | 'rectangle' | 'vertical' | 'hero';
}

/**
 * ImageWidget - Displays media (image/video) that fills entire widget box
 * No padding - media fills 100% of available space
 */
export default function ImageWidget({ data, isEditable, widgetId, size }: ImageWidgetProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { updateWidget } = useWidgetStore();

    const handleImageClick = () => {
        if (isEditable && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !widgetId) return;

        const isVideo = file.type.startsWith('video/');

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result as string;

            await updateWidget(widgetId, {
                data: {
                    ...data,
                    url: base64String,
                    isVideo,
                } as any,
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="absolute inset-0">
            {/* Media fills entire widget - no padding */}
            <div
                className={`relative h-full w-full overflow-hidden bg-gray-100 ${isEditable ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
                    }`}
                onClick={handleImageClick}
            >
                {data.url ? (
                    (data as any).isVideo ? (
                        <video
                            src={data.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={data.url}
                            alt={data.alt}
                            fill
                            className="object-cover"
                        />
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <Upload size={size === 'square' ? 32 : 48} />
                        <p className={`mt-2 ${size === 'square' ? 'text-xs' : 'text-sm'}`}>
                            Click to upload
                        </p>
                    </div>
                )}

                {/* Hidden file input */}
                {isEditable && (
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                )}
            </div>
        </div>
    );
}
