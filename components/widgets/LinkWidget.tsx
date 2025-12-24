'use client';

import { LinkWidgetData } from '@/lib/types';
import { ExternalLink, Edit3 } from 'lucide-react';
import { useWidgetStore } from '@/lib/useWidgetStore';

interface LinkWidgetProps {
    data: LinkWidgetData;
    isEditable?: boolean;
    widgetId?: string;
    size?: 'square' | 'rectangle' | 'vertical' | 'hero';
}

/**
 * LinkWidget - Size-aware link display
 */
export default function LinkWidget({ data, isEditable, widgetId, size = 'rectangle' }: LinkWidgetProps) {
    const { updateWidget } = useWidgetStore();

    const isSquare = size === 'square';
    const isRectangle = size === 'rectangle';

    const handleEditUrl = () => {
        if (!isEditable || !widgetId) return;

        const newUrl = prompt('Enter URL:', data.url);
        if (newUrl && newUrl.trim()) {
            updateWidget(widgetId, {
                data: {
                    ...data,
                    url: newUrl.trim(),
                },
            });
        }
    };

    // Extract domain for square size
    const domain = data.url ? new URL(data.url).hostname.replace('www.', '') : '';

    return (
        <div className="h-full w-full flex flex-col justify-center">
            {/* Icon and Title */}
            <div className="flex items-center gap-3">
                {data.icon && (
                    <div className={isSquare ? 'text-2xl' : 'text-3xl'}>{data.icon}</div>
                )}
                <div className="flex-grow min-w-0">
                    <h3
                        className={`font-bold text-gray-900 ${isSquare ? 'text-sm line-clamp-1' :
                                isRectangle ? 'text-base line-clamp-1' :
                                    'text-lg line-clamp-2'
                            } ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                        style={{ outline: 'none', border: 'none' }}
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                        data-field="title"
                    >
                        {isSquare ? domain : data.title}
                    </h3>
                </div>
                {isEditable ? (
                    <button
                        onClick={handleEditUrl}
                        className="text-gray-400 hover:text-blue-600 hover:scale-110 transition-all flex-shrink-0"
                        title="Edit URL"
                    >
                        <Edit3 size={16} />
                    </button>
                ) : (
                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0" size={16} />
                    </a>
                )}
            </div>

            {/* Description - hide in square */}
            {!isSquare && data.description && (
                <p
                    className={`text-gray-600 mt-2 ${isRectangle ? 'text-sm line-clamp-2' : 'text-sm line-clamp-3'
                        } ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                    style={{ outline: 'none', border: 'none' }}
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    data-field="description"
                >
                    {data.description}
                </p>
            )}

            {/* URL display - only in vertical and hero */}
            {!isSquare && !isRectangle && (
                <p className="text-xs text-gray-400 truncate mt-2">{data.url}</p>
            )}
        </div>
    );
}
