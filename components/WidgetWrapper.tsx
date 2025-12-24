'use client';

import { Widget } from '@/lib/types';
import { Trash2, Square, RectangleHorizontal, RectangleVertical, Maximize2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useWidgetStore } from '@/lib/useWidgetStore';

interface WidgetWrapperProps {
    widget: Widget;
    isEditable: boolean;
    onDelete?: () => void;
    children: React.ReactNode;
}

// Preset sizes like bento.me
const PRESET_SIZES = [
    { name: 'Square', icon: Square, w: 2, h: 2 },
    { name: 'Rectangle', icon: RectangleHorizontal, w: 4, h: 2 },
    { name: 'Vertical', icon: RectangleVertical, w: 2, h: 4 },
    { name: 'Hero', icon: Maximize2, w: 4, h: 4 },
];

/**
 * WidgetWrapper - ContentEditable inline editing with resize options
 */
export default function WidgetWrapper({
    widget,
    isEditable,
    onDelete,
    children,
}: WidgetWrapperProps) {
    const { updateWidget, resizeWidget } = useWidgetStore();
    const contentRef = useRef<HTMLDivElement>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Auto-save on blur
    const handleBlur = async () => {
        if (!isEditable || !contentRef.current) return;

        const textElements = contentRef.current.querySelectorAll('[contenteditable="true"]');
        const updatedData = { ...widget.data };

        textElements.forEach((el) => {
            const field = el.getAttribute('data-field');
            if (field) {
                (updatedData as any)[field] = el.textContent || '';
            }
        });

        try {
            await updateWidget(widget.id, { data: updatedData });
        } catch (error) {
            console.error('Failed to save:', error);
        }
    };

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            onDelete?.();
        }, 300);
    };

    const handleResize = async (w: number, h: number) => {
        await resizeWidget(widget.id, w, h);
    };

    return (
        <div
            className={`widget-wrapper h-full w-full relative group transition-all duration-300 ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
        >
            {/* Clean white card */}
            <div
                className={`h-full w-full rounded-xl bg-white border overflow-hidden transition-all duration-200 ${isEditable
                        ? 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        : 'border-gray-200 hover:shadow-md'
                    }`}
            >
                {/* Resize options - top left */}
                {isEditable && (
                    <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                        {PRESET_SIZES.map(({ name, icon: Icon, w, h }) => (
                            <button
                                key={name}
                                onClick={() => handleResize(w, h)}
                                className="p-1.5 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg border border-gray-200 hover:border-blue-300 transition-all hover:scale-110 shadow-sm"
                                title={name}
                            >
                                <Icon size={14} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Delete button - top right */}
                {isEditable && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 text-gray-600 hover:scale-110"
                        title="Delete widget"
                    >
                        <Trash2 size={18} />
                    </button>
                )}

                {/* Widget content */}
                <div
                    ref={contentRef}
                    className="h-full w-full p-6 overflow-auto"
                    onBlur={handleBlur}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
