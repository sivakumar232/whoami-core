'use client';

import { Widget } from '@/lib/types';
import { X } from 'lucide-react';
import { useRef } from 'react';
import { useWidgetStore } from '@/lib/useWidgetStore';

interface WidgetWrapperProps {
    widget: Widget;
    isEditable: boolean;
    onDelete?: () => void;
    children: React.ReactNode;
}

/**
 * WidgetWrapper - ContentEditable inline editing like bento.me
 * In edit mode, all text becomes directly editable
 */
export default function WidgetWrapper({
    widget,
    isEditable,
    onDelete,
    children,
}: WidgetWrapperProps) {
    const { updateWidget } = useWidgetStore();
    const contentRef = useRef<HTMLDivElement>(null);

    // Auto-save on blur
    const handleBlur = async () => {
        if (!isEditable || !contentRef.current) return;

        // Extract text content from the widget
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

    return (
        <div className="widget-wrapper h-full w-full relative group">
            {/* Clean white card */}
            <div
                className={`h-full w-full rounded-xl bg-white border overflow-hidden transition-all duration-200 ${isEditable
                        ? 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        : 'border-gray-200 hover:shadow-md'
                    }`}
            >
                {/* Delete button - only visible on hover in edit mode */}
                {isEditable && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this widget?')) {
                                onDelete?.();
                            }
                        }}
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-300 shadow-sm"
                        title="Delete widget"
                    >
                        <X size={14} />
                    </button>
                )}

                {/* Widget content - becomes editable in edit mode */}
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
