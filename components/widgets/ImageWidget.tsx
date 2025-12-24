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
}

/**
 * ImageWidget - Displays an image with file upload capability
 */
export default function ImageWidget({ data, isEditable, widgetId }: ImageWidgetProps) {
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

        // Check if it's a video or image
        const isVideo = file.type.startsWith('video/');

        // For now, use a placeholder URL (you'd upload to a service like Cloudinary/S3)
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result as string;

            // Update widget with new media
            await updateWidget(widgetId, {
                data: {
                    ...data,
                    url: base64String,
                    isVideo, // Store whether it's a video
                },
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="h-full w-full">
            {/* Media with upload capability - fills entire box */}
            <div
                className={`relative h-full w-full rounded-lg overflow-hidden bg-gray-100 ${isEditable ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
                    }`}
                onClick={handleImageClick}
            >
                {data.url ? (
                    (data as any).isVideo ? (
                        <video
                            src={data.url}
                            controls
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
                        <Upload size={48} />
                        <p className="mt-2 text-sm">Click to upload</p>
                    </div>
                )}

                {/* Hidden file input - accepts both images and videos */}
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
