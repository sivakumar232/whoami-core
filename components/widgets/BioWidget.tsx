'use client';

import { BioWidgetData } from '@/lib/types';
import Image from 'next/image';

interface BioWidgetProps {
    data: BioWidgetData;
    isEditable?: boolean;
    w?: number;
    h?: number;
}

/**
 * BioWidget - Neo-Brutalism styled bio/about section
 * Bold typography with avatar and proper spacing
 */
export default function BioWidget({ data, isEditable, w, h }: BioWidgetProps) {
    return (
        <div className="flex flex-col items-center text-center h-full p-6">
            {/* Avatar - Neo-Brutalism style */}
            {data.avatar && (
                <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                            src={data.avatar}
                            alt={data.title}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Title - editable with cursor */}
            <h2
                className={`text-3xl font-black text-gray-900 mb-3 ${isEditable ? 'cursor-text hover:bg-neo-volt/20 rounded-lg px-4 py-2 -mx-4 -my-2 transition-colors' : ''
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
                className={`text-gray-700 leading-relaxed text-base font-medium ${isEditable ? 'cursor-text hover:bg-neo-volt/20 rounded-lg px-4 py-2 -mx-4 -my-2 transition-colors' : ''
                    }`}
                style={{ outline: 'none', border: 'none' }}
                contentEditable={isEditable}
                suppressContentEditableWarning
                data-field="description"
            >
                {data.description}
            </p>

            {isEditable && (
                <p className="text-xs text-gray-500 mt-4 font-bold px-3 py-1 bg-gray-100 rounded-lg border border-gray-300">
                    💡 Click text to edit
                </p>
            )}
        </div>
    );
}
