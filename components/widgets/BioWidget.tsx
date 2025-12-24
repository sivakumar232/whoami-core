'use client';

import { BioWidgetData } from '@/lib/types';

interface BioWidgetProps {
    data: BioWidgetData;
    isEditable?: boolean;
}

export default function BioWidget({ data, isEditable }: BioWidgetProps) {
    return (
        <div className="flex flex-col items-center text-center space-y-4">
            {/* Avatar */}
            {data.avatar && (
                <img
                    src={data.avatar}
                    alt={data.title}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
            )}

            {/* Title - editable with cursor */}
            <h2
                className={`text-2xl font-bold text-gray-900 ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''
                    }`}
                style={{ outline: 'none', border: 'none' }}
                contentEditable={isEditable}
                suppressContentEditableWarning
                data-field="title"
            >
                {data.title}
            </h2>

            {/* Description - editable with cursor */}
            <p
                className={`text-gray-600 leading-relaxed ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''
                    }`}
                style={{ outline: 'none', border: 'none' }}
                contentEditable={isEditable}
                suppressContentEditableWarning
                data-field="description"
            >
                {data.description}
            </p>

            {isEditable && (
                <p className="text-xs text-gray-400">
                    💡 Click text to edit
                </p>
            )}
        </div>
    );
}
