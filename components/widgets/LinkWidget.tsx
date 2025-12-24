'use client';

import { LinkWidgetData } from '@/lib/types';
import { ExternalLink, Edit3 } from 'lucide-react';
import { useWidgetStore } from '@/lib/useWidgetStore';

interface LinkWidgetProps {
    data: LinkWidgetData;
    isEditable?: boolean;
    widgetId?: string;
}

/**
 * LinkWidget - Displays a clickable link with URL editing capability
 */
export default function LinkWidget({ data, isEditable, widgetId }: LinkWidgetProps) {
    const { updateWidget } = useWidgetStore();

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

    const handleClick = (e: React.MouseEvent) => {
        if (isEditable) {
            e.preventDefault(); // Prevent navigation in edit mode
        }
    };

    return (
        <div
            className={`flex flex-col h-full justify-center space-y-3 p-4 rounded-lg transition-all duration-200 ${isEditable ? 'hover:bg-gray-50' : 'hover:bg-gray-50'
                }`}
        >
            {/* Title - editable */}
            <div className="flex items-center gap-3">
                {data.icon && (
                    <div className="text-3xl">{data.icon}</div>
                )}
                <div className="flex-grow">
                    <h3
                        className={`text-lg font-bold text-gray-900 ${isEditable ? 'cursor-text hover:bg-gray-100 rounded px-2 -mx-2' : ''
                            }`}
                        style={{ outline: 'none', border: 'none' }}
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                        data-field="title"
                    >
                        {data.title}
                    </h3>
                </div>
                {isEditable ? (
                    <button
                        onClick={handleEditUrl}
                        className="text-gray-400 hover:text-blue-600 hover:scale-110 transition-all"
                        title="Edit URL"
                    >
                        <Edit3 size={18} />
                    </button>
                ) : (
                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClick}
                    >
                        <ExternalLink className="text-gray-400 hover:text-gray-600 transition-colors" size={18} />
                    </a>
                )}
            </div>

            {/* Description - editable */}
            {(data.description || isEditable) && (
                <p
                    className={`text-gray-600 text-sm ${isEditable ? 'cursor-text hover:bg-gray-100 rounded px-2 -mx-2' : ''
                        }`}
                    style={{ outline: 'none', border: 'none' }}
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    data-field="description"
                >
                    {data.description || 'Add description...'}
                </p>
            )}

            {/* URL display */}
            <p className="text-xs text-gray-400 truncate">{data.url}</p>
        </div>
    );
}
